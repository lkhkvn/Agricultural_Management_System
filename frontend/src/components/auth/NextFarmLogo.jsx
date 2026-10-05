'use client';

import React from 'react';

export default function NextFarmLogo({ size = "md" }) {
  const iconSize = size === "lg" ? "w-16 h-16" : size === "sm" ? "w-8 h-8" : "w-12 h-12";
  const titleSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Custom Modern LFarm SVG Emblem Badge */}
      <div className={`relative ${iconSize} mb-2.5 flex items-center justify-center transition-transform hover:scale-105 duration-300`}>
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="lfarmBgGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="0.5" stopColor="#059669" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="lfarmLeafLeft" x1="20" y1="55" x2="45" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="1" stopColor="#A7F3D0" />
            </linearGradient>
            <linearGradient id="lfarmLeafRight" x1="60" y1="55" x2="35" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="lfarmGold" x1="30" y1="20" x2="50" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Outer Rounded Shield Badge Container */}
          <rect x="6" y="6" width="68" height="68" rx="22" fill="url(#lfarmBgGrad)" />
          <rect x="7" y="7" width="66" height="66" rx="21" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" fill="none" />

          {/* Left Leaf Curve forming 'L' Accent */}
          <path
            d="M 22 56 C 20 40, 24 24, 42 16 C 42 16, 44 34, 28 54 Z"
            fill="url(#lfarmLeafLeft)"
          />

          {/* Right Leaf Curve */}
          <path
            d="M 58 56 C 60 40, 56 24, 38 16 C 38 16, 36 34, 52 54 Z"
            fill="url(#lfarmLeafRight)"
          />

          {/* Center Golden Growth Stem & L Stylized Node */}
          <path d="M 40 58 V 28" stroke="url(#lfarmGold)" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="40" cy="23" r="3.5" fill="#FBBF24" />
          <path d="M 40 38 L 48 32" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 40 46 L 32 40" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Name Text Header: LFarm AI */}
      <div className="flex items-center justify-center gap-1.5">
        <span className={`font-black ${titleSize} tracking-tight text-slate-900 dark:text-white font-[family-name:var(--font-outfit)]`}>
          L<span className="text-emerald-600 dark:text-emerald-400">Farm</span>
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white font-black text-[10px] tracking-wider uppercase shadow-sm">
          AI
        </span>
      </div>
      <p className="text-[10px] uppercase font-bold tracking-[0.22em] text-emerald-600 dark:text-emerald-400 mt-0.5">
        Smart Agriculture OS
      </p>
    </div>
  );
}
