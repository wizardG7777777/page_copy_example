import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './LoginPage.css';

const TEST_ACCOUNTS = [
  { label: '集团账号', phone: '13800000001', password: 'test123456' },
  { label: '主管账号', phone: '13800000002', password: 'test123456' },
  { label: '投手账号', phone: '13800000003', password: 'test123456' },
  { label: '新用户（体验入驻流程）', phone: '13800000004', password: 'test123456' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [activeTab, setActiveTab] = useState('login');

  // Login state
  const [loginId, setLoginId] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regPhone, setRegPhone] = useState('');
  const [regName, setRegName] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Navigate based on onboarding status
  const navigateByStatus = (status) => {
    switch (status) {
      case 'completed':
        navigate('/dashboard', { replace: true });
        break;
      case 'pending_review':
        navigate('/apply-entry/review', { replace: true });
        break;
      case 'approved':
        navigate('/apply-entry/contract', { replace: true });
        break;
      case 'contract_signed':
        navigate('/apply-entry/qualification', { replace: true });
        break;
      case 'none':
      default:
        navigate('/apply-entry', { replace: true });
        break;
    }
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginId.trim()) {
      setLoginError('请输入手机号或邮箱');
      return;
    }
    if (!loginPwd.trim()) {
      setLoginError('请输入密码');
      return;
    }

    setLoginLoading(true);
    // Simulate async delay for UX
    setTimeout(() => {
      const result = auth.login(loginId.trim(), loginPwd);
      setLoginLoading(false);
      if (result.success) {
        navigateByStatus(result.onboardingStatus);
      } else {
        setLoginError(result.error || '登录失败，请检查账号和密码');
      }
    }, 300);
  };

  // Quick login with test account
  const handleQuickLogin = (account) => {
    setLoginId(account.phone);
    setLoginPwd(account.password);
    setLoginError('');
  };

  // Register handler
  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regPhone.trim()) {
      setRegError('请输入手机号');
      return;
    }
    if (!regName.trim()) {
      setRegError('请输入姓名');
      return;
    }

    setRegLoading(true);
    setTimeout(() => {
      auth.register(regPhone.trim(), regName.trim());
      setRegLoading(false);
      navigate('/apply-entry', { replace: true });
    }, 300);
  };

  // Switch tabs
  const switchTab = (tab) => {
    setActiveTab(tab);
    setLoginError('');
    setRegError('');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Test account hint */}
        <div className="test-hint">
          <div className="test-hint-header">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 110 2 1 1 0 010-2zm1 8H7V7h2v5z" fill="currentColor"/>
            </svg>
            <span>测试账号（直接登录体验完整功能）</span>
          </div>
          <div className="test-hint-accounts">
            {TEST_ACCOUNTS.map((acc) => (
              <div key={acc.phone} className="test-hint-row" onClick={() => handleQuickLogin(acc)}>
                <span className="test-hint-label">{acc.label}:</span>
                <span className="test-hint-value">{acc.phone} / {acc.password}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <div
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => switchTab('login')}
          >
            登录
          </div>
          <div
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => switchTab('register')}
          >
            注册
          </div>
        </div>

        {/* Login form */}
        {activeTab === 'login' && (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">手机号 / 邮箱</label>
              <input
                className="form-input"
                type="text"
                placeholder="请输入手机号或邮箱"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="form-group">
              <label className="form-label">密码</label>
              <input
                className="form-input"
                type="password"
                placeholder="请输入密码"
                value={loginPwd}
                onChange={(e) => setLoginPwd(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            {loginError && <div className="auth-error">{loginError}</div>}
            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loginLoading}
            >
              {loginLoading ? '登录中...' : '登录'}
            </button>
          </form>
        )}

        {/* Register form */}
        {activeTab === 'register' && (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">手机号</label>
              <input
                className="form-input"
                type="tel"
                placeholder="请输入手机号"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
            <div className="form-group">
              <label className="form-label">姓名</label>
              <input
                className="form-input"
                type="text"
                placeholder="请输入姓名"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                autoComplete="name"
              />
            </div>
            {regError && <div className="auth-error">{regError}</div>}
            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={regLoading}
            >
              {regLoading ? '注册中...' : '注册'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
