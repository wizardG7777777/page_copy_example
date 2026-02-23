import React, { useState } from 'react';
import './DataCenter.css';

const PERIODS = ['今日', '昨日', '近7日', '近30日'];

const PAYMENT_OPTIONS = [
  { value: '', label: '全部支付方式' },
  { value: '微信支付', label: '微信支付' },
  { value: '支付宝', label: '支付宝' },
  { value: '抖音支付', label: '抖音支付' },
];

const STATUS_MAP = {
  '已完成': 'badge-success',
  '待支付': 'badge-warning',
  '已退款': 'badge-danger',
};

const TABLE_DATA = [
  { orderId: 'ORD-20260223-3847', userId: 'U-83921', amount: 68, payment: '微信支付', pid: 'PID-20260201-001', time: '2026-02-23 14:32:18', status: '已完成' },
  { orderId: 'ORD-20260223-3846', userId: 'U-72156', amount: 30, payment: '支付宝', pid: 'PID-20260205-003', time: '2026-02-23 14:28:05', status: '已完成' },
  { orderId: 'ORD-20260223-3845', userId: 'U-65432', amount: 6, payment: '微信支付', pid: 'PID-20260208-007', time: '2026-02-23 13:55:42', status: '待支付' },
  { orderId: 'ORD-20260223-3844', userId: 'U-91045', amount: 18, payment: '抖音支付', pid: 'PID-20260210-012', time: '2026-02-23 13:22:31', status: '已完成' },
  { orderId: 'ORD-20260223-3843', userId: 'U-44829', amount: 68, payment: '微信支付', pid: 'PID-20260212-005', time: '2026-02-23 12:48:19', status: '已退款' },
  { orderId: 'ORD-20260223-3842', userId: 'U-57631', amount: 12, payment: '支付宝', pid: 'PID-20260215-009', time: '2026-02-23 12:15:07', status: '已完成' },
  { orderId: 'ORD-20260223-3841', userId: 'U-38274', amount: 30, payment: '微信支付', pid: 'PID-20260218-002', time: '2026-02-23 11:43:55', status: '已完成' },
  { orderId: 'ORD-20260223-3840', userId: 'U-62918', amount: 6, payment: '抖音支付', pid: 'PID-20260219-008', time: '2026-02-23 11:12:33', status: '待支付' },
  { orderId: 'ORD-20260223-3839', userId: 'U-15673', amount: 48, payment: '微信支付', pid: 'PID-20260220-004', time: '2026-02-23 10:38:22', status: '已完成' },
  { orderId: 'ORD-20260223-3838', userId: 'U-80456', amount: 18, payment: '支付宝', pid: 'PID-20260221-010', time: '2026-02-23 10:05:14', status: '已完成' },
];

export default function OrderStatsPage() {
  const [activePeriod, setActivePeriod] = useState('近7日');
  const [startDate, setStartDate] = useState('2026-02-17');
  const [endDate, setEndDate] = useState('2026-02-23');
  const [orderSearch, setOrderSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [pidFilter, setPidFilter] = useState('');

  const handleExport = () => {
    alert('导出功能仅供演示');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">订单统计</h1>
        <p className="page-subtitle">查看订单详情及支付状态</p>
      </div>

      {/* Date Picker */}
      <div className="dc-date-picker">
        <div className="dc-date-quick-btns">
          {PERIODS.map((p) => (
            <button
              key={p}
              className={`dc-date-quick-btn ${activePeriod === p ? 'active' : ''}`}
              onClick={() => setActivePeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <input
          type="date"
          className="dc-date-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span className="dc-date-separator">至</span>
        <input
          type="date"
          className="dc-date-input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Filter bar */}
      <div className="dc-filter-bar">
        <input
          type="text"
          className="form-input"
          placeholder="搜索订单号"
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          {PAYMENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input
          type="text"
          className="form-input"
          placeholder="来源 PID"
          value={pidFilter}
          onChange={(e) => setPidFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="dc-table-section">
        <div className="dc-table-header">
          <div className="dc-table-title">订单列表</div>
          <button className="dc-export-btn" onClick={handleExport}>
            导出 Excel
          </button>
        </div>
        <div className="dc-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>订单号</th>
                <th>用户ID</th>
                <th className="text-right">订单金额</th>
                <th>支付方式</th>
                <th>来源PID</th>
                <th>下单时间</th>
                <th className="text-center">订单状态</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row) => (
                <tr key={row.orderId}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{row.orderId}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{row.userId}</td>
                  <td className="text-right dc-money">¥{row.amount.toFixed(2)}</td>
                  <td>{row.payment}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{row.pid}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.time}</td>
                  <td className="text-center">
                    <span className={`badge ${STATUS_MAP[row.status]}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dc-table-footer">
          <span className="dc-pagination-info">共 {TABLE_DATA.length} 条记录</span>
          <div className="pagination">
            <button className="pagination-btn" disabled>上一页</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">4</button>
            <button className="pagination-btn">5</button>
            <button className="pagination-btn">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
