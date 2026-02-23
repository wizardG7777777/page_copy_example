# AGENTS.md - 开发代理指南

本文档为 AI 开发代理提供项目背景、编码规范和开发指南。

## 📋 项目概述

**Page Copy Example** 是一个网页复刻/重建项目集合，使用 monorepo 结构管理多个独立的前端项目。每个网站项目都是完整的 React + Vite 应用。

当前主要项目：**changdu-platform**（常读分销平台）- 一个网文/短剧内容分销平台。

## 🏗 技术架构

### 技术栈
- **框架**: React 19 (JSX)
- **构建工具**: Vite 8
- **路由**: React Router v7 (`createBrowserRouter`)
- **状态管理**: React Context API (`AuthContext`)
- **样式**: 纯 CSS + CSS 变量
- **HTTP**: 预留 `services/` 目录，当前使用 mock 数据

### 目录结构规范

```
<site-name>/
├── package.json            # 独立的依赖管理
├── vite.config.js          # Vite 构建配置
├── eslint.config.js        # ESLint 配置
├── index.html              # Vite 入口 HTML
├── src/
│   ├── main.jsx            # 应用入口
│   ├── App.jsx             # 根组件
│   ├── index.css           # 全局样式 + CSS 变量
│   ├── router/
│   │   ├── index.jsx       # 路由配置
│   │   └── guards.jsx      # 路由守卫
│   ├── store/
│   │   └── AuthContext.jsx # 全局状态管理
│   ├── hooks/
│   │   ├── useAuth.js      # 认证 hook
│   │   └── useRole.js      # 角色权限 hook
│   ├── layouts/            # 布局组件
│   │   ├── PublicLayout.jsx     # 公开页面布局
│   │   ├── OnboardingLayout.jsx # 入驻流程布局
│   │   └── DashboardLayout.jsx  # 工作台布局
│   ├── pages/              # 页面组件
│   │   ├── Home/
│   │   ├── Auth/
│   │   ├── Onboarding/
│   │   └── Dashboard/
│   ├── components/         # 公共组件
│   │   ├── common/         # 通用组件（预留）
│   │   ├── business/       # 业务组件
│   │   ├── form/           # 表单组件（预留）
│   │   └── charts/         # 图表组件（预留）
│   ├── utils/
│   │   └── constants.js    # 常量配置（菜单、步骤等）
│   └── data/               # Mock 数据
├── docs/                   # 业务文档 / 设计稿
├── legacy-html/            # 原始静态 HTML 参考
└── public/                 # 静态资源
```

## 🎨 编码规范

### 1. 组件规范

```jsx
// 函数组件使用默认导出
export default function ComponentName() {
  // 状态定义
  const [state, setState] = useState(initialValue);
  
  // 副作用
  useEffect(() => {
    // ...
  }, []);
  
  // 事件处理
  const handleClick = () => {
    // ...
  };
  
  // 渲染
  return (
    <div className="component-name">
      {/* ... */}
    </div>
  );
}
```

### 2. 样式规范

- **CSS 方案**: 纯 CSS，不使用预处理器或 CSS-in-JS
- **CSS 变量**: 在 `index.css` 的 `:root` 中定义全局变量
- **命名规范**: 语义化命名，不使用 BEM
- **文件组织**: 每个页面/组件独立的 `.css` 文件

```css
/* 全局变量定义 (index.css) */
:root {
  /* 颜色 */
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  --color-bg: #f3f4f6;
  --color-border: #e5e7eb;
  
  /* 尺寸 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --header-height: 64px;
  --sidebar-width: 220px;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
}

/* 页面样式 (PageName.css) */
.page-name {
  padding: 24px;
}

.page-name .section {
  margin-bottom: 16px;
}
```

### 3. 路由规范

```jsx
// router/index.jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <GuestGuard><LoginPage /></GuestGuard> }
    ]
  },
  {
    path: '/dashboard',
    element: <AuthGuard><OnboardingGuard><DashboardLayout /></OnboardingGuard></AuthGuard>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'distribution/dramas', element: <DramaListPage /> }
    ]
  }
]);
```

### 4. 路由守卫使用

| 守卫 | 用途 | 示例 |
|------|------|------|
| `AuthGuard` | 验证登录状态 | 所有后台页面 |
| `GuestGuard` | 阻止已登录用户 | 登录页 |
| `OnboardingGuard` | 验证入驻完成 | 工作台页面 |
| `RoleGuard` | 验证角色权限 | 结算管理、账号管理 |

```jsx
// 使用方式
<RoleGuard allowedRoles={['admin', 'manager']}>
  <MembersPage />
</RoleGuard>
```

### 5. 权限角色常量

```js
// utils/constants.js
export const ROLES = {
  ADMIN: 'admin',      // 集团账号 - 全部权限
  MANAGER: 'manager',  // 主管 - 账号管理、设置
  CASTER: 'caster'     // 投手 - 基础功能
};

export const ONBOARDING_STATUS = {
  NONE: 'none',
  PENDING_REVIEW: 'pending_review',
  APPROVED: 'approved',
  CONTRACT_SIGNED: 'contract_signed',
  COMPLETED: 'completed'
};
```

## 🔒 权限系统

### 三级账号体系

| 角色 | 标识 | 权限范围 | 可访问页面 |
|------|------|----------|-----------|
| **集团账号** | admin | 全部数据 | 所有页面 |
| **主管账号** | manager | 团队数据 | 除结算管理外的所有页面 |
| **投手账号** | caster | 个人数据 | 基础功能页面 |

### 权限控制页面

以下页面需要特定角色：
- `/dashboard/account/*` - 账号管理（admin/manager）
- `/dashboard/settings/*` - 系统设置（admin/manager）
- `/dashboard/settlement/*` - 结算管理（仅 admin）
- `/dashboard/profile` - 企业信息（仅 admin）

## 📝 开发流程

### 新增页面

1. 在 `src/pages/` 下创建目录和文件
2. 编写页面组件和样式
3. 在 `router/index.jsx` 中添加路由
4. 如需，添加到 `utils/constants.js` 的菜单配置
5. 根据需要添加路由守卫

### 新增组件

1. 通用组件放 `components/common/`
2. 业务组件放 `components/business/`
3. 表单组件放 `components/form/`
4. 图表组件放 `components/charts/`

### 使用 Mock 数据

当前项目使用 mock 数据，定义在：
- `src/data/` - 数据文件
- 页面内的常量数组 - 静态内容

## 🧪 测试指南

使用 Playwright MCP 进行页面测试：

```bash
# 启动开发服务器
npm run dev

# 使用 Playwright 查看页面
# (通过 MCP 工具调用)
```

## 🐛 调试技巧

1. **路由问题**: 检查 `router/index.jsx` 和 `guards.jsx`
2. **权限问题**: 检查 `AuthContext` 和 `useRole`
3. **样式问题**: 检查 CSS 变量定义和类名

## 📚 参考资源

- [React 19 文档](https://react.dev/)
- [React Router v7 文档](https://reactrouter.com/)
- [Vite 文档](https://vitejs.dev/)
- 项目截图参考根目录下的 `.png` 文件
