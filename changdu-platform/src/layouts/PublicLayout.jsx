import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './PublicLayout.css';

export default function PublicLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="public-layout">
      <header className="pub-header">
        <div className="pub-header-container">
          <Link to="/" className="pub-logo">
            <strong>常读分销平台</strong>
          </Link>
          <div className="pub-header-right">
            {isAuthenticated ? (
              <>
                <span className="pub-nav-link" onClick={() => navigate('/dashboard')}>工作台</span>
                <span className="pub-nav-link" onClick={logout}>退出</span>
              </>
            ) : (
              <span className="pub-login-btn" onClick={() => navigate('/login')}>
                登录 / 注册
              </span>
            )}
            <div className="pub-entry-btn" onClick={() => navigate(isAuthenticated ? '/apply-entry' : '/login')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" fill="none" viewBox="0 0 11 15">
                <path stroke="#fff" strokeWidth="1.5" d="M4.182 14.293s.957-2.258 1.909-3.5c1.177-1.536 3.178-2.778 3.725-3.32a.25.25 0 0 0 0-.36c-.547-.542-2.548-1.784-3.725-3.32-.952-1.243-1.91-3.5-1.91-3.5m5.819 7H0" />
              </svg>
              <span>立即入驻</span>
            </div>
          </div>
        </div>
      </header>
      <main className="pub-main">
        <Outlet />
      </main>
      <footer className="pub-footer">
        <p>&copy; 2026 常读分销平台 · 版权所有</p>
      </footer>
    </div>
  );
}
