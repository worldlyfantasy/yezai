# 野哉 · 网页演示

以 Next.js + Tailwind CSS + TypeScript 构建的网页端 Demo，帮助团队快速理解“野哉”项目的功能流程与视觉调性。所有数据均为本地 mock，图片亦为本地生成的低饱和 SVG。

## 快速开始

```bash
npm install
npm run dev
```

自动打开 `http://localhost:3000` 即可浏览。项目使用 App Router，所有页面均已接好 mock 数据：

- `/` 首页（Hero、精选创作者/目的地/灵感、运作流程、成为创作者）
- `/creators` 创作者列表（可按目的地、旅行风格筛选）
- `/creators/[slug]` 创作者详情（服务、适合/不适合、小团、评价）
- `/destinations` 目的地网格（搜索筛选）
- `/destinations/[slug]` 目的地详情（服务类型/风格筛选）
- `/services/[slug]` 服务详情（交付、排期、退款说明、托管提示）
- `/ideas` 旅行灵感列表（主题过滤）
- `/ideas/[slug]` 文章详情（杂志排版、引用、作者卡片）
- `/how-it-works` 如何运作（信任机制解释 + CTA）

演示中的“去小程序下单”按钮统一触发弹窗，展示 Logo、二维码占位块与托管说明。

## 设计系统

- **Design Tokens**：`app/globals.css` + `tailwind.config.ts` 定义了 Earth Palette（低饱和大地色）、字体栈（`font-serif-cn`/`font-sans-cn`）、圆角、阴影与纸张纹理。
- **组件**：导航、卡片、过滤器、CTA 按钮、印章式标识、统一弹窗等均复用 tokens，避免页面单独堆样式。
- **纹理**：全站背景使用极轻的 SVG noise，卡片有更细腻的纸质肌理。

## Mock 数据

`/data` 目录包含：

- `types.ts`：Creators / Destinations / Services / Ideas 等类型定义
- `creators.ts`：8 位创作者档案（立场、适合/不适合、服务、评价等）
- `destinations.ts`：12 个目的地（封面、说明、统计）
- `services.ts`：12 个服务条目（类型、交付物、退款规则、标签）
- `ideas.ts`：10 篇长文旅行灵感（800+ 字正文、主题、封面）
- `helpers.ts`：筛选与查找工具函数（用于页面过滤和路由数据）

如需扩展，只需按类型新增条目，页面会自动读取对应数据。

## Mock 图片生成

执行 `npm run gen:mock` 会调用 `scripts/generate-mock-assets.ts`（通过 `ts-node` 运行 TypeScript）在 `public/generated/` 内生成/更新：

- 创作者头像 `creator-01.svg ~ creator-08.svg`（圆形裁切 + 低饱和肤色/发色 + 颗粒纹理）
- 目的地封面 `dest-01.svg ~ dest-12.svg`（多层地形、纸张噪点、LOGO 角标）
- 灵感封面 `idea-01.svg ~ idea-10.svg`（杂志排版 + 低饱和风景）

脚本会自动读取 `public/yezai.png` 作为角标 Logo；若需替换品牌，只要更新该 Logo 并重新执行命令即可。

## 本地资源

- 所有图片位于 `public/generated/`（8 张创作者头像 SVG、12 张目的地封面、10 张灵感封面）。
- 项目根目录需要 `yezai.png`，启动脚本会读取到 `public/yezai.png` 并用于 Header、弹窗与 favicon（`app/icon.png`）。如需替换，请将新 Logo 命名为 `yezai.png` 并放在 `public/` 根目录。

## 目录结构

```
app/              App Router 页面（含全局布局、各详情/列表页）
components/      视觉组件（导航、卡片、过滤器、弹窗等）
data/            类型 + mock 数据 + helpers
lib/             工具函数（cn）
public/generated 本地生成 SVG 资产
styles/          预留，当前样式集中在 app/globals.css
```

## 扩展建议

1. 在 `/data` 中新增创作者或服务后，即可在页面自动体现；若需要额外字段，可在 `types.ts` 中补充类型。
2. 若需要接入真实 API，可在 `/lib` 下添加请求层，并于页面 `fetch` 后注入组件。
3. 若需要自定义二维码或 Logo，只需替换 `public/yezai.png` 与 `/components/order-modal.tsx` 中的占位 SVG。
