import React, { useState } from 'react';
import './Settlement.css';

const INITIAL_BILLS = [
  {
    id: 'bill-202601',
    period: '2026年1月',
    totalAmount: 128350,
    shareRatio: 0.6,
    shareAmount: 77010,
    status: '待确认',
    details: [
      { name: '都市逆袭之路', rechargeAmount: 45200, shareRatio: 0.6, shareAmount: 27120 },
      { name: '重生千金不好惹', rechargeAmount: 38600, shareRatio: 0.6, shareAmount: 23160 },
      { name: '穿越之王妃养成记', rechargeAmount: 28750, shareRatio: 0.6, shareAmount: 17250 },
      { name: '修仙归来当奶爸', rechargeAmount: 15800, shareRatio: 0.6, shareAmount: 9480 },
    ],
  },
  {
    id: 'bill-202512',
    period: '2025年12月',
    totalAmount: 96200,
    shareRatio: 0.6,
    shareAmount: 57720,
    status: '已确认',
    details: [
      { name: '霸道总裁的小甜妻', rechargeAmount: 36800, shareRatio: 0.6, shareAmount: 22080 },
      { name: '战神归来', rechargeAmount: 32400, shareRatio: 0.6, shareAmount: 19440 },
      { name: '农门福女有空间', rechargeAmount: 27000, shareRatio: 0.6, shareAmount: 16200 },
    ],
  },
  {
    id: 'bill-202511',
    period: '2025年11月',
    totalAmount: 142800,
    shareRatio: 0.6,
    shareAmount: 85680,
    status: '已结算',
    details: [
      { name: '重生之最强女首富', rechargeAmount: 52000, shareRatio: 0.6, shareAmount: 31200 },
      { name: '绝世神医在都市', rechargeAmount: 43800, shareRatio: 0.6, shareAmount: 26280 },
      { name: '甜蜜婚令：老公请签收', rechargeAmount: 28500, shareRatio: 0.6, shareAmount: 17100 },
      { name: '逆天邪神', rechargeAmount: 18500, shareRatio: 0.6, shareAmount: 11100 },
    ],
  },
];

function formatMoney(n) {
  return '¥' + n.toLocaleString('zh-CN');
}

function getStatusBadge(status) {
  switch (status) {
    case '待确认':
      return 'badge-warning';
    case '已确认':
      return 'badge-info';
    case '已结算':
      return 'badge-success';
    default:
      return 'badge-info';
  }
}

export default function BillsPage() {
  const [bills, setBills] = useState(INITIAL_BILLS);
  const [periodFilter, setPeriodFilter] = useState('全部');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [expandedBills, setExpandedBills] = useState({});

  const toggleExpand = (id) => {
    setExpandedBills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmBill = (id) => {
    if (!window.confirm('确认此账单后，状态将更新为「已确认」。是否继续？')) return;
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: '已确认' } : b))
    );
  };

  const handleExport = () => {
    alert('Excel 导出功能开发中，请稍后再试。');
  };

  const periods = ['全部', ...INITIAL_BILLS.map((b) => b.period)];

  const filteredBills = bills.filter((b) => {
    if (periodFilter !== '全部' && b.period !== periodFilter) return false;
    if (statusFilter !== '全部' && b.status !== statusFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">账单管理</h1>
        <p className="page-subtitle">查看和确认分销结算账单</p>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <select
          className="form-select"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
        >
          {periods.map((p) => (
            <option key={p} value={p}>{p === '全部' ? '全部周期' : p}</option>
          ))}
        </select>
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="全部">全部状态</option>
          <option value="待确认">待确认</option>
          <option value="已确认">已确认</option>
          <option value="已结算">已结算</option>
        </select>
        <div style={{ flex: 1 }} />
        <button className="btn btn-outline" onClick={handleExport}>
          导出 Excel
        </button>
      </div>

      {/* Bills table */}
      <div className="card" style={{ padding: 0 }}>
        {filteredBills.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📄</div>
            <div className="empty-state-text">暂无符合条件的账单</div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>账单周期</th>
                <th>总金额</th>
                <th>分成金额</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <React.Fragment key={bill.id}>
                  <tr className="bill-detail-toggle" onClick={() => toggleExpand(bill.id)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className={`bill-expand-icon ${expandedBills[bill.id] ? 'open' : ''}`}>
                          &#9654;
                        </span>
                        {bill.period}
                      </div>
                    </td>
                    <td>
                      <span className="bill-amount">{formatMoney(bill.totalAmount)}</span>
                    </td>
                    <td>
                      <span className="bill-share-amount">{formatMoney(bill.shareAmount)}</span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(bill.status)}`}>
                        {bill.status}
                      </span>
                    </td>
                    <td>
                      <div className="settlement-table-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => toggleExpand(bill.id)}
                        >
                          {expandedBills[bill.id] ? '收起明细' : '查看明细'}
                        </button>
                        {bill.status === '待确认' && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => confirmBill(bill.id)}
                          >
                            确认
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedBills[bill.id] && (
                    <tr className="bill-detail-row">
                      <td colSpan={5}>
                        <div className="bill-detail-inner">
                          <table className="bill-detail-table">
                            <thead>
                              <tr>
                                <th>内容名称</th>
                                <th>充值金额</th>
                                <th>分成比例</th>
                                <th>分成金额</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bill.details.map((d, idx) => (
                                <tr key={idx}>
                                  <td>{d.name}</td>
                                  <td>{formatMoney(d.rechargeAmount)}</td>
                                  <td>{(d.shareRatio * 100).toFixed(0)}%</td>
                                  <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>
                                    {formatMoney(d.shareAmount)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
