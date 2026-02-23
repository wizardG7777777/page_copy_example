import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AuthGuard, OnboardingGuard, RoleGuard, GuestGuard } from './guards';

import PublicLayout from '../layouts/PublicLayout';
import OnboardingLayout from '../layouts/OnboardingLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';

import ApplyEntryPage from '../pages/Onboarding/ApplyEntryPage';
import ReviewPage from '../pages/Onboarding/ReviewPage';
import ContractPage from '../pages/Onboarding/ContractPage';
import QualificationPage from '../pages/Onboarding/QualificationPage';

import DashboardHome from '../pages/Dashboard/DashboardHome';
import DramaListPage from '../pages/Dashboard/Distribution/DramaListPage';
import NovelListPage from '../pages/Dashboard/Distribution/NovelListPage';
import PromotePage from '../pages/Dashboard/Distribution/PromotePage';
import PostbackPage from '../pages/Dashboard/Distribution/PostbackPage';
import AppStatsPage from '../pages/Dashboard/DataCenter/AppStatsPage';
import PromoStatsPage from '../pages/Dashboard/DataCenter/PromoStatsPage';
import OrderStatsPage from '../pages/Dashboard/DataCenter/OrderStatsPage';
import UserStatsPage from '../pages/Dashboard/DataCenter/UserStatsPage';
import MembersPage from '../pages/Dashboard/Account/MembersPage';
import AuthorizationPage from '../pages/Dashboard/Account/AuthorizationPage';
import RechargeTplPage from '../pages/Dashboard/Settings/RechargeTplPage';
import BillsPage from '../pages/Dashboard/Settlement/BillsPage';
import WithdrawPage from '../pages/Dashboard/Settlement/WithdrawPage';
import ProfilePage from '../pages/Dashboard/Profile/ProfilePage';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <GuestGuard><LoginPage /></GuestGuard> },
    ],
  },
  {
    element: <AuthGuard><OnboardingLayout /></AuthGuard>,
    children: [
      { path: '/apply-entry', element: <ApplyEntryPage /> },
      { path: '/apply-entry/review', element: <ReviewPage /> },
      { path: '/apply-entry/contract', element: <ContractPage /> },
      { path: '/apply-entry/qualification', element: <QualificationPage /> },
    ],
  },
  {
    element: <AuthGuard><OnboardingGuard><DashboardLayout /></OnboardingGuard></AuthGuard>,
    children: [
      { path: '/dashboard', element: <DashboardHome /> },
      { path: '/dashboard/distribution/dramas', element: <DramaListPage /> },
      { path: '/dashboard/distribution/novels', element: <NovelListPage /> },
      { path: '/dashboard/distribution/promote', element: <PromotePage /> },
      { path: '/dashboard/distribution/postback', element: <PostbackPage /> },
      { path: '/dashboard/data/app-stats', element: <AppStatsPage /> },
      { path: '/dashboard/data/promo-stats', element: <PromoStatsPage /> },
      { path: '/dashboard/data/order-stats', element: <OrderStatsPage /> },
      { path: '/dashboard/data/user-stats', element: <UserStatsPage /> },
      { path: '/dashboard/account/members', element: <RoleGuard roles={['admin', 'manager']}><MembersPage /></RoleGuard> },
      { path: '/dashboard/account/authorization', element: <RoleGuard roles={['admin', 'manager']}><AuthorizationPage /></RoleGuard> },
      { path: '/dashboard/settings/recharge-tpl', element: <RoleGuard roles={['admin', 'manager']}><RechargeTplPage /></RoleGuard> },
      { path: '/dashboard/settlement/bills', element: <RoleGuard roles={['admin']}><BillsPage /></RoleGuard> },
      { path: '/dashboard/settlement/withdraw', element: <RoleGuard roles={['admin']}><WithdrawPage /></RoleGuard> },
      { path: '/dashboard/profile', element: <RoleGuard roles={['admin']}><ProfilePage /></RoleGuard> },
    ],
  },
]);

export default router;
