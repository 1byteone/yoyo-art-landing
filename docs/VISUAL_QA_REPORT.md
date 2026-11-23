# 视觉 QA 报告

验收日期：2026-11-23。对象：YOYO 品牌实验场最新实现。验收目标是兑现 YOYO Art Direction 与响应式/交互要求，不是把刻意不同的品牌画面与 Oil UI 截图做像素覆盖比较。

## 验收条件

- Playwright Chromium；视口为 1920 × 1080、1440 × 900、1280 × 800、768 × 1024、390 × 844。
- 等待 document.fonts.ready；截图前所有 img 改为 eager 并等待 decode。
- screenshot animations disabled；截图基线模拟 prefers-reduced-motion，保证滚动动效不会因采样相位而变化。
- 运行 npm run assets:inventory 核验 16 张主图、49 项辅助记录和文件路径。
- 人工检查桌面首屏、桌面整页和手机整页；自动断言每个目标视口无横向溢出、所有章节存在、作品网格列数与卡片宽度正确。

## 修复轮次记录

| 轮次 | 检查重点         | 发现/处理                                                           | 证据                                                     |
| ---- | ---------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| 1    | 页面与资产初审   | 发现 gallery grid 声明缺 display:grid；记录主图分辨率与缺失素材边界 | artifacts/after/yoyo-rebuild/；docs/ASSET_INVENTORY.md   |
| 2    | 网格和构图       | 修复桌面 12 栏/移动 2 栏网格；验证真实列数和卡片比例                | artifacts/after/yoyo-round-2/；Playwright visual.spec.ts |
| 3    | 滚动与动效       | 挂载 ScrollReveal；增加有限幅度的主视觉视差；响应减少动态偏好       | interactions.spec.ts 滚动回归                            |
| 4    | 图像与响应式复核 | 将画布底色匹配到源图纸白；复查五视口及章节叙事                      | artifacts/after/yoyo-round-4/；50% overlay 差异图        |

最终基线在 artifacts/after/yoyo-final/。轮次 3 与 4 的同尺寸 50% overlay 位于 artifacts/visual-diff/；它仅比较同一 YOYO 页面的小幅实现修正，不和 Oil UI 做品牌像素比较。

## 当前检查结果

| 检查                     | 结果                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| npm run assets:inventory | 通过；16 张主图、49 项辅助记录；27 项已接入，22 项缺失；Integrated 路径均存在                    |
| npm run verify           | 通过；TypeScript、ESLint、Prettier 和 7 个 Playwright 测试全部通过                               |
| Playwright 交互          | 5 个交互用例通过，包含三轨连续滑动/暂停/减少动态、六项实验、导航和资产状态                       |
| Playwright 视口          | 2 个视觉/资源用例通过，覆盖五个视口、章节、网格、21 个 Hero 图块（16 张唯一主图）及 3 张前景解码 |
| 无横向溢出               | 五个目标视口的 documentWidth 均等于 viewportWidth                                                |
| 页面尺寸                 | 1440 × 900 下整页高 11,769px；390 × 844 下整页高 13,688px                                        |
| npm run build            | 通过；Vite 转换 2,154 个模块并生成生产构建                                                       |
| 页面脚本错误             | visual.spec.ts 收集 pageerror 和 console.error，结果为空                                         |

## 最终截图

| 截图                                                 | 用途                       |
| ---------------------------------------------------- | -------------------------- |
| artifacts/after/yoyo-final/desktop-1920.png          | 宽屏首屏                   |
| artifacts/after/yoyo-final/desktop-1440.png          | 标准桌面首屏               |
| artifacts/after/yoyo-final/desktop-1440-fullpage.png | 标准桌面完整叙事与章节节奏 |
| artifacts/after/yoyo-final/desktop-1280.png          | 紧凑桌面首屏               |
| artifacts/after/yoyo-final/tablet-768.png            | 平板竖屏首屏               |
| artifacts/after/yoyo-final/mobile-390.png            | 手机首屏                   |
| artifacts/after/yoyo-final/mobile-390-fullpage.png   | 手机完整章节顺序与长页密度 |

## 人工视觉结论

- Hero 保留 YOYO 文案与 CTA，并恢复三条斜置的连续图片轨道；桌面按左/右/左方向差速运行，手机重排轨道密度，前景切换与运动控制保持可用。
- 视觉基因、构图、应用与实验章节在白/暖灰区域间交替，形成清晰的长页节奏；作品网格通过跨栏避免完全同宽同高的列表。
- 画廊网格缺失 display:grid 曾导致 16 项单列；修复后桌面 12 栏和手机 2 栏均由浏览器计算样式验证。
- 滚动进入揭示只作用于指定展示单元；Hero 与构图图层出现有限的不同位移，不使用持续漂浮或旋转。
- Hero 图片墙的主图保持完整显示，卡片底色匹配裁图白底 #F6F6F6；滚动视差与连续滑动独立运行，减少动态偏好会停止两类运动。
- 主图是白底 384 × 256 栅格图而非透明矢量图；上采样仍有柔化，这是剩余最明显的视觉质量限制。
- 不把 YOYO 与 Oil UI 做像素覆盖验收，因为品牌和图像语义刻意不同；本次 50% overlay 只用于检查同一页面相邻修正。旧的 reference/comparison 产物只作历史资料。

## 缺陷级别

- P0：本轮未发现结构缺失、资源加载失败、关键操作失效或目标视口横向溢出。
- P1：16 张低分辨率源图和 22 项缺失辅助素材仍限制画面清晰度与真实分层；等待真实源文件，非 CSS 能修复。
- P2：少数编号与微注释小于常规正文；需按最终展示设备和可读性目标决定是否放大。
