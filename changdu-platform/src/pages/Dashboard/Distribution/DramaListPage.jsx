import React, { useState, useMemo } from 'react';
import './Distribution.css';

const CATEGORIES = ['全部', '都市', '甜宠', '悬疑', '古装'];
const SORT_OPTIONS = [
  { value: 'heat', label: '热度' },
  { value: 'commission', label: '分佣比例' },
  { value: 'updated', label: '更新时间' },
];

const POSTBACK_RULES = [
  { value: 'rule-1', label: '巨量引擎-首充回传' },
  { value: 'rule-2', label: '腾讯广告-付费回传' },
  { value: 'rule-3', label: '百度推广-激活回传' },
];

const RECHARGE_TEMPLATES = [
  { value: 'tpl-1', label: '默认充值模板' },
  { value: 'tpl-2', label: '新用户优惠模板' },
  { value: 'tpl-3', label: '活动充值模板' },
];

const DRAMAS = [
  { id: 'd1', name: '霸道总裁爱上我', episodes: 24, commission: 70, heat: 9856, category: '都市', gradient: 1 },
  { id: 'd2', name: '重生之都市修仙', episodes: 36, commission: 65, heat: 8723, category: '都市', gradient: 2 },
  { id: 'd3', name: '闪婚甜妻', episodes: 20, commission: 72, heat: 9234, category: '甜宠', gradient: 3 },
  { id: 'd4', name: '龙王医婿', episodes: 30, commission: 68, heat: 7891, category: '都市', gradient: 4 },
  { id: 'd5', name: '战神归来', episodes: 28, commission: 75, heat: 8456, category: '古装', gradient: 5 },
  { id: 'd6', name: '千金难逃', episodes: 22, commission: 70, heat: 7234, category: '悬疑', gradient: 6 },
  { id: 'd7', name: '豪门替嫁新娘', episodes: 26, commission: 66, heat: 8102, category: '甜宠', gradient: 7 },
  { id: 'd8', name: '绝世神医', episodes: 32, commission: 71, heat: 9012, category: '古装', gradient: 8 },
];

function formatHeat(heat) {
  if (heat >= 10000) return (heat / 10000).toFixed(1) + 'w';
  if (heat >= 1000) return (heat / 1000).toFixed(1) + 'k';
  return String(heat);
}

export default function DramaListPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('全部');
  const [sort, setSort] = useState('heat');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState(null);
  const [postbackRule, setPostbackRule] = useState('');
  const [rechargeTpl, setRechargeTpl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const filteredDramas = useMemo(() => {
    let list = [...DRAMAS];

    if (search.trim()) {
      list = list.filter((d) =>
        d.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (category !== '全部') {
      list = list.filter((d) => d.category === category);
    }

    if (sort === 'heat') {
      list.sort((a, b) => b.heat - a.heat);
    } else if (sort === 'commission') {
      list.sort((a, b) => b.commission - a.commission);
    }

    return list;
  }, [search, category, sort]);

  const openModal = (drama) => {
    setSelectedDrama(drama);
    setPostbackRule('');
    setRechargeTpl('');
    setGeneratedLink('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDrama(null);
    setGeneratedLink('');
  };

  const handleGenerate = () => {
    if (!postbackRule || !rechargeTpl) return;
    const pid = 'PID-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedLink(`https://changdu.com/promo/${pid}`);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard && generatedLink) {
      navigator.clipboard.writeText(generatedLink).then(() => {
        alert('链接已复制到剪贴板');
      }).catch(() => {
        alert('复制成功: ' + generatedLink);
      });
    } else {
      alert('复制成功: ' + generatedLink);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">短剧列表</h1>
        <p className="page-subtitle">浏览平台短剧内容，生成推广链接进行分发</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          className="form-input"
          placeholder="搜索短剧名称"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="form-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Drama Cards Grid */}
      {filteredDramas.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">{'\uD83C\uDFAC'}</div>
            <div className="empty-state-text">暂无短剧数据</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              短剧内容由平台方上架，此处为演示页面
            </p>
          </div>
        </div>
      ) : (
        <div className="distribution-grid">
          {filteredDramas.map((drama) => (
            <div key={drama.id} className="content-card">
              <div className={`content-card-cover cover-gradient-${drama.gradient}`}>
                <span className="cover-title">{drama.name.substring(0, 2)}</span>
                <div className="heat-badge">
                  {formatHeat(drama.heat)}
                </div>
              </div>
              <div className="content-card-body">
                <div className="content-card-title">{drama.name}</div>
                <div className="content-card-meta">
                  <span>共{drama.episodes}集</span>
                  <span>{drama.category}</span>
                </div>
                <div className="content-card-footer">
                  <span className="commission-tag">分佣 {drama.commission}%</span>
                </div>
              </div>
              <div className="content-card-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openModal(drama)}
                >
                  生成推广链
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generate Promo Link Modal */}
      {modalOpen && selectedDrama && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">生成推广链 - {selectedDrama.name}</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">关联内容</label>
                <input
                  type="text"
                  className="form-input"
                  value={selectedDrama.name}
                  disabled
                />
              </div>
              <div className="form-group">
                <label className="form-label">回传规则</label>
                <select
                  className="form-select"
                  value={postbackRule}
                  onChange={(e) => setPostbackRule(e.target.value)}
                >
                  <option value="">请选择回传规则</option>
                  {POSTBACK_RULES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">充值模板</label>
                <select
                  className="form-select"
                  value={rechargeTpl}
                  onChange={(e) => setRechargeTpl(e.target.value)}
                >
                  <option value="">请选择充值模板</option>
                  {RECHARGE_TEMPLATES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {generatedLink && (
                <div className="promo-result">
                  <div className="promo-result-label">推广链接已生成</div>
                  <div className="promo-result-link">
                    <input type="text" value={generatedLink} readOnly />
                    <button className="btn btn-primary btn-sm" onClick={handleCopyLink}>
                      复制链接
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>取消</button>
              {!generatedLink ? (
                <button
                  className="btn btn-primary"
                  onClick={handleGenerate}
                  disabled={!postbackRule || !rechargeTpl}
                >
                  生成
                </button>
              ) : (
                <button className="btn btn-primary" onClick={closeModal}>
                  完成
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
