import React, { useState } from 'react';
import './Distribution.css';

const PLATFORMS = [
  { value: 'juliang', label: '巨量引擎' },
  { value: 'tencent', label: '腾讯广告' },
  { value: 'baidu', label: '百度推广' },
  { value: 'kuaishou', label: '快手磁力' },
];

const PLATFORM_EVENTS = {
  juliang: [
    { value: 'activate', label: '激活' },
    { value: 'register', label: '注册' },
    { value: 'pay', label: '付费' },
    { value: 'first_pay', label: '首次付费' },
  ],
  tencent: [
    { value: 'activate', label: '激活' },
    { value: 'register', label: '注册完成' },
    { value: 'purchase', label: '购买' },
    { value: 'add_cart', label: '加入购物车' },
  ],
  baidu: [
    { value: 'activate', label: '应用激活' },
    { value: 'register', label: '注册' },
    { value: 'pay', label: '付费' },
    { value: 'retain', label: '次留' },
  ],
  kuaishou: [
    { value: 'activate', label: '激活' },
    { value: 'register', label: '注册' },
    { value: 'first_recharge', label: '首充' },
    { value: 'recharge', label: '充值' },
  ],
};

const LOCAL_EVENTS = [
  { value: 'app_activate', label: '应用激活' },
  { value: 'user_register', label: '用户注册' },
  { value: 'first_recharge', label: '首次充值' },
  { value: 'recharge', label: '充值' },
  { value: 'subscribe', label: '订阅' },
  { value: 'read_chapter', label: '阅读章节' },
];

function formatDate(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function getInitialMappings() {
  return [
    { platformEvent: '', localEvent: '' },
    { platformEvent: '', localEvent: '' },
  ];
}

export default function PostbackPage() {
  const [rules, setRules] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formPlatform, setFormPlatform] = useState('');
  const [formMappings, setFormMappings] = useState(getInitialMappings());
  const [formCondition, setFormCondition] = useState('');

  const resetForm = () => {
    setFormName('');
    setFormPlatform('');
    setFormMappings(getInitialMappings());
    setFormCondition('');
    setEditingRule(null);
  };

  const openCreateModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (rule) => {
    setEditingRule(rule);
    setFormName(rule.name);
    setFormPlatform(rule.platform);
    setFormMappings(
      rule.mappings.length > 0
        ? rule.mappings.map((m) => ({ ...m }))
        : getInitialMappings()
    );
    setFormCondition(rule.condition);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const handlePlatformChange = (value) => {
    setFormPlatform(value);
    // Reset mappings when platform changes
    setFormMappings(getInitialMappings());
  };

  const handleMappingChange = (index, field, value) => {
    setFormMappings((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const handleSave = () => {
    if (!formName.trim() || !formPlatform) return;

    const platformLabel = PLATFORMS.find((p) => p.value === formPlatform)?.label || formPlatform;
    const validMappings = formMappings.filter(
      (m) => m.platformEvent && m.localEvent
    );

    const eventsDescription = validMappings
      .map((m) => {
        const pe = (PLATFORM_EVENTS[formPlatform] || []).find((e) => e.value === m.platformEvent);
        const le = LOCAL_EVENTS.find((e) => e.value === m.localEvent);
        return `${pe?.label || m.platformEvent} -> ${le?.label || m.localEvent}`;
      })
      .join(', ');

    if (editingRule) {
      setRules((prev) =>
        prev.map((r) =>
          r.id === editingRule.id
            ? {
                ...r,
                name: formName.trim(),
                platform: formPlatform,
                platformLabel,
                mappings: validMappings,
                eventsDescription,
                condition: formCondition.trim(),
              }
            : r
        )
      );
    } else {
      const newRule = {
        id: Date.now().toString(),
        name: formName.trim(),
        platform: formPlatform,
        platformLabel,
        mappings: validMappings,
        eventsDescription,
        condition: formCondition.trim(),
        enabled: true,
        createdAt: new Date().toISOString(),
      };
      setRules((prev) => [newRule, ...prev]);
    }

    closeModal();
  };

  const handleToggleStatus = (id) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('确定要删除此回传规则吗？')) {
      setRules((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const currentPlatformEvents = PLATFORM_EVENTS[formPlatform] || [];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">广告回传</h1>
        <p className="page-subtitle">管理广告投放平台的数据回传规则</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <button className="btn btn-primary" onClick={openCreateModal}>
            + 新增回传规则
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {rules.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">{'\uD83D\uDCE1'}</div>
            <div className="empty-state-text">暂无回传规则</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
              创建回传规则后，广告平台可自动接收转化数据
            </p>
            <button className="btn btn-primary btn-sm" onClick={openCreateModal}>
              新增回传规则
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>规则名称</th>
                  <th>投放平台</th>
                  <th>转化事件</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id}>
                    <td style={{ fontWeight: 500 }}>{rule.name}</td>
                    <td>
                      <span className="badge badge-info">{rule.platformLabel}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {rule.eventsDescription || '-'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${rule.enabled ? 'badge-success' : 'badge-warning'}`}>
                        {rule.enabled ? '已启用' : '已停用'}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{formatDate(rule.createdAt)}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => openEditModal(rule)}
                        >
                          编辑
                        </button>
                        <button
                          className={`btn btn-sm ${rule.enabled ? 'btn-outline' : 'btn-primary'}`}
                          onClick={() => handleToggleStatus(rule.id)}
                        >
                          {rule.enabled ? '停用' : '启用'}
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(rule.id)}
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingRule ? '编辑回传规则' : '新增回传规则'}
              </h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">规则名称</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="例如：巨量引擎-首充回传"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">投放平台</label>
                <select
                  className="form-select"
                  value={formPlatform}
                  onChange={(e) => handlePlatformChange(e.target.value)}
                >
                  <option value="">请选择投放平台</option>
                  {PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">转化事件映射</label>
                <p className="form-hint" style={{ marginBottom: '10px' }}>
                  将平台事件映射到本地事件，用于数据回传
                </p>
                <div className="event-mapping">
                  {formMappings.map((mapping, index) => (
                    <div key={index} className="event-mapping-row">
                      <select
                        className="form-select"
                        value={mapping.platformEvent}
                        onChange={(e) =>
                          handleMappingChange(index, 'platformEvent', e.target.value)
                        }
                        disabled={!formPlatform}
                      >
                        <option value="">
                          {formPlatform ? '选择平台事件' : '请先选择平台'}
                        </option>
                        {currentPlatformEvents.map((e) => (
                          <option key={e.value} value={e.value}>{e.label}</option>
                        ))}
                      </select>
                      <span className="event-mapping-arrow">{'\u2192'}</span>
                      <select
                        className="form-select"
                        value={mapping.localEvent}
                        onChange={(e) =>
                          handleMappingChange(index, 'localEvent', e.target.value)
                        }
                      >
                        <option value="">选择本地事件</option>
                        {LOCAL_EVENTS.map((e) => (
                          <option key={e.value} value={e.value}>{e.label}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">回传条件</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="例如：首充金额≥6元"
                  value={formCondition}
                  onChange={(e) => setFormCondition(e.target.value)}
                />
                <p className="form-hint">设置满足特定条件时才回传数据，留空表示无条件回传</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>取消</button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!formName.trim() || !formPlatform}
              >
                {editingRule ? '保存' : '创建'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
