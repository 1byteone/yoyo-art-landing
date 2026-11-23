import { yoyoAssets } from './yoyo-assets'

export interface ApplicationItem {
  id: string
  index: string
  label: string
  title: string
  description: string
  image: string
  imageAlt: string
  composition: string
}

export const applications: ApplicationItem[] = [
  {
    id: 'brand-website',
    index: '01',
    label: '品牌官网',
    title: '让品牌世界从第一屏开始。',
    description: '以明确的主视觉、编辑式版式和连续章节，把品牌识别扩展成完整的数字体验。',
    image: yoyoAssets[14].path,
    imageAlt: yoyoAssets[14].content,
    composition: '主视觉跨栏 · 场景叙事',
  },
  {
    id: 'creative-workflow',
    index: '02',
    label: '创意工作流',
    title: '让想法沿着清晰路径前进。',
    description: '把素材、创作步骤和协作关系组织成可读的流程，而不是堆叠孤立工具。',
    image: yoyoAssets[11].path,
    imageAlt: yoyoAssets[11].content,
    composition: '节点关系 · 多步叙事',
  },
  {
    id: 'asset-library',
    index: '03',
    label: '资产图书馆',
    title: '让每项视觉资产都可查、可用。',
    description: '通过分类、元数据和清晰预览，把模块化素材组织为真实可检索的视觉系统。',
    image: yoyoAssets[5].path,
    imageAlt: yoyoAssets[5].content,
    composition: '分类目录 · 详情面板',
  },
  {
    id: 'software-architecture',
    index: '04',
    label: '软件架构',
    title: '让抽象系统关系拥有空间。',
    description: '将服务、节点和连接关系转成统一视角的场景，让复杂结构更容易理解。',
    image: yoyoAssets[6].path,
    imageAlt: yoyoAssets[6].content,
    composition: '连接网络 · 关系图谱',
  },
  {
    id: 'collaborative-workspace',
    index: '05',
    label: '协作空间',
    title: '让每个参与者都在同一张图里。',
    description: '围绕共同目标安排人物、工具和共享区域，构建更有方向的协作体验。',
    image: yoyoAssets[7].path,
    imageAlt: yoyoAssets[7].content,
    composition: '中心共享 · 环形协作',
  },
]
