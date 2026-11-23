import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import prettier from 'prettier'
import ts from 'typescript'

const root = process.cwd()
const statuses = ['Available', 'Integrated', 'Needs Optimization', 'Missing', 'Rejected']
const generatedOn = new Date().toISOString().slice(0, 10)

async function loadTypeScriptData(relativePath) {
  const source = await readFile(path.join(root, relativePath), 'utf8')
  const { outputText, diagnostics } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  })
  if (diagnostics?.length) {
    throw new Error(
      relativePath +
        ' did not transpile: ' +
        diagnostics.map((item) => item.messageText).join('; '),
    )
  }
  return import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'))
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB'
}

function escapeTable(value) {
  return String(value ?? '—')
    .replaceAll('|', '\\|')
    .replaceAll('\n', ' ')
}

const [{ yoyoAssets }, { auxiliaryAssets }] = await Promise.all([
  loadTypeScriptData('src/data/yoyo-assets.ts'),
  loadTypeScriptData('src/data/assets.ts'),
])

if (yoyoAssets.length !== 16 || auxiliaryAssets.length !== 49) {
  throw new Error('Expected 16 primary illustrations and 49 auxiliary entries.')
}
if (new Set(yoyoAssets.map((asset) => asset.id)).size !== 16) {
  throw new Error('Primary illustration IDs must be unique.')
}

const statusCounts = Object.fromEntries(statuses.map((status) => [status, 0]))
for (const asset of auxiliaryAssets) {
  if (!statuses.includes(asset.status)) throw new Error('Invalid auxiliary status on ' + asset.id)
  statusCounts[asset.status] += 1
}

const uniqueImagePaths = new Set([
  ...yoyoAssets.map((asset) => asset.path),
  ...auxiliaryAssets
    .flatMap((asset) => asset.paths)
    .filter((assetPath) => assetPath.startsWith('/')),
])

const primaryRows = await Promise.all(
  yoyoAssets.map(async (asset) => {
    const filePath = path.join(root, 'public', asset.path.slice(1))
    const fileStats = await stat(filePath)
    return [
      asset.id.toUpperCase(),
      asset.title,
      asset.fileName,
      asset.width + ' × ' + asset.height,
      asset.format,
      formatBytes(fileStats.size),
      asset.transparency ? 'Yes' : 'No',
      asset.category,
      asset.content,
      asset.usage,
      asset.objectFit,
      asset.cropSafe ? 'Yes' : 'No',
    ]
  }),
)

const auxiliaryRows = await Promise.all(
  auxiliaryAssets.map(async (asset) => {
    const files = await Promise.all(
      asset.paths.map(async (file) => {
        const candidate = file.startsWith('/')
          ? path.join(root, 'public', file.slice(1))
          : path.join(root, file)
        const fileStats = await stat(candidate).catch(() => null)
        return { file, fileStats }
      }),
    )
    const missingFiles = files.filter(({ fileStats }) => !fileStats)
    if (asset.status === 'Integrated' && missingFiles.length) {
      throw new Error(
        'Integrated asset ' +
          asset.id +
          ' has missing paths: ' +
          missingFiles.map(({ file }) => file).join(', '),
      )
    }
    const verification = files.length
      ? files
          .map(
            ({ file, fileStats }) =>
              file + (fileStats ? ' · ' + formatBytes(fileStats.size) : ' · Path not found'),
          )
          .join('<br>')
      : 'No file provided'
    return [
      asset.id,
      asset.name,
      asset.paths.join('<br>') || '—',
      asset.group,
      asset.dimensions || '—',
      asset.transparency,
      asset.intendedSection + ' / ' + asset.layer,
      asset.status,
      verification,
    ]
  }),
)

const mainHeader =
  '| ID | Name | Original file | Dimensions | Format | Size | Alpha | Category | Verified content | Recommended usage | object-fit | Crop safe |'
const mainDivider = '| --- | --- | --- | ---: | --- | ---: | --- | --- | --- | --- | --- | --- |'
const auxiliaryHeader =
  '| ID | Name | Original path | Category | Dimensions | Alpha | Intended usage / layer | Status | Disk verification |'
const auxiliaryDivider = '| --- | --- | --- | --- | ---: | --- | --- | --- | --- |'

const document = [
  '# Asset Inventory',
  '',
  'Generated from src/data/yoyo-assets.ts and src/data/assets.ts by node scripts/generate-asset-inventory.mjs on ' +
    generatedOn +
    '. File existence and byte sizes are checked against the current workspace on every generation.',
  '',
  '## Summary',
  '',
  '| Inventory | Count |',
  '| --- | ---: |',
  '| Primary illustrations | ' + yoyoAssets.length + ' |',
  '| Auxiliary entries | ' + auxiliaryAssets.length + ' |',
  '| Unique image files referenced by these inventories | ' + uniqueImagePaths.size + ' |',
  ...statuses.map(
    (status) => '| Auxiliary status: ' + status + ' | ' + statusCounts[status] + ' |',
  ),
  '',
  'The 16 gallery images are 384 × 256 WebP crops from the user-provided 1536 × 1024 contact sheet. They are not 16 independent high-resolution source files. Transparent foreground variants are separate source files and are not part of the 16-scene gallery count.',
  '',
  '## Contact Sheet',
  '',
  'The supplied 4 × 4 scene contact sheet remains unchanged at [`artifacts/asset-source/gallery-contact-sheet.png`](../artifacts/asset-source/gallery-contact-sheet.png). The scene mapping below was checked against the visible content in that sheet and the crop files.',
  '',
  '## Primary Illustrations',
  '',
  mainHeader,
  mainDivider,
  ...primaryRows.map((row) => '| ' + row.map(escapeTable).join(' | ') + ' |'),
  '',
  '## Auxiliary Assets',
  '',
  'Statuses are restricted to `Available`, `Integrated`, `Needs Optimization`, `Missing`, and `Rejected`. `Integrated` can refer to an existing image used in a composition or to a responsive CSS/DOM treatment; repeated image paths are intentional reuse, not additional image files. Rows with no path remain visible as missing and are never silently substituted.',
  '',
  auxiliaryHeader,
  auxiliaryDivider,
  ...auxiliaryRows.map((row) => '| ' + row.map(escapeTable).join(' | ') + ' |'),
  '',
].join('\n')

const outputPath = path.join(root, 'docs', 'ASSET_INVENTORY.md')
await mkdir(path.dirname(outputPath), { recursive: true })
const formattedDocument = await prettier.format(document + '\n', { filepath: outputPath })
await writeFile(outputPath, formattedDocument, 'utf8')
console.log(
  'Wrote docs/ASSET_INVENTORY.md (' +
    yoyoAssets.length +
    ' primary, ' +
    auxiliaryAssets.length +
    ' auxiliary).',
)
