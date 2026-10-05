'use client';

import React from 'react';
import { Leaf, CheckCircle2, Phone, Globe, ShieldCheck, ArrowRight } from 'lucide-react';

export default function BrandShowcase({ onQuickFill }) {
  const features = [
    { title: "Quản lý trang trại & nông hộ", desc: "Giám sát diện tích, nhật ký đồng ruộng & nhân sự" },
    { title: "Truy xuất nguồn gốc QR Code", desc: "Minh bạch sản phẩm theo tiêu chuẩn VietGAP / GlobalGAP" },
    { title: "Dự báo sản lượng & mùa vụ", desc: "Lập kế hoạch thu hoạch & hoạch định doanh thu" },
    { title: "Chuỗi cung ứng & bán hàng", desc: "Kết nối kho bãi, đại lý và kênh phân phối đa kênh" }
  ];

  return (
    <div className="relative flex flex-col justify-between p-8 sm:p-10 lg:p-12 text-white h-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900/80 to-slate-950 border border-emerald-500/20 shadow-2xl">
      
      {/* Background Decorative Ambient Light Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Section: Brand Identity */}
      <div className="relative z-10 space-y-8">
        
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-3 bg-white/10 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 px-4 py-2 rounded-full shadow-lg">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <Leaf className="w-4 h-4 fill-current" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">
            L<span className="text-emerald-400">Farm</span>
          </span>
          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            OS v2.4
          </span>
        </div>

        {/* Hero Title Copy */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Nền Tảng Quản Lý <br />
            <span className="bg-gradient-to-r from-emerald-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
              Nông Nghiệp LFarm AI
            </span>
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
            Số hóa 100% quy trình trang trại, tối ưu năng suất canh tác và kết nối chuỗi cung ứng cho hơn <strong className="text-amber-300 font-bold">1.000+ nông hộ & thương lái</strong>.
          </p>
        </div>

        {/* Key Feature List */}
        <div className="space-y-3 pt-2">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-100 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-emerald-200/70">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Account Selector */}
      <div className="relative z-10 mt-8 p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-2.5">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Tài khoản Demo dùng thử:
          </span>
          <span className="text-[10px] text-emerald-300/80 font-mono">1-click tự động chọn</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onQuickFill('admin', '123456')}
            className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-left transition-all text-xs group"
          >
            <div>
              <div className="font-bold text-amber-300 group-hover:text-white transition-colors">Quản trị (Admin)</div>
              <div className="text-[10px] text-emerald-300/70 font-mono">admin / 123456</div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => onQuickFill('manager_agri', '123456')}
            className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-left transition-all text-xs group"
          >
            <div>
              <div className="font-bold text-amber-300 group-hover:text-white transition-colors">Quản lý (Manager)</div>
              <div className="text-[10px] text-emerald-300/70 font-mono">manager_agri / 123456</div>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 pt-6 mt-6 border-t border-emerald-500/20 flex flex-wrap items-center justify-between text-xs text-emerald-200/80 gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Hotline hỗ trợ: <strong className="text-white">1900 6129</strong> (0902 243 822)</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>lfarm.vn • lfarm.ai</span>
        </div>
      </div>

    </div>
  );
}
