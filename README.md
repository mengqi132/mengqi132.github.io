# Yizhou Zhang · Personal Homepage

Next.js 15（静态导出）+ Framer Motion 构建的个人学术主页：
深色/浅色模式 · 中英文切换 · BibTeX 驱动的论文列表（搜索 / 筛选 / 一键复制引用）· 全端自适应。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 静态产物输出到 out/
```

## 部署到 GitHub Pages（推荐：用户主页仓库）

1. 在 GitHub 新建一个**公开**仓库，名字必须是 **`mengqi132.github.io`**（这样网站地址就是 `https://mengqi132.github.io`，没有子路径）。
2. 把本目录全部文件推送到该仓库的 `main` 分支：

   ```bash
   git init
   git add .
   git commit -m "Personal homepage"
   git branch -M main
   git remote add origin https://github.com/mengqi132/mengqi132.github.io.git
   git push -u origin main
   ```

3. 打开仓库 **Settings → Pages**，把 Source 选为 **GitHub Actions**。
4. 推送后 `.github/workflows/deploy.yml` 会自动构建并发布，约 1–2 分钟后访问 <https://mengqi132.github.io>。

> 如果你想直接用已有的 `mengqi132/mengqi132` 仓库（项目页，地址为 `https://mengqi132.github.io/mengqi132/`）：
> 同样推送代码、在 Settings → Pages 选择 GitHub Actions 即可。
> 工作流会自动检测仓库名并设置 `BASE_PATH`，无需改任何配置。

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
