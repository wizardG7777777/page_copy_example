import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardHome.css';

const STATS = [
  {
    label: '今日充值',
    value: '\u00A50',
    change: '+0%',
    changeLabel: '较昨日',
    iconClass: 'revenue',
    icon: '\uD83D\uDCB0',
  },
  {
    label: '今日新增用户',
    value: '0',
    change: '+0%',
    changeLabel: '较昨日',
    iconClass: 'users',
    icon: '\uD83D\uDC65',
  },
  {
    label: '今日订单数',
    value: '0',
    change: '+0%',
    changeLabel: '较昨日',
    iconClass: 'orders',
    icon: '\uD83D\uDCCB',
  },
  {
    label: '今日DAU',
    value: '0',
    change: '+0%',
    changeLabel: '较昨日',
    iconClass: 'dau',
    icon: '\uD83D\uDCC8',
  },
];

const QUICK_ACTIONS = [
  {
    title: '生成推广链',
    desc: '选择短剧内容，生成推广链接',
    icon: '\uD83D\uDD17',
    iconClass: 'promote',
    path: '/dashboard/distribution/dramas',
  },
  {
    title: '查看数据报表',
    desc: '查看应用数据统计与分析',
    icon: '\uD83D\uDCCA',
    iconClass: 'data',
    path: '/dashboard/data/app-stats',
  },
  {
    title: '管理充值模板',
    desc: '配置充值金额与优惠策略',
    icon: '\u2699\uFE0F',
    iconClass: 'settings',
    path: '/dashboard/settings/recharge-tpl',
  },
];

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-home">
      <div className="page-header">
        <h1 className="page-title">工作台</h1>
      </div>

      {/* Stat Cards */}
      <div className="stat-grid">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className={`stat-card-icon ${stat.iconClass}`}>
              {stat.icon}
            </div>
            <div className="stat-card-label">{stat.label}</div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-change up">
              {stat.change} {stat.changeLabel}
            </div>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="trend-section">
        <div className="trend-section-title">趋势概览</div>
        <div className="card">
          <div className="trend-chart-placeholder">
            <span className="trend-chart-label">充值趋势图</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <div className="quick-actions-title">快捷操作</div>
        <div className="quick-actions-grid">
          {QUICK_ACTIONS.map((action) => (
            <div
              key={action.title}
              className="quick-action-card"
              onClick={() => navigate(action.path)}
            >
              <div className={`quick-action-icon ${action.iconClass}`}>
                {action.icon}
              </div>
              <div className="quick-action-info">
                <div className="quick-action-title">{action.title}</div>
                <div className="quick-action-desc">{action.desc}</div>
              </div>
              <span className="quick-action-arrow">&rsaquo;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Todo Reminders */}
      <div className="todo-section">
        <div className="todo-section-title">待办提醒</div>
        <div className="todo-empty">
          <div className="todo-empty-icon">{'\u2705'}</div>
          <div className="todo-empty-text">暂无待办事项</div>
        </div>
      </div>
    </div>
  );
}
