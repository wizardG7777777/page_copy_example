import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './ContractPage.css';

const CONTRACT_STEPS = [
  { key: 'subject', label: '添加签约主体' },
  { key: 'sign', label: '签署合同' },
];

export default function ContractPage() {
  const navigate = useNavigate();
  const { updateOnboardingStatus } = useAuth();
  const [step, setStep] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    creditCode: '',
    signerName: '',
    signerIdCard: '',
    signerPhone: '',
  });
  const [contractNumber] = useState(() => `CD-2026-${String(Date.now()).slice(-6)}`);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleNext = useCallback(() => {
    setStep(1);
  }, []);

  const handlePrev = useCallback(() => {
    setStep(0);
  }, []);

  const handleConfirmSign = useCallback(() => {
    updateOnboardingStatus('contract_signed');
    navigate('/apply-entry/qualification');
  }, [updateOnboardingStatus, navigate]);

  const renderStepIndicator = () => (
    <div className="contract-step-indicator">
      {CONTRACT_STEPS.map((s, i) => {
        const isCompleted = i < step;
        const isActive = i === step;
        return (
          <React.Fragment key={s.key}>
            {i > 0 && (
              <div className={`contract-step-connector${isCompleted || isActive ? ' done' : ''}`} />
            )}
            <div
              className={`contract-step-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
            >
              <div className="contract-step-dot">
                {isCompleted ? '\u2713' : i + 1}
              </div>
              <span className="contract-step-label">{s.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <>
      <h3 className="contract-form-title">添加签约主体</h3>
      <p className="contract-form-desc">请填写签约主体的相关信息，确保信息真实准确</p>

      <div className="form-group">
        <label className="form-label">
          统一社会信用代码<span className="required">*</span>
        </label>
        <input
          className="form-input"
          type="text"
          placeholder="请输入统一社会信用代码"
          value={formData.creditCode}
          onChange={(e) => updateField('creditCode', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          签约人姓名<span className="required">*</span>
        </label>
        <input
          className="form-input"
          type="text"
          placeholder="请输入签约人姓名"
          value={formData.signerName}
          onChange={(e) => updateField('signerName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          签约人身份证号<span className="required">*</span>
        </label>
        <input
          className="form-input"
          type="text"
          placeholder="请输入签约人身份证号"
          maxLength={18}
          value={formData.signerIdCard}
          onChange={(e) => updateField('signerIdCard', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          签约人手机号<span className="required">*</span>
        </label>
        <input
          className="form-input"
          type="tel"
          placeholder="请输入签约人手机号"
          maxLength={11}
          value={formData.signerPhone}
          onChange={(e) => updateField('signerPhone', e.target.value)}
        />
      </div>

      <div className="contract-footer">
        <div />
        <button className="btn btn-primary" type="button" onClick={handleNext}>
          下一步
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h3 className="contract-form-title">签署合同</h3>
      <p className="contract-form-desc">请仔细阅读合同内容，确认无误后完成签署</p>

      <div className="contract-preview">
        <div className="contract-preview-header">
          <h3 className="contract-preview-title">常读分销平台合作协议</h3>
          <p className="contract-preview-subtitle">合同编号：{contractNumber}</p>
        </div>

        <div className="contract-preview-body">
          <h4>第一条 合作内容</h4>
          <p>
            甲方（常读平台）授权乙方在约定范围内进行内容分销推广，包括但不限于付费短剧、付费网文等数字内容产品的推广与分销。
          </p>

          <h4>第二条 合作期限</h4>
          <p>
            本协议自双方签署之日起生效，有效期为一年。期满前三十日内，如双方均无书面异议，本协议自动续期一年，以此类推。
          </p>

          <h4>第三条 权利与义务</h4>
          <p>
            乙方应按照甲方平台规则进行内容推广，不得采取任何违规手段获取流量或收益。甲方有权对乙方的推广行为进行监督和管理。
          </p>

          <h4>第四条 结算方式</h4>
          <p>
            甲方按照约定的分成比例，以月为结算周期，在次月15个工作日内完成上月费用结算。具体分成比例以双方另行签署的补充协议为准。
          </p>

          <h4>第五条 保密条款</h4>
          <p>
            双方应对本协议内容及合作过程中获悉的对方商业秘密予以保密，未经对方书面同意，不得向第三方披露。
          </p>

          <div className="contract-preview-signature">
            <div className="contract-preview-sign-block">
              <p className="contract-preview-sign-label">甲方（盖章）</p>
              <div className="contract-preview-sign-line" />
              <p className="contract-preview-sign-date">日期：____年____月____日</p>
            </div>
            <div className="contract-preview-sign-block">
              <p className="contract-preview-sign-label">乙方（盖章）</p>
              <div className="contract-preview-sign-line" />
              <p className="contract-preview-sign-date">日期：____年____月____日</p>
            </div>
          </div>
        </div>
      </div>

      <label className="contract-agree">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <span>
          我已仔细阅读并同意
          <span className="contract-agree-link">《常读分销平台合作协议》</span>
        </span>
      </label>

      <div className="contract-footer">
        <button className="btn btn-outline" type="button" onClick={handlePrev}>
          上一步
        </button>
        <button
          className="btn btn-primary"
          type="button"
          disabled={!agreed}
          onClick={handleConfirmSign}
        >
          确认签署
        </button>
      </div>
    </>
  );

  return (
    <div className="contract-page">
      <div className="contract-card">
        {renderStepIndicator()}
        {step === 0 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
}
