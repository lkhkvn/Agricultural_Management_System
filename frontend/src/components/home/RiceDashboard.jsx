'use client';

import React, { useState } from 'react';
import NextFarmLogo from '../auth/NextFarmLogo';
import AgriWeatherDashboard from '../weather/AgriWeatherDashboard';
import {
  Sprout,
  Droplets,
  Bug,
  TrendingUp,
  Sun,
  CloudRain,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Truck,
  User,
  LogOut,
  ChevronDown,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export default function RiceDashboard({ onGoToAuth, currentUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'weather' | 'fields' | 'market' | 'pests'
  const [selectedField, setSelectedField] = useState('field-1');
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // Sample Rice Varieties & Prices in Mekong Delta
  const ricePrices = [
    { code: 'ST25', name: 'Lúa ST25 (Hạt Ngọc)', price: '9.800 - 10.200 đ/kg', change: '+200 đ', isUp: true, region: 'An Giang / Sóc Trăng' },
    { code: 'DT8', name: 'Lúa Đài Thơm 8', price: '8.000 - 8.300 đ/kg', change: '+150 đ', isUp: true, region: 'Đồng Tháp / Cần Thơ' },
    { code: 'OM18', name: 'Lúa OM18', price: '7.800 - 8.100 đ/kg', change: '+100 đ', isUp: true, region: 'Kiên Giang / Long An' },
    { code: 'IR504', name: 'Lúa IR50404 (Tươi)', price: '7.300 - 7.500 đ/kg', change: '0 đ', isUp: false, region: 'Tiền Giang' },
  ];

  // Paddy Field List
  const paddyFields = [
    {
      id: 'field-1',
      name: 'Thửa Ruộng A1 - Cánh Đồng Lớn',
      area: '3.5 Ha',
      variety: 'ST25 (Thượng Hạng)',
      stage: 'Đẻ nhánh - Làm đòng',
      days: '42 / 95 ngày',
      waterLevel: '5.5 cm (Đạt chuẩn AWD)',
      health: 'Rất tốt (98%)',
      alerts: 0,
      predictedYield: '8.8 Tấn/Ha',
      harvestDate: '15/11/2026'
    },
    {
      id: 'field-2',
      name: 'Thửa Ruộng B2 - Bờ Nam Hợp Tác Xã',
      area: '2.8 Ha',
      variety: 'Đài Thơm 8',
      stage: 'Trổ bông chắc hạt',
      days: '68 / 90 ngày',
      waterLevel: '3.0 cm (Rút nước phơi ruộng)',
      health: 'Chú ý sâu hại',
      alerts: 1,
      predictedYield: '8.2 Tấn/Ha',
      harvestDate: '28/10/2026'
    },
    {
      id: 'field-3',
      name: 'Thửa Ruộng C5 - Đô Thị Nông Nghiệp',
      area: '5.0 Ha',
      variety: 'OM18',
      stage: 'Mạ / Gieo sạ',
      days: '14 / 95 ngày',
      waterLevel: '2.0 cm',
      health: 'Tốt (95%)',
      alerts: 0,
      predictedYield: '8.5 Tấn/Ha',
      harvestDate: '20/12/2026'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-[family-name:var(--font-plus-jakarta-sans)]">
      
      {/* Clean Minimalist Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="scale-95 origin-left">
            <NextFarmLogo size="sm" />
          </div>

          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            {[
              { id: 'overview', label: 'Tổng quan ruộng lúa' },
              { id: 'weather', label: '☀️ Dự báo thời tiết' },
              { id: 'fields', label: 'Danh sách thửa ruộng' },
              { id: 'market', label: 'Bảng giá lúa & Thương lái' },
              { id: 'pests', label: 'Cảnh báo sâu bệnh AI' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Header Actions & Account Status */}
        <div className="flex items-center gap-3 relative">
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Nắng ráo 31°C • Độ ẩm 72%</span>
          </div>

          {/* Account Status Header Widget */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2 text-xs font-bold">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span>{currentUser.fullName}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[10px] uppercase">
                  {currentUser.role || 'ROLE_USER'}
                </span>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition-all text-xs font-bold flex items-center gap-1"
                title="Đăng xuất khỏi tài khoản"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thoát</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-white" />
                <span>Tài Khoản / Đăng Nhập</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Dropdown Menu */}
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Chọn Quyền Đăng Nhập
                  </div>

                  <button
                    onClick={() => { setShowAccountMenu(false); onGoToAuth && onGoToAuth('ROLE_USER'); }}
                    className="w-full p-2.5 rounded-xl hover:bg-emerald-50 text-left flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Sprout className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-700">Tài Khoản Nông Dân</div>
                      <div className="text-[10px] text-slate-400 font-medium">Quản lý thửa ruộng & mùa vụ</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setShowAccountMenu(false); onGoToAuth && onGoToAuth('ROLE_TRADER'); }}
                    className="w-full p-2.5 rounded-xl hover:bg-amber-50 text-left flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 group-hover:text-amber-700">Tài Khoản Thương Lái</div>
                      <div className="text-[10px] text-slate-400 font-medium">Đặt mua & thu mua lúa tươi</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { setShowAccountMenu(false); onGoToAuth && onGoToAuth('ROLE_ADMIN'); }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-100 text-left flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Tài Khoản Quản Trị</div>
                      <div className="text-[10px] text-slate-400 font-medium">Quản lý toàn bộ hệ thống</div>
                    </div>
                  </button>

                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <button
                      onClick={() => { setShowAccountMenu(false); onGoToAuth && onGoToAuth(); }}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Vào Trang Đăng Nhập Chi Tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </header>

      {/* Logged-In User Banner Welcome Toast */}
      {currentUser && (
        <div className="bg-emerald-900 text-white py-2.5 px-4 sm:px-8 border-b border-emerald-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Xin chào <strong className="text-amber-300 font-bold">{currentUser.fullName}</strong>! Bạn đang làm việc với quyền <strong className="text-emerald-200 uppercase font-mono">{currentUser.role || 'ROLE_USER'}</strong>.
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-[11px] text-emerald-200 hover:text-white underline font-semibold"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-8 space-y-8">
        
        {activeTab === 'weather' ? (
          <AgriWeatherDashboard />
        ) : (
          <>
            {/* Section 1: Rice Crop Stages Progress Tracker */}
            <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">4 Giai Đoạn Sinh Trưởng Cây Lúa</h2>
              <p className="text-xs text-slate-500">Giám sát tiến độ phát triển từ gieo sạ tới thu hoạch</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Vụ Mùa: Hè Thu 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Mạ / Gieo Sạ', range: '0 - 20 ngày', status: 'Hoàn thành', active: false, desc: 'Làm đất, xử lý hạt giống & giữ mực nước 1-2cm' },
              { step: '2', title: 'Đẻ Nhánh - Làm Đòng', range: '20 - 50 ngày', status: 'Đang diễn ra', active: true, desc: 'Bón phân đợt 2, điều tiết phơi ruộng rút nước AWD' },
              { step: '3', title: 'Trổ Bông - Chắc Hạt', range: '50 - 80 ngày', status: 'Sắp tới', active: false, desc: 'Phòng trừ đạo ôn cổ bông, giữ ẩm chân ruộng' },
              { step: '4', title: 'Chín & Thu Hoạch', range: '80 - 100 ngày', status: 'Chờ thu hoạch', active: false, desc: 'Rút nước trước 10 ngày, liên kết máy gặt đập' }
            ].map((stage, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  stage.active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center ${
                    stage.active ? 'bg-white text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {stage.step}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    stage.active ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {stage.status}
                  </span>
                </div>
                <h3 className="font-bold text-sm">{stage.title}</h3>
                <p className={`text-xs mt-0.5 font-medium ${stage.active ? 'text-emerald-100' : 'text-slate-500'}`}>{stage.range}</p>
                <p className={`text-xs mt-2.5 leading-relaxed ${stage.active ? 'text-emerald-50' : 'text-slate-600'}`}>{stage.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Paddy Field Interactive Manager */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Chi Tiết Thửa Ruộng Canh Tác</h2>
              <p className="text-xs text-slate-500">Bấm chọn từng thửa ruộng để xem mực nước, sâu bệnh & tiến độ thu hoạch</p>
            </div>

            {/* Field Selector Tabs */}
            <div className="flex items-center gap-2">
              {paddyFields.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedField(f.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedField === f.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {f.name.split('-')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Field Card Detail */}
          {(() => {
            const field = paddyFields.find(f => f.id === selectedField) || paddyFields[0];
            return (
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Left: Info */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                        {field.variety}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">• Diện tích: {field.area}</span>
                    </div>
                    {field.alerts > 0 ? (
                      <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Có {field.alerts} cảnh báo sâu bệnh
                      </span>
                    ) : (
                      <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ruộng lúa khỏe mạnh
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">{field.name}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] text-slate-500 font-medium">Giai đoạn cây lúa</div>
                      <div className="font-bold text-sm text-slate-900 mt-0.5">{field.stage}</div>
                      <div className="text-[10px] text-emerald-600 font-bold mt-1">{field.days}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] text-slate-500 font-medium">Cảm biến mực nước</div>
                      <div className="font-bold text-sm text-slate-900 mt-0.5">{field.waterLevel}</div>
                      <div className="text-[10px] text-blue-600 font-bold mt-1">Chuẩn ngập khô xen kẽ</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] text-slate-500 font-medium">Dự kiến thu hoạch</div>
                      <div className="font-bold text-sm text-slate-900 mt-0.5">{field.harvestDate}</div>
                      <div className="text-[10px] text-amber-600 font-bold mt-1">Dự báo: {field.predictedYield}</div>
                    </div>
                  </div>
                </div>

                {/* Right: Smart Management Action Box */}
                <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Tác Vụ Canh Tác Lúa</span>
                    <span className="text-[10px] text-slate-400">IoT Realtime</span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => alert(`Đã kích hoạt van xả nước thông minh cho ${field.name}`)}
                      className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-left flex items-center justify-between transition-colors text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-400" /> Điều tiết mực nước ruộng lúa
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => alert(`Mở camera AI quét sâu rầy cho ${field.name}`)}
                      className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-left flex items-center justify-between transition-colors text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <Bug className="w-4 h-4 text-rose-400" /> Quét AI chẩn đoán sâu cuốn lá & đạo ôn
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => onGoToAuth && onGoToAuth('ROLE_TRADER')}
                      className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-left flex items-center justify-between transition-colors text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-400" /> Gửi thông tin bán lúa cho Thương lái
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })()}
        </section>
          </>
        )}

      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200/80 text-slate-500 py-6 px-4 sm:px-8 text-xs mt-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <span className="text-emerald-700">LFarm AI</span>
            <span>•</span>
            <span className="font-normal text-slate-600">Giải Pháp Quản Lý Lúa Nước Số 1 Việt Nam</span>
          </div>

          <div>
            LFarm AI © 2026 • Hợp tác cùng các Hợp tác xã & Nông hộ Đồng bằng Sông Cửu Long.
          </div>
        </div>
      </footer>

    </div>
  );
}
