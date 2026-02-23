import React, { useState } from 'react';
import './Settlement.css';

function formatDateTime(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatMoney(n) {
  return '¥' + n.toLocaleString('zh-CN');
}

function getStatusBadge(status) {
  switch (status) {
    case '审核中':
      return 'badge-warning';
    case '已打款':
      return 'badge-success';
    case '已驳回':
      return 'badge-danger';
    default:
      return 'badge-info';
  }
}

const INITIAL_RECORDS = [
  {
    id: 'wd-1',
    orderNo: 'WD-20260215-001',
    amount: 50000,
    createdAt: '2026-02-15T10:30:00',
    status: '已打款',
    remark: '已打款至工商银行',
  },
  {
    id: 'wd-2',
    orderNo: 'WD-20260201-001',
    amount: 30000,
    createdAt: '2026-02-01T14:20:00',
    status: '已打款',
    remark: '已打款至建设银行',
  },
];

export default function WithdrawPage() {
  const [balance, setBalance] = useState(86420);
  const [totalWithdrawn] = useState(256000);
  const [frozenAmount] = useState(12350);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    bank: '工商银行',
    cardNo: '',
  });

  let orderCounter = records.length + 1;

  const openModal = () => {
    setFormData({ amount: '', bank: '工商银行', cardNo: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(formData.amount);
    if (!amount || amount <= 0) {
      alert('请输入有效的提现金额');
      return;
    }
    if (amount > balance) {
      alert('提现金额不能超过可提现余额');
      return;
    }
    if (!formData.cardNo.trim()) {
      alert('请输入银行卡号');
      return;
    }

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    const orderNo = `WD-${dateStr}-${String(++orderCounter).padStart(3, '0')}`;

    const newRecord = {
      id: 'wd-' + Date.now(),
      orderNo,
      amount,
      createdAt: now.toISOString(),
      status: '审核中',
      remark: `提现至${formData.bank}`,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setBalance((prev) => prev - amount);
    closeModal();
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">提现管理</h1>
        <p className="page-subtitle">管理提现申请与记录</p>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="settlement-stat-icon balance">💰</div>
          <div className="stat-card-label">可提现余额</div>
          <div className="stat-card-value" style={{ color: 'var(--success-color)' }}>
            {formatMoney(balance)}
          </div>
        </div>
        <div className="stat-card">
          <div className="settlement-stat-icon withdrawn">📤</div>
          <div className="stat-card-label">累计已提现</div>
          <div className="stat-card-value">{formatMoney(totalWithdrawn)}</div>
        </div>
        <div className="stat-card">
          <div className="settlement-stat-icon frozen">🔒</div>
          <div className="stat-card-label">冻结金额</div>
          <div className="stat-card-value" style={{ color: 'var(--warning-color)' }}>
            {formatMoney(frozenAmount)}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            提现记录
          </span>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={openModal}>
            发起提现
          </button>
        </div>
      </div>

      {/* Records table */}
      <div className="card" style={{ padding: 0 }}>
        {records.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-text">暂无提现记录</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>提现单号</th>
                <th>金额</th>
                <th>发起时间</th>
                <th>状态</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className="withdraw-order-no">{r.orderNo}</span>
                  </td>
                  <td>
                    <span className="bill-amount">{formatMoney(r.amount)}</span>
                  </td>
                  <td>{formatDateTime(r.createdAt)}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{r.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Withdraw Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">发起提现</h3>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>

            <div className="form-group">
              <label className="form-label">提现金额</label>
              <div className="withdraw-amount-wrapper">
                <span className="withdraw-amount-prefix">¥</span>
                <input
                  className="form-input"
                  type="number"
                  min="0"
                  max={balance}
                  placeholder="请输入提现金额"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div className="withdraw-max-hint">
                可提现余额: {formatMoney(balance)}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">收款银行</label>
              <select
                className="form-select"
                value={formData.bank}
                onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
              >
                <option value="工商银行">工商银行</option>
                <option value="建设银行">建设银行</option>
                <option value="农业银行">农业银行</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">银行卡号</label>
              <input
                className="form-input"
                placeholder="请输入收款银行卡号"
                value={formData.cardNo}
                onChange={(e) => setFormData({ ...formData, cardNo: e.target.value })}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>取消</button>
              <button className="btn btn-primary" onClick={handleWithdraw}>确认提现</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
