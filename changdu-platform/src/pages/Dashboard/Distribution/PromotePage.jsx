import React, { useState, useMemo } from 'react';
import './Distribution.css';

const POSTBACK_RULES = [
  { value: 'rule-1', label: '巨量引擎-首充回传' },
  { value: 'rule-2', label: '腾讯广告-付费回传' },
  { value: 'rule-3', label: '百度推广-激活回传' },
  { value: 'rule-4', label: '快手磁力-注册回传' },
];

const RECHARGE_TEMPLATES = [
  { value: 'tpl-1', label: '默认充值模板' },
  { value: 'tpl-2', label: '新用户优惠模板' },
  { value: 'tpl-3', label: '活动充值模板' },
];

const PAGE_SIZE = 10;

function formatDate(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function PromotePage() {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal form state
  const [formContent, setFormContent] = useState('');
  const [formPostback, setFormPostback] = useState('');
  const [formTemplate, setFormTemplate] = useState('');

  const filteredLinks = useMemo(() => {
    if (!search.trim()) return links;
    const q = search.trim().toLowerCase();
    return links.filter(
      (link) =>
        link.pid.toLowerCase().includes(q) ||
        link.content.toLowerCase().includes(q)
    );
  }, [links, search]);

  const totalPages = Math.max(1, Math.ceil(filteredLinks.length / PAGE_SIZE));
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const openModal = () => {
    setFormContent('');
    setFormPostback('');
    setFormTemplate('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCreate = () => {
    if (!formContent.trim() || !formPostback || !formTemplate) return;

    const pid = 'PID-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const postbackLabel = POSTBACK_RULES.find((r) => r.value === formPostback)?.label || formPostback;
    const templateLabel = RECHARGE_TEMPLATES.find((t) => t.value === formTemplate)?.label || formTemplate;

    const newLink = {
      id: Date.now().toString(),
      pid,
      content: formContent.trim(),
      postbackRule: postbackLabel,
      rechargeTpl: templateLabel,
      createdAt: new Date().toISOString(),
      clicks: 0,
      conversions: 0,
      enabled: true,
      url: `https://changdu.com/promo/${pid}`,
    };

    setLinks((prev) => [newLink, ...prev]);
    setCurrentPage(1);
    closeModal();
  };

  const handleCopyLink = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert('链接已复制到剪贴板');
      }).catch(() => {
        alert('复制成功: ' + url);
      });
    } else {
      alert('复制成功: ' + url);
    }
  };

  const handleToggleStatus = (id) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, enabled: !link.enabled } : link
      )
    );
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">推广链管理</h1>
        <p className="page-subtitle">管理所有推广链接，追踪推广效果</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <button className="btn btn-primary" onClick={openModal}>
            + 新建推广链
          </button>
        </div>
        <div className="toolbar-right">
          <input
            type="text"
            className="form-input"
            placeholder="搜索PID或内容名称"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredLinks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">{'\uD83D\uDD17'}</div>
            <div className="empty-state-text">
              {links.length === 0
                ? '暂无推广链，请先到短剧或网文列表生成推广链'
                : '没有匹配的搜索结果'}
            </div>
            {links.length === 0 && (
              <button className="btn btn-primary btn-sm" onClick={openModal} style={{ marginTop: '8px' }}>
                新建推广链
              </button>
            )}
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>PID</th>
                    <th>关联内容</th>
                    <th>回传规则</th>
                    <th>充值模板</th>
                    <th>创建时间</th>
                    <th>累计点击</th>
                    <th>累计转化</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLinks.map((link) => (
                    <tr key={link.id}>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                          {link.pid}
                        </span>
                      </td>
                      <td>{link.content}</td>
                      <td>{link.postbackRule}</td>
                      <td>{link.rechargeTpl}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{formatDate(link.createdAt)}</td>
                      <td>{link.clicks}</td>
                      <td>{link.conversions}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => handleCopyLink(link.url)}
                          >
                            复制链接
                          </button>
                          <button
                            className={`btn btn-sm ${link.enabled ? 'btn-outline' : 'btn-primary'}`}
                            onClick={() => handleToggleStatus(link.id)}
                          >
                            {link.enabled ? '停用' : '启用'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '16px' }}>
              <div className="pagination">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  上一页
                </button>
                {renderPageButtons()}
                <button
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  下一页
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create Promo Link Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">新建推广链</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">关联内容</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="输入短剧或网文名称"
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">回传规则</label>
                <select
                  className="form-select"
                  value={formPostback}
                  onChange={(e) => setFormPostback(e.target.value)}
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
                  value={formTemplate}
                  onChange={(e) => setFormTemplate(e.target.value)}
                >
                  <option value="">请选择充值模板</option>
                  {RECHARGE_TEMPLATES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>取消</button>
              <button
                className="btn btn-primary"
                onClick={handleCreate}
                disabled={!formContent.trim() || !formPostback || !formTemplate}
              >
                生成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
