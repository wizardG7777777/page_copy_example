import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './ReviewPage.css';

export default function ReviewPage() {
  const navigate = useNavigate();
  const { onboardingStatus, updateOnboardingStatus } = useAuth();

  const handleSimulateApprove = () => {
    updateOnboardingStatus('approved');
  };

  const handleSimulateReject = () => {
    updateOnboardingStatus('rejected');
  };

  const renderPending = () => (
    <>
      <div className="review-icon pending">
        {/* Clock icon */}
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <h2 className="review-title">申请审核中</h2>
      <p className="review-message">您的入驻申请正在审核中，请耐心等待</p>
      <p className="review-estimate">预计1-3个工作日</p>

      <div className="review-debug">
        <p className="review-debug-label">调试操作（仅开发环境可见）</p>
        <div className="review-debug-actions">
          <button
            className="review-debug-btn pass"
            type="button"
            onClick={handleSimulateApprove}
          >
            模拟通过
          </button>
          <button
            className="review-debug-btn reject"
            type="button"
            onClick={handleSimulateReject}
          >
            模拟驳回
          </button>
        </div>
      </div>
    </>
  );

  const renderApproved = () => (
    <>
      <div className="review-icon approved">
        {/* Check icon */}
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h2 className="review-title">恭喜，您的审核已通过！</h2>
      <p className="review-message">请继续完成合同签署流程</p>
      <div className="review-actions">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate('/apply-entry/contract')}
        >
          继续完成签约
        </button>
      </div>
    </>
  );

  const renderRejected = () => (
    <>
      <div className="review-icon rejected">
        {/* X icon */}
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h2 className="review-title">很抱歉，您的申请未通过</h2>
      <div className="review-reason">
        <p className="review-reason-label">驳回原因</p>
        <p className="review-reason-text">团队规模信息不完整，请补充后重新提交</p>
      </div>
      <div className="review-actions">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => navigate('/apply-entry')}
        >
          返回修改
        </button>
      </div>
    </>
  );

  const renderContent = () => {
    switch (onboardingStatus) {
      case 'approved':
        return renderApproved();
      case 'rejected':
        return renderRejected();
      case 'pending_review':
      default:
        return renderPending();
    }
  };

  return (
    <div className="review-page">
      <div className="review-card">
        {renderContent()}
      </div>
    </div>
  );
}
