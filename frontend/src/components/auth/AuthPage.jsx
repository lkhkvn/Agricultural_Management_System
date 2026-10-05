'use client';

import React, { useState, useEffect } from 'react';
import NextFarmLogo from './NextFarmLogo';
import { loginApi, registerApi } from '@/services/api';
import {
  Sun,
  Moon,
  QrCode,
  Globe,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Key,
  ShieldCheck,
  X,
  Check,
  Zap,
  Server
} from 'lucide-react';

export default function AuthPage({ initialRole, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [useMock, setUseMock] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState('VI');
  const [showCookie, setShowCookie] = useState(true);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Flow states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (initialRole === 'ROLE_ADMIN') {
      setUsername('admin');
      setPassword('123456');
      setSuccessMessage('Đã tự động chọn tài khoản Quản Trị Viên (Admin). Bấm "Tiếp tục" để đăng nhập.');
    } else if (initialRole === 'ROLE_TRADER') {
      setUsername('manager_agri');
      setPassword('123456');
      setSuccessMessage('Đã tự động chọn tài khoản Thương Lái (Manager). Bấm "Tiếp tục" để đăng nhập.');
    } else if (initialRole === 'ROLE_USER') {
      setUsername('nongdan01');
      setPassword('123456');
      setSuccessMessage('Đã tự động chọn tài khoản Nông Dân (User). Bấm "Tiếp tục" để đăng nhập.');
    }
  }, [initialRole]);

  const handleQuickFill = (demoUser, demoPass) => {
    setUsername(demoUser);
    setPassword(demoPass);
    setActiveTab('login');
    setError(null);
    setSuccessMessage(`Đã điền tự động tài khoản "${demoUser}". Bấm "Tiếp tục" để đăng nhập.`);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Vui lòng nhập Email hoặc Tên đăng nhập');
      return;
    }
    if (!password) {
      setError('Vui lòng nhập Mật khẩu');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await loginApi({ username: username.trim(), password }, useMock);
      setSession(res.data);
      setSuccessMessage(`${res.message || 'Đăng nhập thành công!'} Đang chuyển về Trang chủ...`);
      
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess(res.data);
        }, 800);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !username.trim() || !email.trim() || !password) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await registerApi({ fullName, username, email, password }, useMock);
      setSuccessMessage(`${res.message} Đang chuyển sang Đăng nhập...`);
      setTimeout(() => {
        setActiveTab('login');
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 relative flex flex-col justify-between p-4 sm:p-6 lg:p-8 ${
      isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-white text-slate-900'
    } font-[family-name:var(--font-plus-jakarta-sans)]`}>

      {/* Top Left Subtle Emerald Radial Glow */}
      {!isDarkMode && (
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-100/40 via-emerald-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Top Bar Header Navigation */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUseMock(!useMock)}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
              useMock
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
            }`}
            title="Chuyển chế độ Mock / Live API"
          >
            {useMock ? <Zap className="w-3.5 h-3.5 text-amber-500" /> : <Server className="w-3.5 h-3.5 text-emerald-500" />}
            <span>{useMock ? 'Demo Mode' : 'Live API'}</span>
          </button>
        </div>

        {/* Right Action Icons: Theme, QR, Language Switcher */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-sm hover:scale-105 transition-all"
            title="Đổi giao diện Sáng / Tối"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => alert("Chức năng Đăng nhập mã QR đang khởi tạo.")}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-sm hover:scale-105 transition-all"
            title="Đăng nhập mã QR"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setLang(lang === 'VI' ? 'EN' : 'VI')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:scale-105 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{lang}</span>
          </button>
        </div>
      </header>

      {/* Main Centered Card Container */}
      <main className="relative z-10 w-full max-w-md mx-auto my-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl relative overflow-hidden transition-all">

          {/* LFarm Logo Badge Header */}
          <div className="pt-2 pb-5">
            <NextFarmLogo size="lg" />
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {activeTab === 'login' ? 'Đăng nhập phân quyền' : 'Đăng ký tài khoản'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {activeTab === 'login'
                ? 'Số hoá trang trại miễn phí với LFarm AI'
                : 'Tạo tài khoản mới quản lý nông nghiệp số LFarm'}
            </p>
          </div>

          {/* Success / Error Alerts */}
          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Session Logged In View */}
          {session ? (
            <div className="py-4 space-y-4 text-center">
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  {session.fullName ? session.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">{session.fullName}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  @{session.username} • {session.email}
                </p>
                <div className="mt-3">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                    Quyền hạn: {session.role || 'ROLE_USER'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setSession(null); setSuccessMessage('Đã đăng xuất.'); }}
                className="w-full py-3 rounded-2xl border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 font-bold text-xs transition-all"
              >
                Đăng Xuất Đóng Phiên
              </button>
            </div>
          ) : (
            /* Auth Form */
            <form onSubmit={activeTab === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
              
              {/* Register Extra Fields */}
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Họ và tên <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                  />
                </div>
              )}

              {/* Username / Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {activeTab === 'login' ? 'Email hoặc Tên đăng nhập' : 'Tên đăng nhập'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="user@mail.com hoặc admin"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                />
              </div>

              {/* Email Field for Register */}
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email liên hệ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@company.com"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                  />
                </div>
              )}

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  {activeTab === 'login' && (
                    <a
                      href="#forgot"
                      onClick={(e) => { e.preventDefault(); alert("Liên hệ Admin LFarm để nhận lại mật khẩu."); }}
                      className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Quên mật khẩu?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Green Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm mt-3"
              >
                {loading ? (
                  'Đang xử lý...'
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" /> {activeTab === 'login' ? 'Tiếp tục' : 'Tạo Tài Khoản'}
                  </>
                )}
              </button>
            </form>
          )}

          {/* Social / Alternative Methods Divider */}
          {!session && (
            <>
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100 dark:border-slate-800" />
                </div>
                <span className="relative bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 font-medium">
                  Hoặc chọn quyền truy cập nhanh
                </span>
              </div>

              {/* Social & Demo Account Quick Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin', '123456')}
                  className="w-full py-2.5 px-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-3 transition-all shadow-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white font-black text-[10px] flex items-center justify-center">G</span>
                  <span>Đăng nhập Quản Trị Viên (Admin Demo)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('manager_agri', '123456')}
                  className="w-full py-2.5 px-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-3 transition-all shadow-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">f</span>
                  <span>Đăng nhập Thương Lái (Trader Demo)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('nongdan01', '123456')}
                  className="w-full py-2.5 px-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-3 transition-all shadow-sm"
                >
                  <Key className="w-4 h-4 text-emerald-600" />
                  <span>Đăng nhập Nông Dân (User Demo)</span>
                </button>
              </div>

              {/* Bottom Switcher Link */}
              <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                {activeTab === 'login' ? (
                  <>
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => { setActiveTab('register'); setError(null); }}
                      className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Đăng ký ngay
                    </button>
                  </>
                ) : (
                  <>
                    Đã có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => { setActiveTab('login'); setError(null); }}
                      className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Đăng nhập ngay
                    </button>
                  </>
                )}
              </div>
            </>
          )}

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 text-center text-[11px] text-slate-400 py-2">
        LFarm AI OS © 2026 • Nền Tảng Nông Nghiệp Số Thông Minh
      </footer>

      {/* Floating Bottom-Right Cookie Consent Banner */}
      {showCookie && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Chúng tôi dùng cookie cần thiết để vận hành và bảo mật trang. Một số cookie bổ sung giúp cải thiện trải nghiệm và phân tích sử dụng.
            </p>
            <button
              type="button"
              onClick={() => setShowCookie(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => setShowCookie(false)}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5" /> Chấp nhận tất cả
            </button>

            <button
              type="button"
              onClick={() => setShowCookie(false)}
              className="w-full py-2 px-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <X className="w-3.5 h-3.5" /> Từ chối cookie bổ sung
            </button>

            <div className="text-center pt-1">
              <a
                href="#privacy"
                onClick={(e) => { e.preventDefault(); alert("Chính sách bảo mật quyền riêng tư LFarm."); }}
                className="text-[11px] text-slate-400 hover:text-emerald-600 underline"
              >
                Chính sách quyền riêng tư
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
