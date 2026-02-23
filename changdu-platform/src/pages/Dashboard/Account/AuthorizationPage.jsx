import React, { useState } from 'react';
import './Account.css';

function formatDateTime(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AuthorizationPage() {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    accountId: '',
    accountName: '',
  });

  const openModal = () => {
    setFormData({ accountId: '', accountName: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ accountId: '', accountName: '' });
  };

  const handleBind = () => {
    if (!formData.accountId.trim()) {
      alert('请输入巨量引擎账号ID');
      return;
    }
    if (!formData.accountName.trim()) {
      alert('请输入账号名称');
      return;
    }
    const newAccount = {
      id: 'auth-' + Date.now(),
      accountId: formData.accountId.trim(),
      accountName: formData.accountName.trim(),
      bindTime: new Date().toISOString(),
      status: '已绑定',
    };
    setAccounts((prev) => [...prev, newAccount]);
    closeModal();
  };

  const handleUnbind = (id, name) => {
    if (!window.confirm(`确定要解绑账号「${name}」吗？解绑后将无法使用该账号进行数据回传。`)) {
      return;
    }
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">账号授权</h1>
        <p className="page-subtitle">管理巨量引擎广告账号授权绑定</p>
      </div>

      {/* Info box */}
      <div className="info-box">
        <div className="info-box-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="info-box-content">
          <div className="info-box-title">关于账号授权</div>
          <div className="info-box-text">
            绑定巨量引擎账号后，可用于广告回传数据对接。授权后系统将自动同步广告投放数据，支持转化事件的精准回传，提升广告投放效果。
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            已授权 {accounts.length} 个账号
          </span>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={openModal}>
            + 新增授权
          </button>
        </div>
      </div>

      {/* Authorized accounts table */}
      <div className="card" style={{ padding: 0 }}>
        {accounts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔗</div>
            <div className="empty-state-text">暂无已授权账号</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>账号ID</th>
                <th>账号名称</th>
                <th>绑定时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id}>
                  <td style={{ fontFamily: "'SF Mono', 'Consolas', monospace", fontSize: 13 }}>
                    {a.accountId}
                  </td>
                  <td>{a.accountName}</td>
                  <td>{formatDateTime(a.bindTime)}</td>
                  <td>
                    <span className="badge badge-success">{a.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleUnbind(a.id, a.accountName)}
                    >
                      解绑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Bind Modal (simulated OAuth) */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">授权巨量引擎账号</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '16px 0 20px',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: 20,
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #1a6dff 0%, #0052d9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                color: '#fff',
                fontSize: 24,
                fontWeight: 700,
              }}>
                巨
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-color)' }}>
                巨量引擎账号绑定
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                请输入您的巨量引擎广告账号信息
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">巨量引擎账号ID</label>
              <input
                className="form-input"
                placeholder="请输入广告账号ID"
                value={formData.accountId}
                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
              />
              <div className="form-hint">可在巨量引擎后台 - 账号管理中查看</div>
            </div>
            <div className="form-group">
              <label className="form-label">账号名称</label>
              <input
                className="form-input"
                placeholder="请输入账号名称（便于识别）"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>取消</button>
              <button className="btn btn-primary" onClick={handleBind}>确认绑定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
