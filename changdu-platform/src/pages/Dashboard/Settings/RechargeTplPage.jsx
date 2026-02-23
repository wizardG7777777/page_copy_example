import React, { useState } from 'react';
import './Settings.css';

function formatDateTime(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const DEFAULT_PAID_TIERS = [
  { id: 1, amount: '6' },
  { id: 2, amount: '18' },
  { id: 3, amount: '30' },
  { id: 4, amount: '68' },
];

const DEFAULT_UNPAID_TIERS = [
  { id: 1, amount: '1' },
  { id: 2, amount: '6' },
  { id: 3, amount: '12' },
  { id: 4, amount: '30' },
];

const DEFAULT_PLANS = [
  { name: '周卡', price: '30' },
  { name: '月卡', price: '68' },
  { name: '年卡', price: '365' },
];

function createInitialForm() {
  return {
    name: '',
    paidTiers: DEFAULT_PAID_TIERS.map((t) => ({ ...t })),
    paidPlans: DEFAULT_PLANS.map((p) => ({ ...p })),
    unpaidTiers: DEFAULT_UNPAID_TIERS.map((t) => ({ ...t })),
    unpaidPlans: DEFAULT_PLANS.map((p) => ({ ...p })),
  };
}

let tierIdCounter = 100;

export default function RechargeTplPage() {
  const [templates, setTemplates] = useState([]);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(createInitialForm);

  const openNewForm = () => {
    setForm(createInitialForm());
    setEditingId(null);
    setView('form');
  };

  const openEditForm = (tpl) => {
    setForm({
      name: tpl.name,
      paidTiers: tpl.paidTiers.map((t) => ({ ...t })),
      paidPlans: tpl.paidPlans.map((p) => ({ ...p })),
      unpaidTiers: tpl.unpaidTiers.map((t) => ({ ...t })),
      unpaidPlans: tpl.unpaidPlans.map((p) => ({ ...p })),
    });
    setEditingId(tpl.id);
    setView('form');
  };

  const duplicateTemplate = (tpl) => {
    const dup = {
      ...tpl,
      id: 'tpl-' + Date.now(),
      name: tpl.name + ' (副本)',
      createdAt: new Date().toISOString(),
      paidTiers: tpl.paidTiers.map((t) => ({ ...t, id: ++tierIdCounter })),
      paidPlans: tpl.paidPlans.map((p) => ({ ...p })),
      unpaidTiers: tpl.unpaidTiers.map((t) => ({ ...t, id: ++tierIdCounter })),
      unpaidPlans: tpl.unpaidPlans.map((p) => ({ ...p })),
    };
    setTemplates((prev) => [...prev, dup]);
  };

  const deleteTemplate = (id, name) => {
    if (!window.confirm(`确定删除模板「${name}」吗？此操作不可恢复。`)) return;
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const backToList = () => {
    setView('list');
    setEditingId(null);
  };

  const handleSaveTemplate = () => {
    if (!form.name.trim()) {
      alert('请输入模板名称');
      return;
    }
    if (editingId) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? {
                ...t,
                name: form.name.trim(),
                paidTiers: form.paidTiers.map((tier) => ({ ...tier })),
                paidPlans: form.paidPlans.map((p) => ({ ...p })),
                unpaidTiers: form.unpaidTiers.map((tier) => ({ ...tier })),
                unpaidPlans: form.unpaidPlans.map((p) => ({ ...p })),
              }
            : t
        )
      );
    } else {
      const newTpl = {
        id: 'tpl-' + Date.now(),
        name: form.name.trim(),
        createdAt: new Date().toISOString(),
        paidTiers: form.paidTiers.map((t) => ({ ...t })),
        paidPlans: form.paidPlans.map((p) => ({ ...p })),
        unpaidTiers: form.unpaidTiers.map((t) => ({ ...t })),
        unpaidPlans: form.unpaidPlans.map((p) => ({ ...p })),
      };
      setTemplates((prev) => [...prev, newTpl]);
    }
    backToList();
  };

  // Tier helpers
  const updateTier = (section, idx, value) => {
    setForm((prev) => {
      const tiers = [...prev[section]];
      tiers[idx] = { ...tiers[idx], amount: value };
      return { ...prev, [section]: tiers };
    });
  };

  const addTier = (section) => {
    setForm((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: ++tierIdCounter, amount: '' }],
    }));
  };

  const removeTier = (section, idx) => {
    setForm((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== idx),
    }));
  };

  const updatePlan = (section, idx, value) => {
    setForm((prev) => {
      const plans = [...prev[section]];
      plans[idx] = { ...plans[idx], price: value };
      return { ...prev, [section]: plans };
    });
  };

  const renderTierSection = (sectionKey, planKey, label) => (
    <div className="tpl-form-section">
      <div className="tpl-form-section-title">{label}</div>

      <div className="tpl-form-subsection">
        <div className="tpl-form-subsection-title">充值档位</div>
        <div className="tier-list">
          {form[sectionKey].map((tier, idx) => (
            <div className="tier-row" key={tier.id}>
              <span className="tier-label">档位 {idx + 1}</span>
              <input
                className="form-input"
                type="number"
                min="0"
                placeholder="金额"
                value={tier.amount}
                onChange={(e) => updateTier(sectionKey, idx, e.target.value)}
              />
              <span className="tier-unit">元</span>
              {form[sectionKey].length > 1 && (
                <button
                  className="tier-remove-btn"
                  onClick={() => removeTier(sectionKey, idx)}
                  title="删除此档位"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button className="tier-add-btn" onClick={() => addTier(sectionKey)}>
            + 添加档位
          </button>
        </div>
      </div>

      <div className="tpl-form-subsection">
        <div className="tpl-form-subsection-title">会员套餐</div>
        {form[planKey].map((plan, idx) => (
          <div className="plan-row" key={plan.name}>
            <span className="plan-name">{plan.name}</span>
            <input
              className="form-input"
              type="number"
              min="0"
              placeholder="价格"
              value={plan.price}
              onChange={(e) => updatePlan(planKey, idx, e.target.value)}
            />
            <span className="tier-unit">元</span>
          </div>
        ))}
      </div>
    </div>
  );

  const summarizeTiers = (tiers) => {
    return tiers
      .filter((t) => t.amount)
      .map((t) => t.amount + '元')
      .join('、');
  };

  // --- Render ---
  if (view === 'form') {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">充值模板</h1>
        </div>

        <button className="tpl-back-link" onClick={backToList}>
          &larr; 返回模板列表
        </button>

        <div className="card">
          <div className="tpl-form">
            <div className="form-group">
              <label className="form-label">模板名称</label>
              <input
                className="form-input"
                placeholder="请输入模板名称，如：默认充值模板"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ maxWidth: 400 }}
              />
            </div>

            {renderTierSection('paidTiers', 'paidPlans', '已充值用户配置')}
            {renderTierSection('unpaidTiers', 'unpaidPlans', '未充值用户配置')}

            <div className="tpl-form-actions">
              <button className="btn btn-primary" onClick={handleSaveTemplate}>
                保存模板
              </button>
              <button className="btn btn-outline" onClick={backToList}>
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">充值模板</h1>
        <p className="page-subtitle">配置不同场景下的充值档位和会员套餐</p>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            共 {templates.length} 个模板
          </span>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={openNewForm}>
            + 新建模板
          </button>
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-text">暂无充值模板</div>
          </div>
        </div>
      ) : (
        <div className="tpl-grid">
          {templates.map((tpl) => (
            <div className="tpl-card" key={tpl.id}>
              <div className="tpl-card-header">
                <div className="tpl-card-name">{tpl.name}</div>
                <div className="tpl-card-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => openEditForm(tpl)}>
                    编辑
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => duplicateTemplate(tpl)}>
                    复制
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTemplate(tpl.id, tpl.name)}>
                    删除
                  </button>
                </div>
              </div>
              <div className="tpl-card-meta">
                创建时间: {formatDateTime(tpl.createdAt)}
              </div>
              <div className="tpl-card-summary">
                <div className="tpl-card-summary-row">
                  <span className="tpl-card-summary-label">已充值档位:</span>
                  {summarizeTiers(tpl.paidTiers) || '未设置'}
                </div>
                <div className="tpl-card-summary-row">
                  <span className="tpl-card-summary-label">未充值档位:</span>
                  {summarizeTiers(tpl.unpaidTiers) || '未设置'}
                </div>
                <div className="tpl-card-summary-row">
                  <span className="tpl-card-summary-label">会员套餐:</span>
                  {tpl.paidPlans.filter((p) => p.price).map((p) => `${p.name} ${p.price}元`).join('、') || '未设置'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
