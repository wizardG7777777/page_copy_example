export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CASTER: 'caster',
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: '集团账号',
  [ROLES.MANAGER]: '主管账号',
  [ROLES.CASTER]: '投手账号',
};

export const ONBOARDING_STATUS = {
  NONE: 'none',
  PENDING_REVIEW: 'pending_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CONTRACT_SIGNED: 'contract_signed',
  COMPLETED: 'completed',
};

export const ONBOARDING_STEPS = [
  { key: 'entry', label: '信息录入', path: '/apply-entry' },
  { key: 'review', label: '审核', path: '/apply-entry/review' },
  { key: 'contract', label: '合同签署', path: '/apply-entry/contract' },
  { key: 'qualification', label: '资质授权', path: '/apply-entry/qualification' },
];

export const SIDEBAR_MENU = [
  {
    key: 'home',
    label: '工作台首页',
    icon: 'home',
    path: '/dashboard',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER],
  },
  {
    key: 'distribution',
    label: '分销中心',
    icon: 'distribution',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER],
    children: [
      { key: 'dramas', label: '短剧列表', path: '/dashboard/distribution/dramas', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER] },
      { key: 'novels', label: '网文列表', path: '/dashboard/distribution/novels', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER] },
      { key: 'promote', label: '推广链管理', path: '/dashboard/distribution/promote', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER] },
      { key: 'postback', label: '广告回传', path: '/dashboard/distribution/postback', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER] },
    ],
  },
  {
    key: 'data',
    label: '数据中心',
    icon: 'data',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER],
    children: [
      { key: 'app-stats', label: '应用统计', path: '/dashboard/data/app-stats', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER] },
      { key: 'promo-stats', label: '推广统计', path: '/dashboard/data/promo-stats', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER] },
      { key: 'order-stats', label: '订单统计', path: '/dashboard/data/order-stats', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER] },
      { key: 'user-stats', label: '用户统计', path: '/dashboard/data/user-stats', roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.CASTER] },
    ],
  },
  {
    key: 'account',
    label: '账号管理',
    icon: 'account',
    roles: [ROLES.ADMIN, ROLES.MANAGER],
    children: [
      { key: 'members', label: '成员管理', path: '/dashboard/account/members', roles: [ROLES.ADMIN, ROLES.MANAGER] },
      { key: 'authorization', label: '账号授权', path: '/dashboard/account/authorization', roles: [ROLES.ADMIN, ROLES.MANAGER] },
    ],
  },
  {
    key: 'settings',
    label: '应用设置',
    icon: 'settings',
    roles: [ROLES.ADMIN, ROLES.MANAGER],
    children: [
      { key: 'recharge-tpl', label: '充值模板', path: '/dashboard/settings/recharge-tpl', roles: [ROLES.ADMIN, ROLES.MANAGER] },
    ],
  },
  {
    key: 'settlement',
    label: '结算中心',
    icon: 'settlement',
    roles: [ROLES.ADMIN],
    children: [
      { key: 'bills', label: '账单管理', path: '/dashboard/settlement/bills', roles: [ROLES.ADMIN] },
      { key: 'withdraw', label: '提现管理', path: '/dashboard/settlement/withdraw', roles: [ROLES.ADMIN] },
    ],
  },
  {
    key: 'profile',
    label: '企业信息',
    icon: 'profile',
    path: '/dashboard/profile',
    roles: [ROLES.ADMIN],
  },
];
