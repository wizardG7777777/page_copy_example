import React, { useState } from 'react';

export default function CustomerService() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
      {open && (
        <div style={{
          position: 'absolute',
          bottom: 56,
          right: 0,
          width: 300,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          padding: 20,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 15 }}>在线客服</div>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
            工作时间: 周一至周五 9:00-18:00
          </p>
          <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
            邮箱: support@changdu.com
          </p>
          <p style={{ fontSize: 13, color: '#6b7280' }}>
            客服热线: 400-000-0000
          </p>
          <div
            style={{ position: 'absolute', top: 12, right: 12, cursor: 'pointer', fontSize: 18, color: '#9ca3af' }}
            onClick={() => setOpen(false)}
          >
            ×
          </div>
        </div>
      )}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'var(--primary-color)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 20,
          boxShadow: '0 2px 12px rgba(59,130,246,0.4)',
        }}
      >
        💬
      </div>
    </div>
  );
}
