import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRole } from '../hooks/useRole';
import { SIDEBAR_MENU } from '../utils/constants';
import './DashboardLayout.css';

const ICONS = {
  home: '🏠',
  distribution: '📦',
  data: '📊',
  account: '👥',
  settings: '⚙️',
  settlement: '💰',
  profile: '🏢',
  collapse: '☰',
};

function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasRole } = useRole();
  const [expanded, setExpanded] = useState({});

  const toggleGroup = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => location.pathname === path;
  const isGroupActive = (item) =>
    item.children?.some((c) => location.pathname.startsWith(c.path));

  const visibleMenu = SIDEBAR_MENU.filter((item) => hasRole(item.roles));

  return (
    <aside className={`dash-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={onToggle}>
        <span>{ICONS.collapse}</span>
      </div>
      <nav className="sidebar-nav">
        {visibleMenu.map((item) => {
          if (item.children) {
            const visibleChildren = item.children.filter((c) => hasRole(c.roles));
            if (visibleChildren.length === 0) return null;
            const isOpen = expanded[item.key] ?? isGroupActive(item);
            return (
              <div key={item.key} className="sidebar-group">
                <div
                  className={`sidebar-item group-header ${isGroupActive(item) ? 'active-group' : ''}`}
                  onClick={() => toggleGroup(item.key)}
                >
                  <span className="sidebar-icon">{ICONS[item.icon]}</span>
                  {!collapsed && (
                    <>
                      <span className="sidebar-label">{item.label}</span>
                      <span className={`sidebar-arrow ${isOpen ? 'open' : ''}`}>›</span>
                    </>
                  )}
                </div>
                {!collapsed && isOpen && (
                  <div className="sidebar-children">
                    {visibleChildren.map((child) => (
                      <div
                        key={child.key}
                        className={`sidebar-item child ${isActive(child.path) ? 'active' : ''}`}
                        onClick={() => navigate(child.path)}
                      >
                        <span className="sidebar-label">{child.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <div
              key={item.key}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-icon">{ICONS[item.icon]}</span>
              {!collapsed && <span className="sidebar-label">{item.label}</span>}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function TopNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="dash-topnav">
      <div className="topnav-left">
        <Link to="/dashboard" className="topnav-logo">
          <strong>常读分销平台</strong>
        </Link>
      </div>
      <div className="topnav-right">
        <div className="topnav-user" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="topnav-avatar">{user?.name?.[0] || '用'}</div>
          <span className="topnav-username">{user?.name}</span>
          <span className="topnav-role">{user?.roleLabel}</span>
          {showDropdown && (
            <div className="topnav-dropdown">
              {user?.role === 'admin' && (
                <div className="dropdown-item" onClick={() => { navigate('/dashboard/profile'); setShowDropdown(false); }}>企业信息</div>
              )}
              <div className="dropdown-item" onClick={() => { logout(); navigate('/'); }}>退出登录</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="dashboard-layout">
      <TopNav />
      <div className="dash-body">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`dash-main ${sidebarCollapsed ? 'expanded' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
