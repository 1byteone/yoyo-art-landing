# 组件架构

## 页面树

    App
    ├── SiteNavigation
    ├── main
    │   ├── HeroGallery
    │   ├── VisualStory
    │   ├── CompositionPlayground
    │   ├── ApplicationsShowcase
    │   ├── ExperimentsIndex
    │   ├── GalleryArchive
    │   ├── AssetExplorer
    │   ├── MotionPoster
    │   ├── WorkflowScene
    │   ├── ModularPlayground
    │   └── ClosingSection
    ├── SiteFooter
    ├── ScrollReveal
    └── ArtworkPreview

App 仅持有跨区域共享的预览条目状态；各区域的筛选、选中项和编辑状态留在所属组件中，避免整个页面因局部操作整体重渲染。

## 组件职责

| 模块                  | 职责                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| HeroGallery           | 首屏叙事、四场景选择、前景版本切换、场景预览入口                          |
| VisualStory           | 五个视觉原则与颜色令牌演示                                                |
| CompositionPlayground | 可切换场景、背景/主体/前景/注释图层与前景素材                             |
| ApplicationsShowcase  | 五个应用方向、统一与失配布局状态                                          |
| ExperimentsIndex      | 六项实验的页内导航目录                                                    |
| GalleryArchive        | 主图分类、跨栏作品布局和详情请求                                          |
| AssetExplorer         | 主图与辅助条目的组合索引、过滤、分页和预览请求                            |
| MotionPoster          | 用户控制的动态海报与 reduced-motion 状态                                  |
| WorkflowScene         | 四步工作流和关联场景资产                                                  |
| ModularPlayground     | 模块网格的放置、移除、换色与重置                                          |
| ArtworkPreview        | 原生 dialog 承载主图、描述与元数据；支持 Escape 和关闭按钮                |
| ScrollReveal          | IntersectionObserver 揭示和 requestAnimationFrame 视差，不持有 React 状态 |

## 内容模型

| 文件                        | 模型                                                |
| --------------------------- | --------------------------------------------------- |
| src/data/yoyo-assets.ts     | 16 个主视觉的路径、尺寸、来源、用途、类别与图像约束 |
| src/data/assets.ts          | 49 项辅助记录、状态、文件路径和 intended layer      |
| src/data/gallery.ts         | 画廊卡片、类别、描述与编号                          |
| src/data/applications.ts    | 五类应用演示内容与图像对应关系                      |
| src/data/landing-content.ts | 页面导航、视觉原则、六项实验和工作流步骤            |

UI 的计数和过滤从这些模型推导，不重复在 JSX 中维护展示数字。资产清单由 scripts/generate-asset-inventory.mjs 读取模型后生成。

## 状态边界

- 全局：App 的当前预览项；null 时不显示 dialog。
- 局部：各组件使用 useState；筛选/搜索变化会重置对应分页或类别状态。
- 系统状态：MotionPoster 与 ScrollReveal 监听 prefers-reduced-motion。
- 不持久化：刷新后回到默认场景；该页面没有数据库、URL 状态同步或外部 API。

## 样式入口

src/main.tsx 先载入 design tokens、基础 tokens 和全局样式，再载入旧 Gallery/Landing 基础表和 YOYO 体验覆盖表。多个样式表仍有历史重叠选择器，因此改动公共 class 后必须检查五种视口；后续可分期合并，不在本轮扩大重构面。
