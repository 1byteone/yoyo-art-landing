# Asset Inventory

Generated from src/data/yoyo-assets.ts and src/data/assets.ts by node scripts/generate-asset-inventory.mjs on 2026-11-23. File existence and byte sizes are checked against the current workspace on every generation.

## Summary

| Inventory                                          | Count |
| -------------------------------------------------- | ----: |
| Primary illustrations                              |    16 |
| Auxiliary entries                                  |    49 |
| Unique image files referenced by these inventories |    19 |
| Auxiliary status: Available                        |     0 |
| Auxiliary status: Integrated                       |    27 |
| Auxiliary status: Needs Optimization               |     0 |
| Auxiliary status: Missing                          |    22 |
| Auxiliary status: Rejected                         |     0 |

The 16 gallery images are 384 × 256 WebP crops from the user-provided 1536 × 1024 contact sheet. They are not 16 independent high-resolution source files. Transparent foreground variants are separate source files and are not part of the 16-scene gallery count.

## Contact Sheet

The supplied 4 × 4 scene contact sheet was used to verify the crop mapping but is not included in the public repository. The 16 optimized crops are included under `public/assets/gallery/`; the original contact sheet remains in the private/local working materials.

## Primary Illustrations

| ID      | Name           | Original file                | Dimensions | Format |    Size | Alpha | Category     | Verified content                             | Recommended usage      | object-fit | Crop safe |
| ------- | -------------- | ---------------------------- | ---------: | ------ | ------: | ----- | ------------ | -------------------------------------------- | ---------------------- | ---------- | --------- |
| HERO-01 | 模块化建造工坊 | 01-build-studio.webp         |  384 × 256 | WebP   | 28.6 KB | No    | Spatial      | 起重机、建造平台和协作人物组成的模块化工坊。 | 品牌 Hero、场景预览    | contain    | No        |
| HERO-02 | AI 创作工作台  | 02-ai-workbench.webp         |  384 × 256 | WebP   | 24.7 KB | No    | Experiments  | 机器人、笔记本电脑和紫绿模块化创作桌面。     | AI 创意工具、实验海报  | contain    | No        |
| HERO-03 | 机器人实验室   | 03-robotics-lab.webp         |  384 × 256 | WebP   | 28.7 KB | No    | Experiments  | 机械臂、实验台与数字设备构成的实验环境。     | 机器人与技术实验场景   | contain    | No        |
| HERO-04 | 模块化数字校园 | 04-modular-campus.webp       |  384 × 256 | WebP   | 28.4 KB | No    | Spatial      | 模块建筑、路径与水岸形成完整的等距园区。     | 空间构图、品牌世界     | contain    | No        |
| HERO-05 | 共创社区       | 05-community-hub.webp        |  384 × 256 | WebP   | 26.3 KB | No    | Experiments  | 多个协作席位围绕中心模块展开。               | 协作产品、流程场景     | contain    | No        |
| HERO-06 | 知识图书馆     | 06-knowledge-library.webp    |  384 × 256 | WebP   | 29.7 KB | No    | Spatial      | 书架、开放书页与检索节点组成的知识空间。     | 资产库、知识产品       | contain    | No        |
| HERO-07 | 软件连接网络   | 07-software-network.webp     |  384 × 256 | WebP   | 22.1 KB | No    | Identity     | 中心服务模块与外围节点通过路径相连。         | 软件架构、系统关系     | contain    | No        |
| HERO-08 | 协作圆桌       | 08-collaboration-circle.webp |  384 × 256 | WebP   | 25.3 KB | No    | Experiments  | 人物围绕中央模块建立共享协作空间。           | 协作空间、社区体验     | contain    | No        |
| HERO-09 | 视觉设计室     | 09-design-studio.webp        |  384 × 256 | WebP   | 26.0 KB | No    | Identity     | 设计师、大屏和几何图形共同构成创作现场。     | 品牌视觉、动态海报     | contain    | No        |
| HERO-10 | 开发者工具台   | 10-developer-tools.webp      |  384 × 256 | WebP   | 26.4 KB | No    | Identity     | 开发者在屏幕与模块工作台之间构建工具。       | 开发者产品、工具界面   | contain    | No        |
| HERO-11 | 交互展示舞台   | 11-interactive-stage.webp    |  384 × 256 | WebP   | 23.2 KB | No    | Experiments  | 共享大屏与舞台空间呈现实时数字内容。         | 交互演示、产品发布     | contain    | No        |
| HERO-12 | 团队工作流     | 12-team-workflow.webp        |  384 × 256 | WebP   | 25.7 KB | No    | Experiments  | 多个任务节点在团队共享空间中推进。           | 工作流产品、流程实验   | contain    | No        |
| HERO-13 | 数据观测站     | 13-data-observatory.webp     |  384 × 256 | WebP   | 24.9 KB | No    | Identity     | 仪表屏幕与数据模块组成的观测环境。           | 数据产品、信息表达     | contain    | No        |
| HERO-14 | 机器人协作组   | 14-robot-collective.webp     |  384 × 256 | WebP   | 24.7 KB | No    | Illustration | 多个机器人角色在共同的平台上协作。           | 角色资产、产品协作故事 | contain    | No        |
| HERO-15 | 积木水岸社区   | 15-modular-village.webp      |  384 × 256 | WebP   | 23.3 KB | No    | Spatial      | 房屋、方形树木和水岸连接成一组社区。         | 品牌场景、空间构图     | contain    | No        |
| HERO-16 | 全球代码网络   | 16-global-code.webp          |  384 × 256 | WebP   | 26.3 KB | No    | Identity     | 地球与代码模块代表跨地域数字连接。           | 品牌识别、软件网络     | contain    | No        |

## Auxiliary Assets

Statuses are restricted to `Available`, `Integrated`, `Needs Optimization`, `Missing`, and `Rejected`. `Integrated` can refer to an existing image used in a composition or to a responsive CSS/DOM treatment; repeated image paths are intentional reuse, not additional image files. Rows with no path remain visible as missing and are never silently substituted.

| ID  | Name                          | Original path                                    | Category   |         Dimensions | Alpha          | Intended usage / layer               | Status     | Disk verification                                            |
| --- | ----------------------------- | ------------------------------------------------ | ---------- | -----------------: | -------------- | ------------------------------------ | ---------- | ------------------------------------------------------------ |
| 01  | Warm Ivory Paper Texture      | —                                                | background |                  — | unknown        | Whole page / Background              | Missing    | No file provided                                             |
| 02  | Ambient Light Overlay         | —                                                | background |                  — | unknown        | Hero / Background                    | Missing    | No file provided                                             |
| 03  | Isometric Geometric Sky       | —                                                | background |                  — | unknown        | Hero / Background                    | Missing    | No file provided                                             |
| 04  | Modular Clouds                | —                                                | background |                  — | unknown        | Hero / Background                    | Missing    | No file provided                                             |
| 05  | Layered Geometric Hills       | —                                                | background |                  — | unknown        | Hero / Background                    | Missing    | No file provided                                             |
| 06  | Modular Architecture Skyline  | —                                                | background |                  — | unknown        | Hero / Background                    | Missing    | No file provided                                             |
| 07  | Floating Building Blocks      | /assets/gallery/01-build-studio.webp             | background |          384 × 256 | no             | Hero / Midground                     | Integrated | /assets/gallery/01-build-studio.webp · 28.6 KB               |
| 08  | Geometric Dust Particles      | —                                                | background |                  — | unknown        | Hero / Atmosphere                    | Missing    | No file provided                                             |
| 09  | Botanical Foreground Cluster  | —                                                | foreground |                  — | unknown        | Hero / Foreground                    | Missing    | No file provided                                             |
| 10  | Modular Garden Cluster        | /assets/gallery/15-modular-village.webp          | foreground |          384 × 256 | no             | Applications / Foreground            | Integrated | /assets/gallery/15-modular-village.webp · 23.3 KB            |
| 11  | Geometric Trees               | /assets/gallery/15-modular-village.webp          | foreground |          384 × 256 | no             | Applications / Foreground            | Integrated | /assets/gallery/15-modular-village.webp · 23.3 KB            |
| 12  | Modular Planter               | —                                                | foreground |                  — | unknown        | Hero / Foreground                    | Missing    | No file provided                                             |
| 13  | Stylized Grass Clusters       | —                                                | foreground |                  — | unknown        | Hero / Foreground                    | Missing    | No file provided                                             |
| 14  | Oversized Studded Blocks      | /assets/foreground/yoyo-modular-foreground.webp  | foreground |        1536 × 1024 | yes            | Hero / Foreground                    | Integrated | /assets/foreground/yoyo-modular-foreground.webp · 349.1 KB   |
| 15  | Garden Platform Foreground    | /assets/foreground/yoyo-foreground-variant-2.png | foreground |         2135 × 736 | yes            | Hero / Foreground                    | Integrated | /assets/foreground/yoyo-foreground-variant-2.png · 1044.6 KB |
| 16  | Product Platform Foreground   | /assets/foreground/yoyo-foreground-variant-3.png | foreground |         2135 × 736 | yes            | Hero / Foreground                    | Integrated | /assets/foreground/yoyo-foreground-variant-3.png · 889.7 KB  |
| 17  | Floating Modular Platforms    | —                                                | midground  |                  — | unknown        | Visual system / Midground            | Missing    | No file provided                                             |
| 18  | Architectural Arches          | —                                                | midground  |                  — | unknown        | Visual system / Midground            | Missing    | No file provided                                             |
| 19  | Modular Bridges               | /assets/foreground/yoyo-modular-foreground.webp  | midground  |        1536 × 1024 | yes            | Hero / Midground                     | Integrated | /assets/foreground/yoyo-modular-foreground.webp · 349.1 KB   |
| 20  | Mechanical Sculptures         | /assets/gallery/03-robotics-lab.webp             | midground  |          384 × 256 | no             | Applications / Midground             | Integrated | /assets/gallery/03-robotics-lab.webp · 28.7 KB               |
| 21  | Geometric Sculptures          | —                                                | midground  |                  — | unknown        | Visual system / Midground            | Missing    | No file provided                                             |
| 22  | Orbital Rings                 | /assets/gallery/11-interactive-stage.webp        | midground  |          384 × 256 | no             | Applications / Midground             | Integrated | /assets/gallery/11-interactive-stage.webp · 23.2 KB          |
| 23  | Modular Staircase             | /assets/gallery/06-knowledge-library.webp        | midground  |          384 × 256 | no             | Applications / Midground             | Integrated | /assets/gallery/06-knowledge-library.webp · 29.7 KB          |
| 24  | Floating Architectural Frames | —                                                | midground  |                  — | unknown        | Visual system / Midground            | Missing    | No file provided                                             |
| 25  | Gallery Display Platform      | src/components/HeroGallery.tsx                   | gallery    | Responsive CSS/DOM | not applicable | Hero gallery / Main visual           | Integrated | src/components/HeroGallery.tsx · 7.1 KB                      |
| 26  | Floating Card Shadow          | src/styles/yoyo-experience.css                   | gallery    | Responsive CSS/DOM | not applicable | Gallery / Main visual                | Integrated | src/styles/yoyo-experience.css · 48.5 KB                     |
| 27  | Geometric Card Decoration     | src/styles/yoyo-experience.css                   | gallery    | Responsive CSS/DOM | not applicable | Gallery / Decoration                 | Integrated | src/styles/yoyo-experience.css · 48.5 KB                     |
| 28  | Presentation Pedestal         | —                                                | gallery    |                  — | unknown        | Gallery / Midground                  | Missing    | No file provided                                             |
| 29  | Gallery Background Texture    | —                                                | gallery    |                  — | unknown        | Gallery / Background                 | Missing    | No file provided                                             |
| 30  | Geometric Separators          | src/styles/yoyo-experience.css                   | gallery    | Responsive CSS/DOM | not applicable | Whole page / Decoration              | Integrated | src/styles/yoyo-experience.css · 48.5 KB                     |
| 31  | Brand Mark                    | src/components/SiteNavigation.tsx                | brand      | Responsive CSS/DOM | not applicable | Navigation and footer / Content      | Integrated | src/components/SiteNavigation.tsx · 1.7 KB                   |
| 32  | Modular Mascot                | —                                                | brand      |                  — | unknown        | Hero / Main visual                   | Missing    | No file provided                                             |
| 33  | Modular Icon System           | src/components/HeroGallery.tsx                   | brand      | Responsive CSS/DOM | not applicable | Navigation and controls / Content    | Integrated | src/components/HeroGallery.tsx · 7.1 KB                      |
| 34  | Brand Pattern                 | —                                                | brand      |                  — | unknown        | Whole page / Background              | Missing    | No file provided                                             |
| 35  | Brand Emblem                  | src/components/SiteNavigation.tsx                | brand      | Responsive CSS/DOM | not applicable | Navigation and footer / Content      | Integrated | src/components/SiteNavigation.tsx · 1.7 KB                   |
| 36  | Typographic Ornament          | src/components/SectionHeading.tsx                | brand      | Responsive CSS/DOM | not applicable | Section headings / Content           | Integrated | src/components/SectionHeading.tsx · 0.7 KB                   |
| 37  | Composition Layer Transitions | src/components/CompositionPlayground.tsx         | motion     | Responsive CSS/DOM | not applicable | Spatial composition / Layer controls | Integrated | src/components/CompositionPlayground.tsx · 7.8 KB            |
| 38  | Parallax Environment          | —                                                | motion     |                  — | unknown        | Hero / Background                    | Missing    | No file provided                                             |
| 39  | Motion Poster Controls        | src/components/MotionPoster.tsx                  | motion     | Responsive CSS/DOM | not applicable | Motion poster / Main visual          | Integrated | src/components/MotionPoster.tsx · 3.5 KB                     |
| 40  | Rotating Objects              | —                                                | motion     |                  — | unknown        | Gallery / Midground                  | Missing    | No file provided                                             |
| 41  | Ambient Particles             | —                                                | motion     |                  — | unknown        | Hero / Atmosphere                    | Missing    | No file provided                                             |
| 42  | Loading Illustration          | —                                                | motion     |                  — | unknown        | Loading state / Content              | Missing    | No file provided                                             |
| 43  | Preview Entry Transition      | src/styles/yoyo-experience.css                   | motion     | Responsive CSS/DOM | not applicable | Preview dialog / Transition          | Integrated | src/styles/yoyo-experience.css · 48.5 KB                     |
| 44  | Product Showcase              | /assets/gallery/02-ai-workbench.webp             | sections   |          384 × 256 | no             | Hero and applications / Main visual  | Integrated | /assets/gallery/02-ai-workbench.webp · 24.7 KB               |
| 45  | Creative Workflow             | /assets/gallery/12-team-workflow.webp            | sections   |          384 × 256 | no             | Applications / Main visual           | Integrated | /assets/gallery/12-team-workflow.webp · 25.7 KB              |
| 46  | Asset Library                 | /assets/gallery/06-knowledge-library.webp        | sections   |          384 × 256 | no             | Asset archive / Main visual          | Integrated | /assets/gallery/06-knowledge-library.webp · 29.7 KB          |
| 47  | Software Architecture         | /assets/gallery/07-software-network.webp         | sections   |          384 × 256 | no             | Applications / Main visual           | Integrated | /assets/gallery/07-software-network.webp · 22.1 KB           |
| 48  | Collaborative Workspace       | /assets/gallery/08-collaboration-circle.webp     | sections   |          384 × 256 | no             | Applications / Main visual           | Integrated | /assets/gallery/08-collaboration-circle.webp · 25.3 KB       |
| 49  | Footer Landscape              | /assets/foreground/yoyo-modular-foreground.webp  | sections   |        1536 × 1024 | yes            | Closing section / Foreground         | Integrated | /assets/foreground/yoyo-modular-foreground.webp · 349.1 KB   |
