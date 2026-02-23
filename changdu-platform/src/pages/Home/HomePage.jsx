import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './HomePage.css';

const FEATURES = [
  {
    icon: '📚',
    title: '海量内容',
    desc: '覆盖网文、短剧等多种优质内容资源，持续更新，满足不同用户偏好与投放需求。',
  },
  {
    icon: '💰',
    title: '高额分佣',
    desc: '行业领先的分佣比例，多种结算模式灵活选择，收益透明实时到账。',
  },
  {
    icon: '🚀',
    title: '多平台投放',
    desc: '一键生成APP、抖音小程序、微信小程序、快应用、H5网页等多平台推广链接。',
  },
  {
    icon: '📊',
    title: '数据透明',
    desc: '实时数据看板，订单、用户、收益全链路追踪，助力精细化运营决策。',
  },
];

const STEPS = [
  {
    number: '01',
    title: '注册入驻',
    desc: '填写企业信息，提交资质审核，快速完成入驻签约。',
  },
  {
    number: '02',
    title: '选择内容',
    desc: '浏览海量短剧与网文内容库，挑选适合投放的优质作品。',
  },
  {
    number: '03',
    title: '开始推广',
    desc: '生成多平台推广链接，投放广告，实时查看数据与收益。',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate('/apply-entry');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            打造优质网文短剧
            <br />
            开拓分销商业新局
          </h1>
          <p className="hero-subtitle">
            多平台全覆盖 —— APP、抖音小程序、微信小程序、快应用、H5网页，
            <br />
            一站式内容分销解决方案，助力合作伙伴高效变现。
          </p>
          <button className="hero-cta" onClick={handleCTA}>
            立即入驻
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="hero-decoration">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
      </section>

      {/* Platform Tags */}
      <section className="platform-section">
        <div className="platform-tags">
          {['APP', '抖音小程序', '微信小程序', '快应用', 'H5网页'].map((tag) => (
            <span key={tag} className="platform-tag">{tag}</span>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">为什么选择我们</h2>
          <p className="section-desc">全方位赋能分销伙伴，让内容变现更简单、更高效</p>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="steps-section">
        <div className="section-container">
          <h2 className="section-title">三步开启分销之旅</h2>
          <p className="section-desc">简单高效的入驻流程，快速开启内容分销业务</p>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.number} className="step-card">
                <div className="step-number">{s.number}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="step-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="steps-cta">
            <button className="hero-cta" onClick={handleCTA}>
              立即入驻
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
