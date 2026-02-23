import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ONBOARDING_STATUS } from '../utils/constants';

export function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export function OnboardingGuard({ children }) {
  const { onboardingStatus } = useAuth();

  if (onboardingStatus !== ONBOARDING_STATUS.COMPLETED) {
    switch (onboardingStatus) {
      case ONBOARDING_STATUS.NONE:
        return <Navigate to="/apply-entry" replace />;
      case ONBOARDING_STATUS.PENDING_REVIEW:
        return <Navigate to="/apply-entry/review" replace />;
      case ONBOARDING_STATUS.APPROVED:
        return <Navigate to="/apply-entry/contract" replace />;
      case ONBOARDING_STATUS.CONTRACT_SIGNED:
        return <Navigate to="/apply-entry/qualification" replace />;
      default:
        return <Navigate to="/apply-entry" replace />;
    }
  }
  return children;
}

export function RoleGuard({ roles, children }) {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export function GuestGuard({ children }) {
  const { isAuthenticated, onboardingStatus } = useAuth();

  if (isAuthenticated) {
    if (onboardingStatus === ONBOARDING_STATUS.COMPLETED) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/apply-entry" replace />;
  }
  return children;
}
