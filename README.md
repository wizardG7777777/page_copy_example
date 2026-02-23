# Page Copy Example

一个**网页复刻/重建项目集合**，采用 monorepo 目录结构管理多个独立的前端项目。每个被复刻的网站独占一个顶层文件夹，各项目之间完全独立。

## 📁 项目结构

```
page_copy_example/          ← 项目根目录（不含任何网站代码）
├── README.md               ← 本文件
├── AGENTS.md               ← 开发代理指南
├── LICENSE
├── .gitignore
├── .mcp.json               ← MCP 工具配置（Playwright + Firecrawl）
├── changdu-platform/       ← 网站项目 1：常读分销平台
│   ├── package.json
│   ├── src/
│   └── ...
└── ...                     ← 未来新增网站项目
```

**关键原则：**
- 根目录只放全局配置文件（LICENSE、.gitignore、.mcp.json、CLAUDE.md、README.md、AGENTS.md）
- 每个网站文件夹是一个**独立的、自包含的前端项目**，拥有自己的 `package.json`、`node_modules/`、构建配置等
- 新增网站时，在根目录下创建新文件夹即可，不要修改其他网站的内容

## 🚀 快速开始

所有命令需在**对应网站文件夹内**执行：

```bash
# 进入网站目录
cd changdu-platform

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 代码检查
npm run lint

# 预览生产构建
npm run preview
```

## 🛠 技术栈

- **框架**: React 19 (JSX，非 TypeScript)
- **构建工具**: Vite 8
- **路由**: React Router v7
- **状态管理**: React Context API
- **CSS**: 纯 CSS + CSS Custom Properties（无预处理器）
- **包管理**: npm
- **代码规范**: ESLint (flat config)

## 🎯 项目列表

### changdu-platform（常读分销平台）

一个面向网文/短剧行业的内容分销平台，连接版权方、分销商和终端用户，采用 CPS 分佣模式。

**主要功能模块：**
- 🏠 **首页** - 平台介绍和入驻入口
- 🔐 **认证** - 登录/注册
- 📋 **入驻流程** - 四步入驻（申请→审核→签约→资质）
- 📊 **工作台** - 数据概览和快捷操作
- 🎬 **分销中心** - 短剧/小说列表、推广管理、回传配置
- 📈 **数据中心** - 应用统计、推广统计、订单统计、用户统计
- 👥 **账号管理** - 成员管理、授权管理
- ⚙️ **系统设置** - 充值模板配置
- 💰 **结算中心** - 账单管理、提现管理

**权限体系（三级角色）：**
- **集团账号 (admin)** - 全量数据权限，可管理成员和财务
- **主管账号 (manager)** - 团队数据权限，管理下属投手
- **投手账号 (caster)** - 个人数据权限，执行推广任务

## 🔧 MCP 工具

项目配置了两个 MCP 服务器（见 `.mcp.json`）：
- **Playwright**: 浏览器自动化，用于查看和测试页面
- **Firecrawl**: 网页抓取，用于获取目标网站的内容和结构

## 📝 工作流程

1. 使用 Firecrawl 抓取目标网站内容和结构
2. 使用 Playwright 在浏览器中查看目标网站
3. 在根目录新建文件夹，用 Vite + React 重建页面
4. 将原始 HTML 保存到 `legacy-html/` 作为参考
5. 业务文档放入 `docs/`
6. 截图放入项目根目录用于设计参考

## ⚠️ 注意事项

- `.mcp.json` 包含 API 密钥，已在 `.gitignore` 中排除，**不要提交到版本库**
- 每个网站项目有自己的 `.gitignore`，根目录也有全局的 `.gitignore`
- **不要在根目录安装 npm 依赖**，根目录没有 `package.json`
- 新增网站项目时，遵循现有项目的目录结构和代码风格

## 📄 License

[MIT](./LICENSE)
