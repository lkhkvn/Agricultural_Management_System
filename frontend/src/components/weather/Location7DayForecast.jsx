'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Clock,
  RefreshCw,
  Sparkles,
  Compass,
  Zap,
  Info,
  CheckCircle2,
  X,
  History,
  Sprout
} from 'lucide-react';

// Popular Agricultural Cities / Provinces in Vietnam for quick selection
const POPULAR_LOCATIONS = [
  { name: 'Cần Thơ', admin1: 'Thành phố Cần Thơ', country: 'Việt Nam', latitude: 10.0452, longitude: 105.7469 },
  { name: 'Đà Lạt', admin1: 'Lâm Đồng', country: 'Việt Nam', latitude: 11.9404, longitude: 108.4583 },
  { name: 'An Giang (Long Xuyên)', admin1: 'An Giang', country: 'Việt Nam', latitude: 10.3853, longitude: 105.4262 },
  { name: 'Mỹ Tho (Tiền Giang)', admin1: 'Tiền Giang', country: 'Việt Nam', latitude: 10.3556, longitude: 106.3625 },
  { name: 'Sóc Trăng', admin1: 'Sóc Trăng', country: 'Việt Nam', latitude: 9.6033, longitude: 105.9800 },
  { name: 'Đồng Nai (Biên Hòa)', admin1: 'Đồng Nai', country: 'Việt Nam', latitude: 10.9574, longitude: 106.8427 },
  { name: 'Hà Nội', admin1: 'Thành phố Hà Nội', country: 'Việt Nam', latitude: 21.0285, longitude: 105.8542 },
  { name: 'TP. Hồ Chí Minh', admin1: 'TP. Hồ Chí Minh', country: 'Việt Nam', latitude: 10.7626, longitude: 106.6602 },
];

export default function Location7DayForecast() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [selectedLocation, setSelectedLocation] = useState(POPULAR_LOCATIONS[0]);
  const [forecastData, setForecastData] = useState(null);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [forecastError, setForecastError] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Geocoding Search via Open-Meteo API
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery.trim()
        )}&count=8&language=vi&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setSearchResults(data.results);
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } catch (err) {
        console.error('Lỗi tìm kiếm địa điểm:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch 7-Day Weather Forecast for selectedLocation
  const fetch7DayForecast = useCallback(async (lat, lon) => {
    setLoadingForecast(true);
    setForecastError(null);
    try {
      const cleanLat = Number(lat).toFixed(4);
      const cleanLon = Number(lon).toFixed(4);
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cleanLat}&longitude=${cleanLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,et0_fao_evapotranspiration&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_probability_max,wind_speed_10m_max,et0_fao_evapotranspiration&timezone=Asia%2FHo_Chi_Minh`;
      
      const res = await fetch(url);
      if (!res.ok) {
        // Fallback fetch with minimal core params if optional params fail
        const fallbackUrl = `https://api.open-meteo.com/v1/forecast?latitude=${cleanLat}&longitude=${cleanLon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Asia%2FHo_Chi_Minh`;
        const fbRes = await fetch(fallbackUrl);
        if (!fbRes.ok) throw new Error('Không thể tải dữ liệu thời tiết cho tọa độ này.');
        const fbData = await fbRes.json();
        setForecastData(fbData);
        return;
      }
      
      const data = await res.json();
      setForecastData(data);
    } catch (err) {
      console.error('Lỗi khi tải dự báo 7 ngày:', err);
      setForecastError('Đang cập nhật lại dữ liệu từ trạm khí tượng...');
    } finally {
      setLoadingForecast(false);
    }
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetch7DayForecast(selectedLocation.latitude, selectedLocation.longitude);
    }
  }, [selectedLocation, fetch7DayForecast]);

  const handleSelectLocation = (loc) => {
    setSelectedLocation({
      name: loc.name,
      admin1: loc.admin1 || loc.country || '',
      country: loc.country || 'Việt Nam',
      latitude: loc.latitude,
      longitude: loc.longitude,
      elevation: loc.elevation
    });
    setSearchQuery('');
    setShowDropdown(false);
    setSelectedDayIndex(0);
  };

  // Weather Condition Code Interpreter
  const interpretWmoCode = (code) => {
    if (code === 0) return { label: 'Trời quang mây, nắng đẹp', icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50 text-amber-700' };
    if (code >= 1 && code <= 3) return { label: 'Mây rải rác - Nắng gián đoạn', icon: Sun, color: 'text-amber-600', bg: 'bg-amber-50 text-amber-800' };
    if (code >= 45 && code <= 48) return { label: 'Sương mù che phủ', icon: Wind, color: 'text-slate-500', bg: 'bg-slate-100 text-slate-700' };
    if (code >= 51 && code <= 65) return { label: 'Mưa rào nhẹ / Mưa phún', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-50 text-blue-700' };
    if (code >= 80 && code <= 82) return { label: 'Mưa rào nặng hạt', icon: CloudRain, color: 'text-indigo-600', bg: 'bg-indigo-50 text-indigo-800' };
    if (code >= 95) return { label: 'Giông lốc & Sấm sét mạnh', icon: Zap, color: 'text-red-500', bg: 'bg-red-50 text-red-700' };
    return { label: 'Mưa rào rải rác', icon: CloudRain, color: 'text-blue-600', bg: 'bg-blue-50 text-blue-700' };
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Search Bar & Quick Location Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <MapPin className="text-emerald-600" size={20} />
              <span>Dự Báo Thời Tiết 7 Ngày Theo Địa Điểm</span>
            </h2>
            <p className="text-xs text-slate-500">
              Nhập tên Tỉnh, Thành phố, Quận/Huyện bất kỳ tại Việt Nam hoặc thế giới để xem chi tiết
            </p>
          </div>

          {/* Location Autocomplete Input */}
          <div className="relative w-full sm:w-80">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 text-slate-400 pointer-events-none" size={16} />
              <input
                type="text"
                placeholder="Tìm địa điểm (VD: Cần Thơ, Đà Lạt, Mỹ Tho...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Dropdown Search Results */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden max-h-64 overflow-y-auto divide-y divide-slate-100">
                {searchResults.map((res, idx) => (
                  <button
                    key={`${res.latitude}-${res.longitude}-${idx}`}
                    onClick={() => handleSelectLocation(res)}
                    className="w-full px-4 py-2.5 text-left hover:bg-emerald-50/80 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                        {res.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {res.admin1 ? `${res.admin1}, ` : ''}{res.country || 'Việt Nam'}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {res.latitude.toFixed(2)}°, {res.longitude.toFixed(2)}°
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Popular Locations Badges */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] flex items-center gap-1">
            <History size={13} /> Gợi ý nhanh:
          </span>
          {POPULAR_LOCATIONS.map((loc) => (
            <button
              key={loc.name}
              onClick={() => handleSelectLocation(loc)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedLocation.name === loc.name
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Location Header Summary */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Compass size={14} />
              <span>Tọa độ: {selectedLocation.latitude.toFixed(4)}°N, {selectedLocation.longitude.toFixed(4)}°E</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              Dự Báo Thời Tiết: {selectedLocation.name}
            </h1>
            <p className="text-slate-300 text-xs font-medium">
              Khu vực: {selectedLocation.admin1 || selectedLocation.name} • {selectedLocation.country || 'Việt Nam'}
            </p>
          </div>

          {/* Current Quick Temp */}
          {forecastData && forecastData.current && (
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="text-4xl font-black text-white">
                {Math.round(forecastData.current.temperature_2m)}°C
              </div>
              <div className="text-xs space-y-0.5 text-slate-200">
                <div className="font-bold text-emerald-300">
                  {interpretWmoCode(forecastData.current.weather_code).label}
                </div>
                <div>💧 Độ ẩm: {forecastData.current.relative_humidity_2m}%</div>
                <div>💨 Gió: {forecastData.current.wind_speed_10m} km/h</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 7-Day Forecast Grid & Detailed Interactive View */}
      {loadingForecast ? (
        <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
          <RefreshCw size={36} className="animate-spin text-emerald-600 mx-auto" />
          <p className="text-slate-600 text-sm font-medium">Đang tải dữ liệu thời tiết 7 ngày cho {selectedLocation.name}...</p>
        </div>
      ) : forecastError ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-sm">
          {forecastError}
        </div>
      ) : forecastData && forecastData.daily ? (
        <div className="space-y-6">

          {/* 7 Day Cards Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar className="text-emerald-600" size={18} />
                <span>Dự Báo 7 Ngày Tới (Bấm chọn từng ngày để xem chi tiết 24h)</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {forecastData.daily.time.slice(0, 7).map((dateStr, idx) => {
                const dateObj = new Date(dateStr);
                const isToday = idx === 0;
                const dayLabel = isToday ? 'Hôm nay' : `Thứ ${dateObj.getDay() === 0 ? 'CN' : dateObj.getDay() + 1}`;
                const dateNum = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

                const maxTemp = Math.round(forecastData.daily.temperature_2m_max[idx]);
                const minTemp = Math.round(forecastData.daily.temperature_2m_min[idx]);
                const rainSum = forecastData.daily.precipitation_sum[idx];
                const rainProb = forecastData.daily.precipitation_probability_max?.[idx] || 0;
                const windMax = forecastData.daily.wind_speed_10m_max[idx];
                const wmoCode = forecastData.daily.weather_code[idx];
                const cond = interpretWmoCode(wmoCode);
                const IconC = cond.icon;

                const isSelected = selectedDayIndex === idx;

                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                  >
                    {isToday && (
                      <span className={`absolute top-0 right-0 px-2 py-0.5 text-[9px] font-black uppercase tracking-tight rounded-bl-lg ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Hôm nay
                      </span>
                    )}

                    <div className={`text-xs font-bold ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {dayLabel}
                    </div>
                    <div className={`text-[11px] font-semibold mb-2 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {dateNum}
                    </div>

                    <IconC size={26} className={`mx-auto my-1.5 ${isSelected ? 'text-amber-300' : cond.color}`} />

                    <div className="text-sm font-black mt-1">
                      <span className={isSelected ? 'text-white' : 'text-slate-900'}>{maxTemp}°</span>
                      <span className={`text-xs ml-1 font-normal ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                        / {minTemp}°
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-current/10 space-y-1 text-[11px]">
                      <div className="flex items-center justify-between font-semibold">
                        <span>🌧️ Mưa:</span>
                        <span>{rainSum}mm ({rainProb}%)</span>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <span>💨 Gió:</span>
                        <span>{windMax}km/h</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Detailed Hourly Timeline */}
          {(() => {
            const dateStr = forecastData.daily.time[selectedDayIndex];
            const dateObj = new Date(dateStr);
            const dayLabel = selectedDayIndex === 0 ? 'Hôm nay' : `Thứ ${dateObj.getDay() === 0 ? 'CN' : dateObj.getDay() + 1}`;
            const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
            
            const maxTemp = Math.round(forecastData.daily.temperature_2m_max[selectedDayIndex]);
            const minTemp = Math.round(forecastData.daily.temperature_2m_min[selectedDayIndex]);
            const rainSum = forecastData.daily.precipitation_sum[selectedDayIndex];
            const rainProb = forecastData.daily.precipitation_probability_max?.[selectedDayIndex] || 0;
            const windMax = forecastData.daily.wind_speed_10m_max[selectedDayIndex];
            const et0 = forecastData.daily.et0_fao_evapotranspiration?.[selectedDayIndex] || 3.5;
            const uvMax = forecastData.daily.uv_index_max?.[selectedDayIndex] || 5.0;

            // Filter 24 hours corresponding to the selected day
            const startHourIdx = selectedDayIndex * 24;
            const dayHourlyTimes = forecastData.hourly.time.slice(startHourIdx, startHourIdx + 24);

            return (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
                
                {/* Selected Day Summary Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div>
                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Chi Tiết Diễn Biến Thời Tiết Ngày Chọn
                    </div>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">
                      {dayLabel}, Ngày {formattedDate} - {selectedLocation.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap text-xs font-bold text-slate-700">
                    <div className="px-3 py-1.5 bg-white rounded-xl border border-slate-200">
                      🌡️ Nhiệt độ: <span className="text-blue-600">{minTemp}°C</span> - <span className="text-red-600">{maxTemp}°C</span>
                    </div>
                    <div className="px-3 py-1.5 bg-white rounded-xl border border-slate-200">
                      🌧️ Tổng mưa: <span className="text-indigo-600">{rainSum} mm ({rainProb}%)</span>
                    </div>
                    <div className="px-3 py-1.5 bg-white rounded-xl border border-slate-200">
                      ☀️ Bốc hơi ET0: <span className="text-teal-600">{et0.toFixed(1)} mm</span>
                    </div>
                    <div className="px-3 py-1.5 bg-white rounded-xl border border-slate-200">
                      🕶️ UV Max: <span className="text-amber-600">{uvMax.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* 24 Hour Scrollable Cards */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Clock size={15} className="text-emerald-600" />
                    <span>Diễn biến theo từng giờ trong ngày ({dayLabel})</span>
                  </h4>

                  <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
                    {dayHourlyTimes.map((timeStr, hIdx) => {
                      const absoluteIdx = startHourIdx + hIdx;
                      const hourDate = new Date(timeStr);
                      const hourLabel = `${hourDate.getHours()}:00`;
                      const hourTemp = Math.round(forecastData.hourly.temperature_2m[absoluteIdx]);
                      const hourRainProb = forecastData.hourly.precipitation_probability[absoluteIdx];
                      const hourRain = forecastData.hourly.precipitation[absoluteIdx];
                      const hourWind = forecastData.hourly.wind_speed_10m[absoluteIdx];
                      const hourWmo = forecastData.hourly.weather_code[absoluteIdx];
                      const hourCond = interpretWmoCode(hourWmo);
                      const IconComp = hourCond.icon;

                      const isSafeSpraying = hourWind <= 12 && hourRainProb < 20 && hourTemp <= 32;
                      const isRiskySpraying = hourWind > 16 || hourRainProb >= 50;

                      return (
                        <div
                          key={timeStr}
                          className={`shrink-0 w-28 p-3 rounded-2xl border text-center transition-all ${
                            isSafeSpraying
                              ? 'bg-emerald-50/60 border-emerald-200'
                              : isRiskySpraying
                              ? 'bg-red-50/60 border-red-200'
                              : 'bg-amber-50/60 border-amber-200'
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-700">{hourLabel}</div>
                          <IconComp size={22} className={`mx-auto my-1.5 ${hourCond.color}`} />
                          <div className="text-sm font-black text-slate-900">{hourTemp}°C</div>

                          <div className="mt-2 pt-2 border-t border-slate-200/60 space-y-1 text-[11px] text-slate-600">
                            <div className="flex items-center justify-between">
                              <span>Mưa:</span>
                              <span className="font-bold">{hourRainProb}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Lượng:</span>
                              <span className="font-bold">{hourRain}mm</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Gió:</span>
                              <span className="font-bold">{hourWind}k/h</span>
                            </div>
                          </div>

                          <div
                            className={`mt-2 py-0.5 px-1 text-[9px] font-black rounded uppercase tracking-tight ${
                              isSafeSpraying
                                ? 'bg-emerald-600 text-white'
                                : isRiskySpraying
                                ? 'bg-red-600 text-white'
                                : 'bg-amber-500 text-white'
                            }`}
                          >
                            {isSafeSpraying ? 'Nên phun' : isRiskySpraying ? 'Cấm phun' : 'Cân nhắc'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Day Specific Agricultural Advisory */}
                <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sprout size={16} className="text-emerald-700" />
                    <span>Chỉ dẫn lịch vụ nông nghiệp ngày {dayLabel} ({formattedDate}):</span>
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed pl-5 font-medium">
                    {rainSum >= 15
                      ? `🌧️ Dự báo mưa lớn đạt ${rainSum}mm. Khuyên dùng: Tắt máy tưới, kiểm tra hệ thống thoát nước ruộng tránh ngập úng gốc lúa.`
                      : rainSum > 3
                      ? `☔ Có mưa vừa (${rainSum}mm). Ngừng bón phân hạt tránh bị trôi rửa. Thời điểm phun thuốc nên dời sang ngày khô ráo.`
                      : windMax > 18
                      ? `💨 Gió giật tới ${windMax} km/h. Không tiến hành phun thuốc BVTV bằng máy bay drone hoặc bình xịt cầm tay.`
                      : `☀️ Thời tiết thuận lợi! Nhiệt độ ${minTemp}°C - ${maxTemp}°C, bốc hơi nước ${et0.toFixed(1)}mm. Tiến hành bón phân đợt 2 & phun phòng ngừa nấm bệnh bình thường.`}
                  </p>
                </div>

              </div>
            );
          })()}

        </div>
      ) : null}

    </div>
  );
}
