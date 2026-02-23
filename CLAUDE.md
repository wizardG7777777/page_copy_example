# Page Copy Example

## 项目概述

这是一个**网页复刻/重建项目集合**。项目采用 monorepo 式的目录结构，**每个被复刻的网站独占一个顶层文件夹**，各网站项目之间完全独立。

## 目录结构规则

```
page_copy_example/          ← 项目根目录（不含任何网站代码）
├── CLAUDE.md
├── LICENSE
├── .gitignore
├── .mcp.json               ← MCP 工具配置（Playwright + Firecrawl）
├── changdu-platform/       ← 网站项目 1：常读分销平台
├── another-site/           ← 网站项目 2（示例，未来新增）
└── ...
```

**关键原则：**
- 根目录只放全局配置文件（LICENSE、.gitignore、.mcp.json、CLAUDE.md）
- 每个网站文件夹是一个**独立的、自包含的前端项目**，拥有自己的 `package.json`、`node_modules/`、构建配置等
- 新增网站时，在根目录下创建新文件夹即可，不要修改其他网站的内容

## 各网站项目的通用结构

每个网站文件夹通常包含：

```
<site-name>/
├── package.json            ← 独立的依赖管理
├── vite.config.js          ← Vite 构建配置
├── eslint.config.js        ← ESLint 配置
├── index.html              ← Vite 入口 HTML
├── src/                    ← React 源代码
│   ├── main.jsx
│   ├── App.jsx
│   └── ...
├── docs/                   ← 业务文档 / 设计稿
├── legacy-html/            ← 原始静态 HTML 参考（被复刻的原页面）
└── public/                 ← 静态资源
```

## 技术栈

- **框架**: React 19 (JSX，非 TypeScript)
- **构建工具**: Vite 8 (beta)
- **CSS**: 纯 CSS + CSS Custom Properties，无预处理器
- **包管理**: npm
- **代码规范**: ESLint (flat config) + react-hooks + react-refresh 插件

## 常用命令

所有命令需在**对应网站文件夹内**执行：

```bash
cd changdu-platform    # 先进入网站目录
npm install            # 安装依赖
npm run dev            # 启动开发服务器
npm run build          # 生产构建
npm run lint           # 代码检查
npm run preview        # 预览生产构建
```

## MCP 工具

项目配置了两个 MCP 服务器（见 `.mcp.json`）：
- **Playwright**: 浏览器自动化，用于查看和测试页面
- **Firecrawl**: 网页抓取，用于获取目标网站的内容和结构

## 工作流程

1. 使用 Firecrawl 抓取目标网站内容和结构
2. 使用 Playwright 在浏览器中查看目标网站
3. 在根目录新建文件夹，用 Vite + React 重建页面
4. 将原始 HTML 保存到 `legacy-html/` 作为参考
5. 业务文档放入 `docs/`

## 注意事项

- `.mcp.json` 包含 API 密钥，已在 `.gitignore` 中排除，不要提交到版本库
- 每个网站项目有自己的 `.gitignore`，根目录也有全局的 `.gitignore`
- 不要在根目录安装 npm 依赖，根目录没有 `package.json`
