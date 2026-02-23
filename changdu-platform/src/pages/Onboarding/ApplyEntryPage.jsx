import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './ApplyEntryPage.css';

const SUB_STEPS = [
  { key: 'basic', label: '集团基本信息' },
  { key: 'team', label: '团队规模' },
  { key: 'business', label: '主营业务' },
  { key: 'experience', label: '分销经验' },
  { key: 'intention', label: '意向业务' },
  { key: 'contact', label: '联系方式' },
];

const INITIAL_FORM = {
  // Step 1
  groupName: '',
  groupDesc: '',
  // Step 2
  teamSize: '',
  teamDesc: '',
  // Step 3
  businessTypes: [],
  monthlyRevenue: '',
  // Step 4
  hasDistribution: '',
  platforms: [],
  adChannels: [],
  adExpertise: [],
  // Step 5
  contentTypes: [],
  cooperationPlatforms: [],
  // Step 6
  phone: '',
  verifyCode: '',
  contactName: '',
  email: '',
};

export default function ApplyEntryPage() {
  const navigate = useNavigate();
  const { updateOnboardingStatus } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for verification code
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleArrayItem = useCallback((field, item) => {
    setFormData((prev) => {
      const arr = prev[field];
      const next = arr.includes(item)
        ? arr.filter((v) => v !== item)
        : [...arr, item];
      return { ...prev, [field]: next };
    });
  }, []);

  const handleSendCode = useCallback(() => {
    if (countdown > 0) return;
    setCountdown(60);
  }, [countdown]);

  const handlePrev = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((s) => Math.min(SUB_STEPS.length - 1, s + 1));
  }, []);

  const handleSubmit = useCallback(() => {
    updateOnboardingStatus('pending_review');
    navigate('/apply-entry/review');
  }, [updateOnboardingStatus, navigate]);

  const isLastStep = currentStep === SUB_STEPS.length - 1;

  // Render the sub-step indicator
  const renderStepsBar = () => (
    <div className="apply-steps-bar">
      {SUB_STEPS.map((step, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        return (
          <React.Fragment key={step.key}>
            {i > 0 && (
              <div className={`apply-step-connector${i <= currentStep ? ' done' : ''}`} />
            )}
            <div
              className={`apply-step-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
            >
              <div className="apply-step-dot">
                {isCompleted ? '\u2713' : i + 1}
              </div>
              <span className="apply-step-title">{step.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );

  // Step renderers
  const renderStep1 = () => (
    <>
      <h3 className="apply-form-title">集团基本信息</h3>
      <p className="apply-form-desc">请填写您所在集团/公司的基本信息</p>

      <div className="form-group">
        <label className="form-label">
          集团名称<span className="required">*</span>
        </label>
        <input
          className="form-input"
          type="text"
          placeholder="请输入集团/公司名称"
          value={formData.groupName}
          onChange={(e) => updateField('groupName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          集团简介<span className="required">*</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="请简要介绍您的集团/公司"
          value={formData.groupDesc}
          onChange={(e) => updateField('groupDesc', e.target.value)}
        />
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h3 className="apply-form-title">团队规模</h3>
      <p className="apply-form-desc">请描述您的团队情况</p>

      <div className="form-group">
        <label className="form-label">
          团队人数<span className="required">*</span>
        </label>
        <select
          className="form-select"
          value={formData.teamSize}
          onChange={(e) => updateField('teamSize', e.target.value)}
        >
          <option value="">请选择团队人数</option>
          <option value="1-10">1-10人</option>
          <option value="11-50">11-50人</option>
          <option value="51-200">51-200人</option>
          <option value="200+">200人以上</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          团队描述<span className="required">*</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="请描述投手/编辑人数、团队成熟度"
          value={formData.teamDesc}
          onChange={(e) => updateField('teamDesc', e.target.value)}
        />
      </div>
    </>
  );

  const renderStep3 = () => {
    const businessOptions = ['网文分销', '短剧分销', '其他'];
    return (
      <>
        <h3 className="apply-form-title">主营业务</h3>
        <p className="apply-form-desc">请选择您团队的主营业务类型</p>

        <div className="form-group">
          <label className="form-label">
            业务类型<span className="required">*</span>
          </label>
          <div className="apply-checkbox-group">
            {businessOptions.map((opt) => (
              <label
                key={opt}
                className={`apply-checkbox-label${formData.businessTypes.includes(opt) ? ' checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={formData.businessTypes.includes(opt)}
                  onChange={() => toggleArrayItem('businessTypes', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            大盘月收入<span className="required">*</span>
          </label>
          <select
            className="form-select"
            value={formData.monthlyRevenue}
            onChange={(e) => updateField('monthlyRevenue', e.target.value)}
          >
            <option value="">请选择月收入范围</option>
            <option value="<10w">10万以下</option>
            <option value="10-50w">10-50万</option>
            <option value="50-200w">50-200万</option>
            <option value=">200w">200万以上</option>
          </select>
        </div>
      </>
    );
  };

  const renderStep4 = () => {
    const platformOptions = ['番茄', '七猫', '疯读', '常读', '其他'];
    const adChannelOptions = ['巨量引擎', '腾讯广告', '百度推广', '快手磁力', '其他'];
    const expertiseOptions = ['短剧', '网文', '其他'];

    return (
      <>
        <h3 className="apply-form-title">分销经验</h3>
        <p className="apply-form-desc">请填写您的分销从业经验</p>

        <div className="form-group">
          <label className="form-label">
            是否从事过分销<span className="required">*</span>
          </label>
          <div className="apply-radio-group">
            <label className="apply-radio-label">
              <input
                type="radio"
                name="hasDistribution"
                value="是"
                checked={formData.hasDistribution === '是'}
                onChange={(e) => updateField('hasDistribution', e.target.value)}
              />
              是
            </label>
            <label className="apply-radio-label">
              <input
                type="radio"
                name="hasDistribution"
                value="否"
                checked={formData.hasDistribution === '否'}
                onChange={(e) => updateField('hasDistribution', e.target.value)}
              />
              否
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            主对接平台<span className="required">*</span>
          </label>
          <div className="apply-checkbox-group">
            {platformOptions.map((opt) => (
              <label
                key={opt}
                className={`apply-checkbox-label${formData.platforms.includes(opt) ? ' checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={formData.platforms.includes(opt)}
                  onChange={() => toggleArrayItem('platforms', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            广告渠道<span className="required">*</span>
          </label>
          <div className="apply-checkbox-group">
            {adChannelOptions.map((opt) => (
              <label
                key={opt}
                className={`apply-checkbox-label${formData.adChannels.includes(opt) ? ' checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={formData.adChannels.includes(opt)}
                  onChange={() => toggleArrayItem('adChannels', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            擅投类型<span className="required">*</span>
          </label>
          <div className="apply-checkbox-group">
            {expertiseOptions.map((opt) => (
              <label
                key={opt}
                className={`apply-checkbox-label${formData.adExpertise.includes(opt) ? ' checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={formData.adExpertise.includes(opt)}
                  onChange={() => toggleArrayItem('adExpertise', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderStep5 = () => {
    const contentOptions = ['付费短剧', '付费网文'];
    const coopOptions = ['常读快应用', '常读H5', '常读微信小程序', '常读抖音小程序'];

    return (
      <>
        <h3 className="apply-form-title">意向业务</h3>
        <p className="apply-form-desc">请选择您期望合作的业务类型和平台</p>

        <div className="form-group">
          <label className="form-label">
            意向内容类型<span className="required">*</span>
          </label>
          <div className="apply-checkbox-group">
            {contentOptions.map((opt) => (
              <label
                key={opt}
                className={`apply-checkbox-label${formData.contentTypes.includes(opt) ? ' checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={formData.contentTypes.includes(opt)}
                  onChange={() => toggleArrayItem('contentTypes', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            意向合作平台<span className="required">*</span>
          </label>
          <div className="apply-checkbox-group">
            {coopOptions.map((opt) => (
              <label
                key={opt}
                className={`apply-checkbox-label${formData.cooperationPlatforms.includes(opt) ? ' checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={formData.cooperationPlatforms.includes(opt)}
                  onChange={() => toggleArrayItem('cooperationPlatforms', opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderStep6 = () => (
    <>
      <h3 className="apply-form-title">联系方式</h3>
      <p className="apply-form-desc">请填写您的联系信息，以便我们与您取得联系</p>

      <div className="form-group">
        <label className="form-label">
          手机号<span className="required">*</span>
        </label>
        <input
          className="form-input"
          type="tel"
          placeholder="请输入手机号"
          maxLength={11}
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          验证码<span className="required">*</span>
        </label>
        <div className="verify-code-row">
          <input
            className="form-input"
            type="text"
            placeholder="请输入验证码"
            maxLength={6}
            value={formData.verifyCode}
            onChange={(e) => updateField('verifyCode', e.target.value)}
          />
          <button
            type="button"
            className="verify-code-btn"
            disabled={countdown > 0}
            onClick={handleSendCode}
          >
            {countdown > 0 ? `${countdown}s 后重新获取` : '获取验证码'}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          联系人姓名<span className="required">*</span>
        </label>
        <input
          className="form-input"
          type="text"
          placeholder="请输入联系人姓名"
          value={formData.contactName}
          onChange={(e) => updateField('contactName', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">邮箱</label>
        <input
          className="form-input"
          type="email"
          placeholder="请输入邮箱地址"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
        />
        <p className="email-hint">格式示例：example@company.com</p>
      </div>
    </>
  );

  const stepRenderers = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6];

  return (
    <div className="apply-entry">
      {renderStepsBar()}

      <div className="apply-form-card">
        {stepRenderers[currentStep]()}

        <div className="apply-form-footer">
          <div>
            {currentStep > 0 && (
              <button className="btn btn-outline" type="button" onClick={handlePrev}>
                上一步
              </button>
            )}
          </div>
          <div className="apply-form-footer-right">
            {isLastStep ? (
              <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                提交申请
              </button>
            ) : (
              <button className="btn btn-primary" type="button" onClick={handleNext}>
                下一步
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
