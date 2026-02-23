import React, { useState } from 'react';
import './DataCenter.css';

const PERIODS = ['今日', '昨日', '近7日', '近30日'];

const STAT_CARDS = [
  { label: '总用户数', value: '12,856', change: '+5.2%', up: true },
  { label: '总充值金额', value: '¥386,420', change: '+12.8%', up: true },
  { label: '虚拟支付', value: '¥298,600', change: '+8.3%', up: true },
  { label: '非虚拟支付', value: '¥87,820', change: '+22.1%', up: true },
];

const TABLE_DATA = [
  { date: '2026-02-17', newUsers: 186, activeUsers: 2340, amount: '¥58,920', orders: 423, arpu: '¥25.18' },
  { date: '2026-02-18', newUsers: 203, activeUsers: 2510, amount: '¥62,150', orders: 468, arpu: '¥24.76' },
  { date: '2026-02-19', newUsers: 175, activeUsers: 2280, amount: '¥51,380', orders: 389, arpu: '¥22.54' },
  { date: '2026-02-20', newUsers: 221, activeUsers: 2690, amount: '¥68,430', orders: 512, arpu: '¥25.44' },
  { date: '2026-02-21', newUsers: 198, activeUsers: 2450, amount: '¥55,760', orders: 442, arpu: '¥22.76' },
  { date: '2026-02-22', newUsers: 245, activeUsers: 2870, amount: '¥72,310', orders: 538, arpu: '¥25.20' },
  { date: '2026-02-23', newUsers: 156, activeUsers: 2120, amount: '¥47,890', orders: 356, arpu: '¥22.59' },
];

const Y_LABELS = ['10万', '8万', '6万', '4万', '2万', '0'];
const X_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AppStatsPage() {
  const [activePeriod, setActivePeriod] = useState('近7日');
  const [startDate, setStartDate] = useState('2026-02-17');
  const [endDate, setEndDate] = useState('2026-02-23');

  const handleExport = () => {
    alert('导出功能仅供演示');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">应用统计</h1>
        <p className="page-subtitle">查看应用整体数据表现</p>
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

      {/* Stat Cards */}
      <div className="stat-grid">
        {STAT_CARDS.map((card) => (
          <div className="stat-card" key={card.label}>
            <div className="stat-card-label">{card.label}</div>
            <div className="stat-card-value">{card.value}</div>
            <div className={`stat-card-change ${card.up ? 'up' : 'down'}`}>
              {card.change}
            </div>
          </div>
        ))}
      </div>

      {/* Trend Chart Placeholder */}
      <div className="dc-chart-container">
        <div className="dc-chart-title">充值趋势</div>
        <div className="dc-chart-area">
          <div className="dc-chart-y-axis">
            {Y_LABELS.map((label) => (
              <span className="dc-chart-y-label" key={label}>{label}</span>
            ))}
          </div>
          <div className="dc-chart-grid-lines">
            <div className="dc-chart-grid-line" />
            <div className="dc-chart-grid-line" />
            <div className="dc-chart-grid-line" />
            <div className="dc-chart-grid-line" />
            <div className="dc-chart-grid-line" />
          </div>
          <div className="dc-chart-wave">
            <div className="dc-chart-wave-path" />
            <div className="dc-chart-wave-line" />
          </div>
          <div className="dc-chart-x-axis">
            {X_LABELS.map((label) => (
              <span className="dc-chart-x-label" key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="dc-table-section">
        <div className="dc-table-header">
          <div className="dc-table-title">数据明细</div>
          <button className="dc-export-btn" onClick={handleExport}>
            导出 Excel
          </button>
        </div>
        <div className="dc-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>日期</th>
                <th className="text-right">新增用户</th>
                <th className="text-right">活跃用户</th>
                <th className="text-right">充值金额</th>
                <th className="text-right">充值笔数</th>
                <th className="text-right">ARPU</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row) => (
                <tr key={row.date}>
                  <td>{row.date}</td>
                  <td className="text-right">{row.newUsers.toLocaleString()}</td>
                  <td className="text-right">{row.activeUsers.toLocaleString()}</td>
                  <td className="text-right dc-money">{row.amount}</td>
                  <td className="text-right">{row.orders.toLocaleString()}</td>
                  <td className="text-right dc-money">{row.arpu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
