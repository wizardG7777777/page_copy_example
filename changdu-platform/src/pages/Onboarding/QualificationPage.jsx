import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './QualificationPage.css';

export default function QualificationPage() {
  const navigate = useNavigate();
  const { updateOnboardingStatus } = useAuth();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleRemoveFile = useCallback((e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleZoneClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSubmit = useCallback(() => {
    setShowSuccess(true);
  }, []);

  // Navigate to dashboard after showing success modal
  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(() => {
      updateOnboardingStatus('completed');
      navigate('/dashboard');
    }, 2000);
    return () => clearTimeout(timer);
  }, [showSuccess, updateOnboardingStatus, navigate]);

  return (
    <div className="qualification-page">
      <div className="qualification-card">
        <h3 className="qualification-title">资质授权</h3>
        <p className="qualification-desc">请上传代理授权书，完成最后一步资质认证</p>

        <div className="qualification-instructions">
          <p className="qualification-instructions-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            上传要求
          </p>
          <ul>
            <li>支持 PDF、JPG、PNG 格式</li>
            <li>文件大小不超过 10MB</li>
            <li>请确保文件内容清晰可辨</li>
            <li>授权书需加盖公司公章</li>
          </ul>
        </div>

        <div
          className="qualification-template"
          onClick={() => {/* fake download */}}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && undefined}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          下载代理授权书模板
        </div>

        <div
          className={`upload-zone${selectedFile ? ' has-file' : ''}${isDragging ? ' hover' : ''}`}
          onClick={handleZoneClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleZoneClick()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="upload-zone-input"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {selectedFile ? (
            <>
              <div className="upload-zone-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p className="upload-zone-text">文件已选择</p>
              <div className="upload-file-info">
                <span className="upload-file-name">{selectedFile.name}</span>
                <button
                  type="button"
                  className="upload-file-remove"
                  onClick={handleRemoveFile}
                >
                  移除
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="upload-zone-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="upload-zone-text">点击或拖拽文件到此处上传</p>
              <p className="upload-zone-hint">支持 PDF、JPG、PNG，不超过 10MB</p>
            </>
          )}
        </div>

        <div className="qualification-footer">
          <button
            className="btn btn-primary"
            type="button"
            disabled={!selectedFile}
            onClick={handleSubmit}
          >
            提交
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-modal-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="success-modal-title">提交成功！</h3>
            <p className="success-modal-message">恭喜您完成全部入驻流程，即将跳转至工作台...</p>
          </div>
        </div>
      )}
    </div>
  );
}
