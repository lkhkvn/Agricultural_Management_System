'use client';

import React from 'react';
import Link from 'next/link';
import AgriWeatherDashboard from '@/components/weather/AgriWeatherDashboard';

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-all border border-emerald-200/80 flex items-center gap-1.5"
          >
            ← Trở Về Trang Chủ LFarm AI
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-bold text-slate-700">Dự Báo Thời Tiết Nông Nghiệp Realtime</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-8">
        <AgriWeatherDashboard />
      </main>
    </div>
  );
}
