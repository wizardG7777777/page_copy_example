import React, { useState } from 'react';
import './DataCenter.css';

const PERIODS = ['今日', '昨日', '近7日', '近30日'];

const TABLE_DATA = [
  { date: '2026-02-23', pid: 'PID-20260201-001', content: '《重生之都市修仙》', clicks: 12580, registers: 386, payers: 89, amount: 15680, roi: 3.2 },
  { date: '2026-02-23', pid: 'PID-20260205-003', content: '《豪门千金归来》', clicks: 9420, registers: 275, payers: 72, amount: 12340, roi: 2.8 },
  { date: '2026-02-22', pid: 'PID-20260208-007', content: '《战神归来》', clicks: 18350, registers: 512, payers: 134, amount: 23890, roi: 4.1 },
  { date: '2026-02-22', pid: 'PID-20260210-012', content: '《甜蜜闪婚：总裁的心尖宠》', clicks: 7650, registers: 198, payers: 45, amount: 7820, roi: 1.9 },
  { date: '2026-02-21', pid: 'PID-20260212-005', content: '《龙王赘婿》', clicks: 15280, registers: 423, payers: 108, amount: 19560, roi: 3.5 },
  { date: '2026-02-21', pid: 'PID-20260215-009', content: '《穿越女将军》', clicks: 6890, registers: 167, payers: 38, amount: 6540, roi: 1.6 },
  { date: '2026-02-20', pid: 'PID-20260218-002', content: '《末世觉醒》', clicks: 21400, registers: 634, payers: 156, amount: 28750, roi: 4.5 },
  { date: '2026-02-20', pid: 'PID-20260219-008', content: '《盛世嫡妃》', clicks: 8920, registers: 245, payers: 61, amount: 10580, roi: 2.3 },
  { date: '2026-02-19', pid: 'PID-20260220-004', content: '《全球进化》', clicks: 11350, registers: 318, payers: 82, amount: 14290, roi: 3.0 },
  { date: '2026-02-19', pid: 'PID-20260221-010', content: '《闪婚后大佬每天都在撩》', clicks: 5680, registers: 142, payers: 33, amount: 5720, roi: 1.4 },
];

function computeTotals(data) {
  return {
    clicks: data.reduce((s, r) => s + r.clicks, 0),
    registers: data.reduce((s, r) => s + r.registers, 0),
    payers: data.reduce((s, r) => s + r.payers, 0),
    amount: data.reduce((s, r) => s + r.amount, 0),
  };
}

export default function PromoStatsPage() {
  const [activePeriod, setActivePeriod] = useState('近7日');
  const [startDate, setStartDate] = useState('2026-02-17');
  const [endDate, setEndDate] = useState('2026-02-23');
  const [pidSearch, setPidSearch] = useState('');
  const [contentSearch, setContentSearch] = useState('');

  const totals = computeTotals(TABLE_DATA);
  const totalRoi = totals.amount > 0 ? (totals.amount / (totals.clicks * 0.5)).toFixed(1) : '0';

  const handleExport = () => {
    alert('导出功能仅供演示');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">推广统计</h1>
        <p className="page-subtitle">查看各推广渠道的转化数据</p>
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
          placeholder="搜索 PID"
          value={pidSearch}
          onChange={(e) => setPidSearch(e.target.value)}
        />
        <input
          type="text"
          className="form-input"
          placeholder="搜索关联内容"
          value={contentSearch}
          onChange={(e) => setContentSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="dc-table-section">
        <div className="dc-table-header">
          <div className="dc-table-title">推广数据明细</div>
          <button className="dc-export-btn" onClick={handleExport}>
            导出 Excel
          </button>
        </div>
        <div className="dc-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>PID</th>
                <th>关联内容</th>
                <th className="text-right">点击量</th>
                <th className="text-right">注册人数</th>
                <th className="text-right">付费人数</th>
                <th className="text-right">付费金额</th>
                <th className="text-right">ROI</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{row.pid}</td>
                  <td>{row.content}</td>
                  <td className="text-right">{row.clicks.toLocaleString()}</td>
                  <td className="text-right">{row.registers.toLocaleString()}</td>
                  <td className="text-right">{row.payers.toLocaleString()}</td>
                  <td className="text-right dc-money">¥{row.amount.toLocaleString()}</td>
                  <td className={`text-right ${row.roi >= 2.5 ? 'dc-roi-positive' : row.roi < 2 ? 'dc-roi-negative' : ''}`}>
                    {row.roi.toFixed(1)}
                  </td>
                </tr>
              ))}
              {/* Summary row */}
              <tr className="dc-summary-row">
                <td colSpan={3} style={{ fontWeight: 600 }}>合计</td>
                <td className="text-right">{totals.clicks.toLocaleString()}</td>
                <td className="text-right">{totals.registers.toLocaleString()}</td>
                <td className="text-right">{totals.payers.toLocaleString()}</td>
                <td className="text-right dc-money">¥{totals.amount.toLocaleString()}</td>
                <td className="text-right">{totalRoi}</td>
              </tr>
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
            <button className="pagination-btn">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
