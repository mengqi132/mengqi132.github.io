# Yizhou Zhang · Personal Homepage

Next.js 15（静态导出）+ Framer Motion 构建的个人学术主页：
深色/浅色模式 · 中英文切换 · BibTeX 驱动的论文列表（搜索 / 筛选 / 一键复制引用）· 全端自适应。

## 日常维护

| 需求 | 做法 |
| --- | --- |
| 新增/修改论文 | 编辑 `public/publications.bib`，粘贴标准 BibTeX 条目即可自动解析（支持 `type` / `figure` / `pdf` / `code` / `note` 自定义字段） |
| 插入论文代表性图 | 把图片放进 `public/figures/`，文件名与 bib 条目里的 `figure = {figures/xxx.png}` 对应（建议 4:3） |
| 更换头像 | 替换 `public/avatar.jpg` |
| 修改文案 | 中文/英文文案都在 `lib/i18n.tsx` 的字典里 |
| 修改配色 | `app/globals.css` 顶部的 CSS 变量（`:root` 与 `.dark`） |

## 技术栈

- Next.js 15 App Router · `output: 'export'` 纯静态
- Framer Motion：首页逐行浮现、滚动浮现、抽屉动画、按钮反馈
- 自研 BibTeX 解析器（无依赖），运行时读取 `publications.bib`
- 无 Tailwind，全部为手写 CSS（CSS 变量 + 网格布局）
