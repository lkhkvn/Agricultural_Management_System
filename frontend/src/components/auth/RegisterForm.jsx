'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Sprout, Truck, ArrowRight } from 'lucide-react';

export default function RegisterForm({ onSubmit, loading, error, successMessage }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_USER'); // 'ROLE_USER' (Nông dân) hoặc 'ROLE_TRADER' (Thương lái)
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Họ tên không được để trống';
    if (!username.trim()) errs.username = 'Tên đăng nhập không được để trống';
    if (!email.trim()) errs.email = 'Email không được để trống';
    if (!password || password.length < 6) errs.password = 'Mật khẩu tối thiểu 6 ký tự';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        fullName: fullName.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
        role
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Alert Thông Báo */}
      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Chọn Vai Trò Tài Khoản */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Loại tài khoản đăng ký <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setRole('ROLE_USER')}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              role === 'ROLE_USER'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600'
            }`}
          >
            <Sprout className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs font-bold">Nông Dân</div>
              <div className="text-[10px] text-slate-400">Quản lý trang trại</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole('ROLE_TRADER')}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              role === 'ROLE_TRADER'
                ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 font-bold'
                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600'
            }`}
          >
            <Truck className="w-5 h-5 text-amber-500" />
            <div>
              <div className="text-xs font-bold">Thương Lái</div>
              <div className="text-[10px] text-slate-400">Thu mua nông sản</div>
            </div>
          </button>
        </div>
      </div>

      {/* Họ tên */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Họ và tên</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm"
        />
      </div>

      {/* Username & Email */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tên đăng nhập</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@company.com"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mật khẩu</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded-xl text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2"
      >
        {loading ? 'Đang tạo...' : <>Tạo Tài Khoản <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}
