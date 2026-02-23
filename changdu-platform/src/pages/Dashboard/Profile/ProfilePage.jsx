import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import CustomerService from '../../../components/business/CustomerService';
import './Profile.css';

export default function ProfilePage() {
  const { user } = useAuth();

  // Editable profile fields (local state only)
  const [profileData, setProfileData] = useState({
    companyName: user?.company || '',
    userName: user?.name || '',
    role: user?.roleLabel || '集团账号',
    summary: '',
    teamSize: '',
    mainBusiness: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editDraft, setEditDraft] = useState({});

  const startEdit = () => {
    setEditDraft({ ...profileData });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditDraft({});
  };

  const saveEdit = () => {
    setProfileData({ ...editDraft });
    setIsEditing(false);
    setEditDraft({});
  };

  const handleViewContract = () => {
    alert('合同查看功能开发中，请联系客服获取合同副本。');
  };

  const handleViewFile = () => {
    alert('文件预览功能开发中，请联系客服获取文件副本。');
  };

  const handleReupload = () => {
    alert('文件上传功能开发中，请联系客服处理资质变更。');
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">企业信息</h1>
        <p className="page-subtitle">查看和管理企业入驻信息、合同及资质</p>
      </div>

      {/* Section 1: 入驻信息 */}
      <div className="card profile-section">
        <div className="profile-section-title">
          <span>入驻信息</span>
          {!isEditing ? (
            <button className="btn btn-outline btn-sm" onClick={startEdit}>
              编辑
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={cancelEdit}>
                取消
              </button>
              <button className="btn btn-primary btn-sm" onClick={saveEdit}>
                保存
              </button>
            </div>
          )}
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <div className="profile-info-label">公司名称</div>
            {isEditing ? (
              <input
                className="profile-edit-input"
                value={editDraft.companyName}
                onChange={(e) => setEditDraft({ ...editDraft, companyName: e.target.value })}
                placeholder="请输入公司名称"
              />
            ) : (
              <div className={`profile-info-value ${!profileData.companyName ? 'placeholder' : ''}`}>
                {profileData.companyName || '未设置'}
              </div>
            )}
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">联系人</div>
            {isEditing ? (
              <input
                className="profile-edit-input"
                value={editDraft.userName}
                onChange={(e) => setEditDraft({ ...editDraft, userName: e.target.value })}
                placeholder="请输入联系人姓名"
              />
            ) : (
              <div className={`profile-info-value ${!profileData.userName ? 'placeholder' : ''}`}>
                {profileData.userName || '未设置'}
              </div>
            )}
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">账号角色</div>
            <div className="profile-info-value">{profileData.role}</div>
          </div>
          <div className="profile-info-item">
            <div className="profile-info-label">团队规模</div>
            {isEditing ? (
              <input
                className="profile-edit-input"
                value={editDraft.teamSize}
                onChange={(e) => setEditDraft({ ...editDraft, teamSize: e.target.value })}
                placeholder="如：10-50人"
              />
            ) : (
              <div className={`profile-info-value ${!profileData.teamSize ? 'placeholder' : ''}`}>
                {profileData.teamSize || '未设置'}
              </div>
            )}
          </div>
          <div className="profile-info-item full-width">
            <div className="profile-info-label">集团简介</div>
            {isEditing ? (
              <input
                className="profile-edit-input"
                value={editDraft.summary}
                onChange={(e) => setEditDraft({ ...editDraft, summary: e.target.value })}
                placeholder="请输入集团简介"
              />
            ) : (
              <div className={`profile-info-value ${!profileData.summary ? 'placeholder' : ''}`}>
                {profileData.summary || '未设置'}
              </div>
            )}
          </div>
          <div className="profile-info-item full-width">
            <div className="profile-info-label">主营业务</div>
            {isEditing ? (
              <input
                className="profile-edit-input"
                value={editDraft.mainBusiness}
                onChange={(e) => setEditDraft({ ...editDraft, mainBusiness: e.target.value })}
                placeholder="如：短剧投放、网文推广"
              />
            ) : (
              <div className={`profile-info-value ${!profileData.mainBusiness ? 'placeholder' : ''}`}>
                {profileData.mainBusiness || '未设置'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: 合同信息 */}
      <div className="card profile-section">
        <div className="profile-section-title">
          <span>合同信息</span>
        </div>

        <div className="contract-info-grid">
          <div className="contract-info-item">
            <div className="contract-label">合同编号</div>
            <div className="contract-value">CD-2026-00001</div>
          </div>
          <div className="contract-info-item">
            <div className="contract-label">签约日期</div>
            <div className="contract-value">2026-01-15</div>
          </div>
          <div className="contract-info-item">
            <div className="contract-label">合同状态</div>
            <div className="contract-value">
              <span className="badge badge-success">生效中</span>
            </div>
          </div>
        </div>

        <div className="contract-actions">
          <button className="btn btn-outline btn-sm" onClick={handleViewContract}>
            查看合同
          </button>
        </div>
      </div>

      {/* Section 3: 资质文件 */}
      <div className="card profile-section">
        <div className="profile-section-title">
          <span>资质文件</span>
        </div>

        <div className="qual-file-row">
          <div className="qual-file-info">
            <div className="qual-file-icon">📄</div>
            <div>
              <div className="qual-file-name">代理授权书</div>
              <div className="qual-file-meta">代理授权书_测试科技.pdf</div>
            </div>
          </div>
          <div className="qual-file-actions">
            <button className="btn btn-outline btn-sm" onClick={handleViewFile}>
              查看
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleReupload}>
              重新上传
            </button>
          </div>
        </div>
      </div>

      <CustomerService />
    </div>
  );
}
