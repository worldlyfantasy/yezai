# 字体与视觉升级 — 检查清单

## 视觉验证

- [ ] **首页**：Hero 标题字重约 600、行高紧凑；正文约 1.68 行高；section 小标签为 13px、浅灰
- [ ] **导航**：链接 13px、字距略松；Logo「野哉」字重 600
- [ ] **卡片**：边框与阴影更轻（软阴影）；标题 font-semibold、行高 1.25
- [ ] **Chip / Badge**：圆角、padding 适中，字重 500、13px
- [ ] **数字**：价格、天数、统计（如「6 条路线 · 3 位创作者」）使用 tabular-nums 对齐
- [ ] **灰阶**：主文字约 #1f1f1f、次要 #2a2a2a、辅助 #6b6b6b，无纯黑

## 性能验证

- [ ] **Network**：仅加载 Inter（latin）；无中文字体请求
- [ ] **Lighthouse**：无 FOIT；字体相关 CLS 可接受
- [ ] **Bundle**：`next/font` 仅引入 Inter variable，体积约数十 KB 量级

## 多端验证

- [ ] **macOS**：Safari/Chrome — 中文为 PingFang / 苹方
- [ ] **Windows**：Edge/Chrome — 中文为 Microsoft YaHei
- [ ] **Android**：Chrome — 系统默认无衬线
- [ ] **iOS**：Safari — 苹方；数字/英文为 Inter（若加载成功）

## 涉及文件一览

| 文件 | 改动要点 |
|------|----------|
| `app/layout.tsx` | next/font Inter (variable), display: swap, html + body 字体类 |
| `app/globals.css` | 排版 token、灰阶、shadow-card/float、.text-meta / .text-caption / .tabular-nums |
| `tailwind.config.ts` | fontFamily.sans (Inter + CN)、fontSize meta/caption、lineHeight、boxShadow |
| `components/ui/card.tsx` | 边框/阴影、CardTitle/CardDescription 字级与行高 |
| `components/ui/badge.tsx` | 字级、字距、padding |
| `components/ui/button.tsx` | tabular-nums |
| `components/site-header.tsx` | 导航 text-meta、字距、Logo 字重 |
| `components/creator-card.tsx` | 标题字重/行高、meta 行 tabular-nums |
| `components/destination-card.tsx` | 同上 + text-caption 统计行 |
| `components/idea-card.tsx` | 同上 |
| `components/service-card.tsx` | 价格/天数 tabular-nums、字级 |
| `components/home-hero.tsx` | h1 字重 600、行高、正文 leading-body |
| `app/page.tsx` | section 标签 text-meta、标题 font-semibold、正文 leading-body |
