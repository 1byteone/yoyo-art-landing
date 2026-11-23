export type YoyoAssetCategory = 'Illustration' | 'Spatial' | 'Identity' | 'Experiments'

export interface YoyoAsset {
  id: string
  title: string
  fileName: string
  path: string
  width: number
  height: number
  format: 'WebP'
  bytes: number
  transparency: false
  content: string
  usage: string
  objectFit: 'contain'
  cropSafe: false
  category: YoyoAssetCategory
}

const asset = (
  index: number,
  title: string,
  slug: string,
  bytes: number,
  content: string,
  usage: string,
  category: YoyoAssetCategory,
): YoyoAsset => ({
  id: 'hero-' + String(index).padStart(2, '0'),
  title,
  fileName: String(index).padStart(2, '0') + '-' + slug + '.webp',
  path: '/assets/gallery/' + String(index).padStart(2, '0') + '-' + slug + '.webp',
  width: 384,
  height: 256,
  format: 'WebP',
  bytes,
  transparency: false,
  content,
  usage,
  objectFit: 'contain',
  cropSafe: false,
  category,
})

export const yoyoAssets: YoyoAsset[] = [
  asset(
    1,
    '模块化建造工坊',
    'build-studio',
    29274,
    '起重机、建造平台和协作人物组成的模块化工坊。',
    '品牌 Hero、场景预览',
    'Spatial',
  ),
  asset(
    2,
    'AI 创作工作台',
    'ai-workbench',
    25308,
    '机器人、笔记本电脑和紫绿模块化创作桌面。',
    'AI 创意工具、实验海报',
    'Experiments',
  ),
  asset(
    3,
    '机器人实验室',
    'robotics-lab',
    29404,
    '机械臂、实验台与数字设备构成的实验环境。',
    '机器人与技术实验场景',
    'Experiments',
  ),
  asset(
    4,
    '模块化数字校园',
    'modular-campus',
    29086,
    '模块建筑、路径与水岸形成完整的等距园区。',
    '空间构图、品牌世界',
    'Spatial',
  ),
  asset(
    5,
    '共创社区',
    'community-hub',
    26900,
    '多个协作席位围绕中心模块展开。',
    '协作产品、流程场景',
    'Experiments',
  ),
  asset(
    6,
    '知识图书馆',
    'knowledge-library',
    30370,
    '书架、开放书页与检索节点组成的知识空间。',
    '资产库、知识产品',
    'Spatial',
  ),
  asset(
    7,
    '软件连接网络',
    'software-network',
    22624,
    '中心服务模块与外围节点通过路径相连。',
    '软件架构、系统关系',
    'Identity',
  ),
  asset(
    8,
    '协作圆桌',
    'collaboration-circle',
    25924,
    '人物围绕中央模块建立共享协作空间。',
    '协作空间、社区体验',
    'Experiments',
  ),
  asset(
    9,
    '视觉设计室',
    'design-studio',
    26604,
    '设计师、大屏和几何图形共同构成创作现场。',
    '品牌视觉、动态海报',
    'Identity',
  ),
  asset(
    10,
    '开发者工具台',
    'developer-tools',
    27002,
    '开发者在屏幕与模块工作台之间构建工具。',
    '开发者产品、工具界面',
    'Identity',
  ),
  asset(
    11,
    '交互展示舞台',
    'interactive-stage',
    23782,
    '共享大屏与舞台空间呈现实时数字内容。',
    '交互演示、产品发布',
    'Experiments',
  ),
  asset(
    12,
    '团队工作流',
    'team-workflow',
    26274,
    '多个任务节点在团队共享空间中推进。',
    '工作流产品、流程实验',
    'Experiments',
  ),
  asset(
    13,
    '数据观测站',
    'data-observatory',
    25466,
    '仪表屏幕与数据模块组成的观测环境。',
    '数据产品、信息表达',
    'Identity',
  ),
  asset(
    14,
    '机器人协作组',
    'robot-collective',
    25314,
    '多个机器人角色在共同的平台上协作。',
    '角色资产、产品协作故事',
    'Illustration',
  ),
  asset(
    15,
    '积木水岸社区',
    'modular-village',
    23896,
    '房屋、方形树木和水岸连接成一组社区。',
    '品牌场景、空间构图',
    'Spatial',
  ),
  asset(
    16,
    '全球代码网络',
    'global-code',
    26970,
    '地球与代码模块代表跨地域数字连接。',
    '品牌识别、软件网络',
    'Identity',
  ),
]

export const yoyoAssetCategories = [
  { id: 'all', label: '全部', count: yoyoAssets.length },
  {
    id: 'Illustration',
    label: '插画',
    count: yoyoAssets.filter((item) => item.category === 'Illustration').length,
  },
  {
    id: 'Spatial',
    label: '空间',
    count: yoyoAssets.filter((item) => item.category === 'Spatial').length,
  },
  {
    id: 'Identity',
    label: '识别',
    count: yoyoAssets.filter((item) => item.category === 'Identity').length,
  },
  {
    id: 'Experiments',
    label: '实验',
    count: yoyoAssets.filter((item) => item.category === 'Experiments').length,
  },
] as const
