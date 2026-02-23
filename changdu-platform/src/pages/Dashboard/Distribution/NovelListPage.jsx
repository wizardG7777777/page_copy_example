import React, { useState, useMemo } from 'react';
import './Distribution.css';

const CATEGORIES = ['全部', '都市', '言情', '玄幻', '悬疑', '历史'];
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

const NOVELS = [
  { id: 'n1', name: '都市至尊神婿', chapters: 386, words: '128万字', commission: 65, heat: 9521, category: '都市', gradient: 1 },
  { id: 'n2', name: '逆天邪神', chapters: 1820, words: '580万字', commission: 60, heat: 12340, category: '玄幻', gradient: 2 },
  { id: 'n3', name: '万古第一神', chapters: 2456, words: '720万字', commission: 62, heat: 10892, category: '玄幻', gradient: 3 },
  { id: 'n4', name: '顶级赘婿', chapters: 512, words: '168万字', commission: 68, heat: 8765, category: '都市', gradient: 4 },
  { id: 'n5', name: '绝世武魂', chapters: 1280, words: '420万字', commission: 63, heat: 9123, category: '玄幻', gradient: 5 },
  { id: 'n6', name: '超级女婿', chapters: 890, words: '296万字', commission: 66, heat: 7856, category: '都市', gradient: 6 },
  { id: 'n7', name: '医妃惊华', chapters: 645, words: '215万字', commission: 64, heat: 8432, category: '言情', gradient: 7 },
  { id: 'n8', name: '凤逆天下', chapters: 780, words: '260万字', commission: 67, heat: 9087, category: '历史', gradient: 8 },
];

function formatHeat(heat) {
  if (heat >= 10000) return (heat / 10000).toFixed(1) + 'w';
  if (heat >= 1000) return (heat / 1000).toFixed(1) + 'k';
  return String(heat);
}

export default function NovelListPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('全部');
  const [sort, setSort] = useState('heat');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [postbackRule, setPostbackRule] = useState('');
  const [rechargeTpl, setRechargeTpl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const filteredNovels = useMemo(() => {
    let list = [...NOVELS];

    if (search.trim()) {
      list = list.filter((n) =>
        n.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (category !== '全部') {
      list = list.filter((n) => n.category === category);
    }

    if (sort === 'heat') {
      list.sort((a, b) => b.heat - a.heat);
    } else if (sort === 'commission') {
      list.sort((a, b) => b.commission - a.commission);
    }

    return list;
  }, [search, category, sort]);

  const openModal = (novel) => {
    setSelectedNovel(novel);
    setPostbackRule('');
    setRechargeTpl('');
    setGeneratedLink('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNovel(null);
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
        <h1 className="page-title">网文列表</h1>
        <p className="page-subtitle">浏览平台网文内容，生成推广链接进行分发</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          className="form-input"
          placeholder="搜索网文名称"
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

      {/* Novel Cards Grid */}
      {filteredNovels.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">{'\uD83D\uDCDA'}</div>
            <div className="empty-state-text">暂无网文数据</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              网文内容由平台方上架，此处为演示页面
            </p>
          </div>
        </div>
      ) : (
        <div className="distribution-grid">
          {filteredNovels.map((novel) => (
            <div key={novel.id} className="content-card">
              <div className={`content-card-cover cover-gradient-${novel.gradient}`}>
                <span className="cover-title">{novel.name.substring(0, 2)}</span>
                <div className="heat-badge">
                  {formatHeat(novel.heat)}
                </div>
              </div>
              <div className="content-card-body">
                <div className="content-card-title">{novel.name}</div>
                <div className="content-card-meta">
                  <span>共{novel.chapters}章</span>
                  <span>{novel.words}</span>
                  <span>{novel.category}</span>
                </div>
                <div className="content-card-footer">
                  <span className="commission-tag">分佣 {novel.commission}%</span>
                </div>
              </div>
              <div className="content-card-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => openModal(novel)}
                >
                  生成推广链
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generate Promo Link Modal */}
      {modalOpen && selectedNovel && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">生成推广链 - {selectedNovel.name}</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">关联内容</label>
                <input
                  type="text"
                  className="form-input"
                  value={selectedNovel.name}
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
