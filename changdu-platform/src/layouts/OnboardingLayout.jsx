import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import CustomerService from '../components/business/CustomerService';
import { ONBOARDING_STEPS } from '../utils/constants';
import './OnboardingLayout.css';

function getStepIndex(pathname) {
  const idx = ONBOARDING_STEPS.findIndex((s) => s.path === pathname);
  return idx >= 0 ? idx : 0;
}

export default function OnboardingLayout() {
  const { logout } = useAuth();
  const location = useLocation();
  const currentStep = getStepIndex(location.pathname);

  return (
    <div className="onboarding-layout">
      <header className="ob-header">
        <div className="ob-header-container">
          <Link to="/" className="ob-logo">
            <strong>常读分销平台</strong>
          </Link>
          <span className="ob-logout" onClick={logout}>退出登录</span>
        </div>
      </header>

      <div className="ob-steps">
        <div className="ob-steps-container">
          {ONBOARDING_STEPS.map((step, i) => (
            <div key={step.key} className={`ob-step ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}`}>
              <div className="ob-step-number">{i < currentStep ? '✓' : i + 1}</div>
              <span className="ob-step-label">{step.label}</span>
              {i < ONBOARDING_STEPS.length - 1 && <div className="ob-step-line" />}
            </div>
          ))}
        </div>
      </div>

      <main className="ob-main">
        <Outlet />
      </main>

      <CustomerService />
    </div>
  );
}
