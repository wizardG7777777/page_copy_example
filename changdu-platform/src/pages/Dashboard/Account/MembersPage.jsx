import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import './Account.css';

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 10; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

function formatDateTime(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function MembersPage() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '主管',
    phone: '',
  });
  const [generatedPwd, setGeneratedPwd] = useState('');

  const openAddModal = () => {
    const pwd = generatePassword();
    setGeneratedPwd(pwd);
    setFormData({ name: '', role: '主管', phone: '' });
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setFormData({ name: '', role: '主管', phone: '' });
    setGeneratedPwd('');
  };

  const handleAddMember = () => {
    if (!formData.name.trim()) {
      alert('请输入账号名');
      return;
    }
    if (!formData.phone.trim()) {
      alert('请输入手机号');
      return;
    }
    const newMember = {
      id: 'member-' + Date.now(),
      name: formData.name.trim(),
      role: formData.role,
      phone: formData.phone.trim(),
      password: generatedPwd,
      createdAt: new Date().toISOString(),
      active: true,
    };
    setMembers((prev) => [...prev, newMember]);
    closeAddModal();
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      phone: member.phone,
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingMember(null);
  };

  const handleEditMember = () => {
    if (!formData.name.trim()) {
      alert('请输入账号名');
      return;
    }
    if (!formData.phone.trim()) {
      alert('请输入手机号');
      return;
    }
    setMembers((prev) =>
      prev.map((m) =>
        m.id === editingMember.id
          ? { ...m, name: formData.name.trim(), role: formData.role, phone: formData.phone.trim() }
          : m
      )
    );
    closeEditModal();
  };

  const toggleMemberStatus = (id) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">成员管理</h1>
        <p className="page-subtitle">管理团队成员，分配角色与权限</p>
      </div>

      {/* Hierarchy view */}
      <div className="card account-hierarchy">
        <div className="hierarchy-root">
          <div className="hierarchy-avatar admin">
            {user?.name?.charAt(0) || '管'}
          </div>
          <div className="hierarchy-info">
            <div className="hierarchy-name">{user?.name || '当前用户'}</div>
            <div className="hierarchy-role">{user?.roleLabel || '集团账号'} · {user?.company || '未设置公司'}</div>
          </div>
          <span className="hierarchy-badge">当前账号</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            共 {members.length} 名成员
          </span>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={openAddModal}>
            + 添加成员
          </button>
        </div>
      </div>

      {/* Members table */}
      <div className="card" style={{ padding: 0 }}>
        {members.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <div className="empty-state-text">
              暂无团队成员，点击「添加成员」开始组建团队
            </div>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>账号名</th>
                <th>角色</th>
                <th>手机号</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        className={`hierarchy-avatar ${m.role === '主管' ? 'manager' : 'caster'}`}
                        style={{ width: 28, height: 28, fontSize: 12 }}
                      >
                        {m.name.charAt(0)}
                      </div>
                      {m.name}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${m.role === '主管' ? 'badge-warning' : 'badge-info'}`}>
                      {m.role}
                    </span>
                  </td>
                  <td>{m.phone}</td>
                  <td>{formatDateTime(m.createdAt)}</td>
                  <td>
                    <span className={`badge ${m.active ? 'badge-success' : 'badge-danger'}`}>
                      {m.active ? '启用' : '停用'}
                    </span>
                  </td>
                  <td>
                    <div className="account-table-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openEditModal(m)}>
                        编辑
                      </button>
                      <button
                        className={`btn btn-sm ${m.active ? 'btn-danger' : 'btn-primary'}`}
                        onClick={() => toggleMemberStatus(m.id)}
                      >
                        {m.active ? '停用' : '启用'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeAddModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">添加成员</h3>
              <button className="modal-close" onClick={closeAddModal}>&times;</button>
            </div>
            <div className="form-group">
              <label className="form-label">账号名</label>
              <input
                className="form-input"
                placeholder="请输入成员账号名"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">角色</label>
              <select
                className="form-select"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="主管">主管</option>
                <option value="投手">投手</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">手机号</label>
              <input
                className="form-input"
                placeholder="请输入手机号"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">初始密码</label>
              <div className="password-display">{generatedPwd}</div>
              <div className="password-display-label">系统自动生成，请妥善保存并告知成员</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeAddModal}>取消</button>
              <button className="btn btn-primary" onClick={handleAddMember}>确认添加</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && editingMember && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">编辑成员</h3>
              <button className="modal-close" onClick={closeEditModal}>&times;</button>
            </div>
            <div className="form-group">
              <label className="form-label">账号名</label>
              <input
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">角色</label>
              <select
                className="form-select"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="主管">主管</option>
                <option value="投手">投手</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">手机号</label>
              <input
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeEditModal}>取消</button>
              <button className="btn btn-primary" onClick={handleEditMember}>保存修改</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
