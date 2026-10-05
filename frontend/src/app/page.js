'use client';

import React, { useState } from 'react';
import RiceDashboard from '@/components/home/RiceDashboard';
import AuthPage from '@/components/auth/AuthPage';

export default function Home() {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'auth'
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleGoToAuth = (role) => {
    if (role) setSelectedRole(role);
    setView('auth');
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setView('dashboard'); // Chuyển ngay về Trang Chủ sau khi Đăng Nhập thành công!
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
  };

  return (
    <main>
      {view === 'dashboard' ? (
        <RiceDashboard
          onGoToAuth={handleGoToAuth}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      ) : (
        <div>
          {/* Top Bar Button to Return to Home Dashboard */}
          <div className="bg-slate-900 px-4 py-2 flex items-center justify-between text-xs text-white">
            <span className="font-bold text-emerald-400">Cổng Đăng Nhập & Phân Quyền LFarm AI</span>
            <button
              onClick={() => setView('dashboard')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-sm"
            >
              ← Trở Về Trang Chủ Quản Lý Lúa
            </button>
          </div>
          <AuthPage
            initialRole={selectedRole}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      )}
    </main>
  );
}
