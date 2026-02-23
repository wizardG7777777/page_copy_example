import React, { useState } from 'react';
import './DataCenter.css';

const PERIODS = ['今日', '昨日', '近7日', '近30日'];

const TABLE_DATA = [
  {
    userId: 'U-83921',
    attrTime: '2026-02-18 09:12:33',
    pid: 'PID-20260201-001',
    totalRecharge: 386,
    totalOrders: 12,
    lastActive: '2026-02-23 14:32',
    readHistory: [
      { title: '《重生之都市修仙》', time: '2026-02-23 14:20' },
      { title: '《战神归来》', time: '2026-02-22 21:05' },
      { title: '《龙王赘婿》', time: '2026-02-21 19:30' },
    ],
    rechargeHistory: [
      { amount: 68, time: '2026-02-23 14:32', method: '微信支付' },
      { amount: 30, time: '2026-02-20 11:18', method: '微信支付' },
      { amount: 18, time: '2026-02-18 09:45', method: '支付宝' },
    ],
  },
  {
    userId: 'U-72156',
    attrTime: '2026-02-15 14:28:07',
    pid: 'PID-20260205-003',
    totalRecharge: 248,
    totalOrders: 8,
    lastActive: '2026-02-23 13:15',
    readHistory: [
      { title: '《豪门千金归来》', time: '2026-02-23 12:50' },
      { title: '《甜蜜闪婚：总裁的心尖宠》', time: '2026-02-22 20:30' },
      { title: '《盛世嫡妃》', time: '2026-02-21 18:15' },
      { title: '《闪婚后大佬每天都在撩》', time: '2026-02-20 22:00' },
    ],
    rechargeHistory: [
      { amount: 30, time: '2026-02-23 13:10', method: '支付宝' },
      { amount: 68, time: '2026-02-19 16:42', method: '微信支付' },
    ],
  },
  {
    userId: 'U-65432',
    attrTime: '2026-02-20 10:35:22',
    pid: 'PID-20260208-007',
    totalRecharge: 124,
    totalOrders: 5,
    lastActive: '2026-02-23 11:48',
    readHistory: [
      { title: '《战神归来》', time: '2026-02-23 11:30' },
      { title: '《末世觉醒》', time: '2026-02-22 15:20' },
      { title: '《全球进化》', time: '2026-02-21 20:45' },
    ],
    rechargeHistory: [
      { amount: 18, time: '2026-02-22 15:25', method: '微信支付' },
      { amount: 6, time: '2026-02-21 20:50', method: '抖音支付' },
      { amount: 30, time: '2026-02-20 10:40', method: '微信支付' },
    ],
  },
  {
    userId: 'U-91045',
    attrTime: '2026-02-12 08:19:44',
    pid: 'PID-20260210-012',
    totalRecharge: 512,
    totalOrders: 16,
    lastActive: '2026-02-23 10:22',
    readHistory: [
      { title: '《重生之都市修仙》', time: '2026-02-23 10:10' },
      { title: '《龙王赘婿》', time: '2026-02-22 22:35' },
      { title: '《穿越女将军》', time: '2026-02-22 18:00' },
    ],
    rechargeHistory: [
      { amount: 68, time: '2026-02-23 10:15', method: '抖音支付' },
      { amount: 48, time: '2026-02-21 09:30', method: '微信支付' },
    ],
  },
  {
    userId: 'U-44829',
    attrTime: '2026-02-08 16:45:11',
    pid: 'PID-20260212-005',
    totalRecharge: 198,
    totalOrders: 7,
    lastActive: '2026-02-22 22:10',
    readHistory: [
      { title: '《龙王赘婿》', time: '2026-02-22 22:00' },
      { title: '《战神归来》', time: '2026-02-21 19:45' },
      { title: '《末世觉醒》', time: '2026-02-20 21:15' },
    ],
    rechargeHistory: [
      { amount: 68, time: '2026-02-22 12:48', method: '微信支付' },
      { amount: 30, time: '2026-02-18 14:20', method: '支付宝' },
      { amount: 12, time: '2026-02-10 09:55', method: '微信支付' },
    ],
  },
  {
    userId: 'U-57631',
    attrTime: '2026-02-19 11:22:38',
    pid: 'PID-20260215-009',
    totalRecharge: 78,
    totalOrders: 3,
    lastActive: '2026-02-22 18:35',
    readHistory: [
      { title: '《穿越女将军》', time: '2026-02-22 18:20' },
      { title: '《盛世嫡妃》', time: '2026-02-21 16:00' },
      { title: '《豪门千金归来》', time: '2026-02-20 14:30' },
    ],
    rechargeHistory: [
      { amount: 12, time: '2026-02-22 18:25', method: '支付宝' },
      { amount: 18, time: '2026-02-20 14:35', method: '微信支付' },
    ],
  },
  {
    userId: 'U-38274',
    attrTime: '2026-02-16 20:08:15',
    pid: 'PID-20260218-002',
    totalRecharge: 330,
    totalOrders: 10,
    lastActive: '2026-02-22 15:50',
    readHistory: [
      { title: '《末世觉醒》', time: '2026-02-22 15:40' },
      { title: '《全球进化》', time: '2026-02-21 21:10' },
      { title: '《重生之都市修仙》', time: '2026-02-20 18:45' },
      { title: '《战神归来》', time: '2026-02-19 22:20' },
    ],
    rechargeHistory: [
      { amount: 30, time: '2026-02-22 11:43', method: '微信支付' },
      { amount: 68, time: '2026-02-19 20:15', method: '微信支付' },
      { amount: 48, time: '2026-02-17 14:30', method: '支付宝' },
    ],
  },
  {
    userId: 'U-62918',
    attrTime: '2026-02-21 07:33:52',
    pid: 'PID-20260219-008',
    totalRecharge: 54,
    totalOrders: 2,
    lastActive: '2026-02-22 12:05',
    readHistory: [
      { title: '《甜蜜闪婚：总裁的心尖宠》', time: '2026-02-22 12:00' },
      { title: '《闪婚后大佬每天都在撩》', time: '2026-02-21 20:30' },
      { title: '《豪门千金归来》', time: '2026-02-21 15:10' },
    ],
    rechargeHistory: [
      { amount: 6, time: '2026-02-22 11:12', method: '抖音支付' },
      { amount: 48, time: '2026-02-21 15:15', method: '微信支付' },
    ],
  },
];

export default function UserStatsPage() {
  const [activePeriod, setActivePeriod] = useState('近7日');
  const [startDate, setStartDate] = useState('2026-02-17');
  const [endDate, setEndDate] = useState('2026-02-23');
  const [userSearch, setUserSearch] = useState('');
  const [pidFilter, setPidFilter] = useState('');
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (userId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleExport = () => {
    alert('导出功能仅供演示');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">用户统计</h1>
        <p className="page-subtitle">查看用户行为及充值详情</p>
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
          placeholder="搜索用户ID"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <input
          type="text"
          className="form-input"
          placeholder="来源PID筛选"
          value={pidFilter}
          onChange={(e) => setPidFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="dc-table-section">
        <div className="dc-table-header">
          <div className="dc-table-title">用户明细</div>
          <button className="dc-export-btn" onClick={handleExport}>
            导出 Excel
          </button>
        </div>
        <div className="dc-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}></th>
                <th>用户ID</th>
                <th>归因时间</th>
                <th>来源PID</th>
                <th className="text-right">累计充值</th>
                <th className="text-right">累计订单数</th>
                <th>最后活跃</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row) => (
                <React.Fragment key={row.userId}>
                  <tr
                    className="dc-expandable-row"
                    onClick={() => toggleRow(row.userId)}
                  >
                    <td>
                      <span className={`dc-expand-icon ${expandedRows[row.userId] ? 'open' : ''}`}>
                        &#x203A;
                      </span>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{row.userId}</td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.attrTime}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{row.pid}</td>
                    <td className="text-right dc-money">¥{row.totalRecharge.toLocaleString()}</td>
                    <td className="text-right">{row.totalOrders}</td>
                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.lastActive}</td>
                  </tr>
                  {expandedRows[row.userId] && (
                    <tr className="dc-expanded-content">
                      <td colSpan={7}>
                        <div className="dc-expanded-inner">
                          <div>
                            <div className="dc-expanded-section-title">
                              阅读历史
                            </div>
                            <ul className="dc-expanded-list">
                              {row.readHistory.map((item, i) => (
                                <li key={i}>
                                  <span>{item.title}</span>
                                  <span className="dc-expanded-list-meta">{item.time}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="dc-expanded-section-title">
                              充值记录
                            </div>
                            <ul className="dc-expanded-list">
                              {row.rechargeHistory.map((item, i) => (
                                <li key={i}>
                                  <span className="dc-money">¥{item.amount.toFixed(2)}</span>
                                  <span className="dc-expanded-list-meta">
                                    {item.time} / {item.method}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
            <button className="pagination-btn">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
