'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Location7DayForecast from './Location7DayForecast';
import {
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  RefreshCw,
  Sprout,
  Umbrella,
  Zap,
  Info,
  Sparkles,
  Clock,
  ChevronRight,
  Navigation,
  Compass,
  AlertCircle,
  Map as MapIcon,
  Layers,
  Maximize2,
  Crosshair,
  Search
} from 'lucide-react';

// Pre-configured Agricultural Regions in Vietnam with exact coordinates
const AGRI_REGIONS = [
  {
    id: 'dbscl-cantho',
    name: 'Đồng Bằng Sông Cửu Long - Cần Thơ',
    subtext: 'Chuyên canh Lúa ST25, OM18, Nông nghiệp nước nổi',
    lat: 10.0452,
    lon: 105.7469,
    cropFocus: 'Lúa thơm, Cây ăn trái',
  },
  {
    id: 'dbscl-angiang',
    name: 'An Giang - Tri Tôn / Thoại Sơn',
    subtext: 'Vùng vựa lúa Cánh Đồng Lớn, Đài Thơm 8',
    lat: 10.3853,
    lon: 105.4262,
    cropFocus: 'Lúa chất lượng cao, Nếp',
  },
  {
    id: 'taynguyen-dalat',
    name: 'Tây Nguyên - Lâm Đồng (Đà Lạt)',
    subtext: 'Vùng Rau củ quả, Cà phê, Nông nghiệp công nghệ cao',
    lat: 11.9404,
    lon: 108.4583,
    cropFocus: 'Rau ôn đới, Cà phê, Chè',
  },
  {
    id: 'dongnambo-dongnai',
    name: 'Đồng Nam Bộ - Đồng Nai / Long Khánh',
    subtext: 'Vùng chuyên canh Cây ăn quả, Sầu riêng, Chôm chôm',
    lat: 10.9574,
    lon: 107.2427,
    cropFocus: 'Sầu riêng, Tiêu, Điều',
  },
  {
    id: 'dbsh-hanoi',
    name: 'Đồng Bằng Sông Hồng - Hà Nội / Nam Định',
    subtext: 'Chuyên canh Lúa vụ Xuân & Vụ Mùa, Rau màu',
    lat: 21.0285,
    lon: 105.8542,
    cropFocus: 'Lúa vụ Tám, Lúa thuần, Ngô',
  },
  {
    id: 'mientrung-nghean',
    name: 'Bắc Trung Bộ - Nghệ An / Hà Tĩnh',
    subtext: 'Vùng gió Lào, Nông nghiệp ứng phó hạn hán & bão',
    lat: 18.6734,
    lon: 105.6803,
    cropFocus: 'Lúa, Chè, Mía đường',
  },
];

export default function AgriWeatherDashboard() {
  const [activeFeatureTab, setActiveFeatureTab] = useState('7day'); // '7day' | 'radar'
  const [selectedRegion, setSelectedRegion] = useState(AGRI_REGIONS[0]);
  const [customLat, setCustomLat] = useState('10.0452');
  const [customLon, setCustomLon] = useState('105.7469');
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  // Map Controls State
  const [mapMode, setMapMode] = useState('windy'); // 'windy' | 'leaflet'
  const [windyOverlay, setWindyOverlay] = useState('wind'); // 'wind' | 'rain' | 'temp' | 'clouds' | 'radar'
  const leafletMapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  const activeLat = isCustomMode ? parseFloat(customLat) || selectedRegion.lat : selectedRegion.lat;
  const activeLon = isCustomMode ? parseFloat(customLon) || selectedRegion.lon : selectedRegion.lon;

  // Fetch weather data from Open-Meteo API
  const fetchWeatherData = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,et0_fao_evapotranspiration&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_probability_max,wind_speed_10m_max,et0_fao_evapotranspiration&timezone=Asia%2FHo_Chi_Minh`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('Không thể kết nối đến máy chủ thời tiết API.');
      
      const data = await res.json();
      setWeather(data);
      setLastRefreshed(new Date().toLocaleTimeString('vi-VN'));
    } catch (err) {
      console.error('Lỗi khi tải dự báo thời tiết:', err);
      setError(err.message || 'Lỗi khi tải dữ liệu thời tiết');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(activeLat, activeLon);
  }, [activeLat, activeLon, fetchWeatherData]);

  // Leaflet Map Initialization & Syncing
  useEffect(() => {
    if (mapMode !== 'leaflet' || typeof window === 'undefined') return;

    const loadLeaflet = () => {
      if (!window.L) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => initLeafletMap();
        document.body.appendChild(script);
      } else {
        initLeafletMap();
      }
    };

    const initLeafletMap = () => {
      if (!mapContainerRef.current) return;

      if (leafletMapRef.current) {
        leafletMapRef.current.setView([activeLat, activeLon], 9);
        if (markerRef.current) {
          markerRef.current.setLatLng([activeLat, activeLon]);
        }
        return;
      }

      const map = window.L.map(mapContainerRef.current).setView([activeLat, activeLon], 9);
      leafletMapRef.current = map;

      // Base OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // RainViewer Weather Radar Tile Layer
      window.L.tileLayer('https://tile.rainviewer.com/v2/radar/nowcast_5min/256/{z}/{x}/{y}/2/1_1.png', {
        opacity: 0.6,
        attribution: 'Weather Radar &copy; RainViewer'
      }).addTo(map);

      // Custom marker icon
      const customMarker = window.L.marker([activeLat, activeLon], {
        draggable: true
      }).addTo(map);
      markerRef.current = customMarker;

      customMarker.bindPopup(`<b>Vùng chọn canh tác</b><br/>Tọa độ: ${activeLat.toFixed(4)}, ${activeLon.toFixed(4)}`).openPopup();

      // Click event on map to choose new farm position
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setCustomLat(lat.toFixed(4));
        setCustomLon(lng.toFixed(4));
        setIsCustomMode(true);
        customMarker.setLatLng([lat, lng]);
        customMarker.bindPopup(`<b>Vị trí mới chọn</b><br/>Vĩ độ: ${lat.toFixed(4)}, Kinh độ: ${lng.toFixed(4)}`).openPopup();
      });

      customMarker.on('dragend', () => {
        const position = customMarker.getLatLng();
        setCustomLat(position.lat.toFixed(4));
        setCustomLon(position.lng.toFixed(4));
        setIsCustomMode(true);
      });
    };

    loadLeaflet();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [mapMode, activeLat, activeLon]);

  const handleApplyCustomCoords = (e) => {
    e.preventDefault();
    const lat = parseFloat(customLat);
    const lon = parseFloat(customLon);
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      alert('Vui lòng nhập tọa độ hợp lệ! (Vĩ độ: -90 đến 90, Kinh độ: -180 đến 180)');
      return;
    }
    setIsCustomMode(true);
    fetchWeatherData(lat, lon);
  };

  // Weather Code Interpreter (WMO Code)
  const interpretWmoCode = (code) => {
    if (code === 0) return { label: 'Trời quang mây, nắng đẹp', icon: Sun, color: 'text-amber-500', bg: 'bg-amber-500/10' };
    if (code >= 1 && code <= 3) return { label: 'Mây rải rác - Nắng gián đoạn', icon: Sun, color: 'text-amber-600', bg: 'bg-amber-500/10' };
    if (code >= 45 && code <= 48) return { label: 'Sương mù che phủ', icon: Wind, color: 'text-slate-500', bg: 'bg-slate-500/10' };
    if (code >= 51 && code <= 65) return { label: 'Mưa rào nhẹ / Mưa phún', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-500/10' };
    if (code >= 80 && code <= 82) return { label: 'Mưa rào nặng hạt', icon: CloudRain, color: 'text-indigo-600', bg: 'bg-indigo-500/10' };
    if (code >= 95) return { label: 'Giông lốc & Sấm sét mạnh', icon: Zap, color: 'text-red-500', bg: 'bg-red-500/10' };
    return { label: 'Có mưa rào rải rác', icon: CloudRain, color: 'text-blue-600', bg: 'bg-blue-500/10' };
  };

  // Calculate Agricultural Recommendation Engine
  const calculateAgriRecommendations = () => {
    if (!weather || !weather.current) return [];
    
    const current = weather.current;
    const daily = weather.daily;

    const temp = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const wind = current.wind_speed_10m;
    const rainNow = current.precipitation;
    const rainToday = daily?.precipitation_sum?.[0] || 0;
    const rainProbToday = daily?.precipitation_probability_max?.[0] || 0;
    const et0Today = daily?.et0_fao_evapotranspiration?.[0] || 3.5;

    const list = [];

    // 1. Phun Thuốc Bảo Vệ Thực Vật (Pest Control & Spraying)
    if (wind > 15) {
      list.push({
        id: 'spraying',
        category: 'Phun Thuốc BVTV',
        status: 'DANGER',
        title: '🚫 KHÔNG PHUN THUỐC BVTV',
        badge: 'Cảnh báo Gió Mạnh',
        desc: `Gió hiện tại ${wind} km/h (vượt ngưỡng 15 km/h). Phun thuốc sẽ bị bốc hơi, gió cuốn bạt sang ruộng khác và giảm 70% hiệu quả.`,
        action: 'Hoãn phun thuốc cho đến khi gió giảm xuống dưới 12 km/h.'
      });
    } else if (rainNow > 0.2 || rainProbToday > 60) {
      list.push({
        id: 'spraying',
        category: 'Phun Thuốc BVTV',
        status: 'WARNING',
        title: '⚠️ NÊN CÂN NHẮC TRÁNH PHUN THUỐC',
        badge: 'Xác suất mưa ' + rainProbToday + '%',
        desc: `Dự báo có mưa (${rainToday}mm). Mưa trong vòng 3-4 giờ sau khi phun sẽ rửa trôi toàn bộ lượng thuốc trên lá.`,
        action: 'Nếu bắt buộc phun, nên kết hợp thêm chất bám dính sinh học chuyên dụng.'
      });
    } else if (temp > 33) {
      list.push({
        id: 'spraying',
        category: 'Phun Thuốc BVTV',
        status: 'WARNING',
        title: '⚠️ TRÁNH PHUN LÚC NẮNG GẮT',
        badge: 'Nhiệt độ cao ' + temp + '°C',
        desc: `Nhiệt độ ${temp}°C làm thuốc mau khô, dễ gây cháy lá non và giảm khả năng hấp thu của cây lúa.`,
        action: 'Khuyên dùng: Phun từ 6:00 - 8:30 sáng hoặc sau 16:30 chiều.'
      });
    } else {
      list.push({
        id: 'spraying',
        category: 'Phun Thuốc BVTV',
        status: 'OPTIMAL',
        title: '✅ THỜI ĐIỂM VÀNG ĐỂ PHUN THUỐC',
        badge: 'Thời tiết Lý tưởng',
        desc: `Gió nhẹ (${wind} km/h), không mưa, nhiệt độ mát mẻ (${temp}°C). Lá cây mở khí khổng tốt nhất.`,
        action: 'Tiến hành phun thuốc sâu bệnh/phân bón lá ngay trong buổi sáng.'
      });
    }

    // 2. Quản Lý Tưới Tiêu & Nước Ruộng (Irrigation & Water Management)
    if (rainToday >= 15 || rainNow > 1.0) {
      list.push({
        id: 'irrigation',
        category: 'Tưới Tiêu Ruộng Lúa',
        status: 'WARNING',
        title: '💧 TẠM NGƯƠNG TƯỚI - MỞ CỐNG THOÁT NƯỚC',
        badge: 'Lượng mưa dự báo ' + rainToday + 'mm',
        desc: `Mưa lớn đạt ${rainToday}mm có thể gây ngập úng gốc lúa giai đoạn đẻ nhánh/làm đòng.`,
        action: 'Kiểm tra bờ mương, tháo bớt nước đệm trong ruộng để hứng nước mưa natural.'
      });
    } else if (et0Today > 4.5 && rainProbToday < 20) {
      list.push({
        id: 'irrigation',
        category: 'Tưới Tiêu Ruộng Lúa',
        status: 'OPTIMAL',
        title: '☀️ CẦN BỔ SUNG NƯỚC RUỘNG (Kỹ thuật AWD)',
        badge: 'Độ bốc hơi nước cao (' + et0Today.toFixed(1) + ' mm/ngày)',
        desc: `Tốc độ bốc hơi nước cao. Ruộng lúa đang trong giai đoạn nhạy cảm cần duy trì mực nước 3-5cm.`,
        action: 'Cho nước vào ruộng khoảng 3-5 cm vào chiều tối để giữ ẩm gốc.'
      });
    } else {
      list.push({
        id: 'irrigation',
        category: 'Tưới Tiêu Ruộng Lúa',
        status: 'OPTIMAL',
        title: '✅ ẨM ĐỘ ĐẤT ỔN ĐỊNH',
        badge: 'Duy trì nước đệm',
        desc: `Lượng mưa nhẹ kết hợp độ ẩm đất đạt cân bằng. Không lo mất nước cục bộ.`,
        action: 'Giữ nguyên mực nước ruộng theo quy trình canh tác ướt khô xen kẽ.'
      });
    }

    // 3. Cảnh Báo Nguy Cơ Sâu Bệnh (Pest & Disease Risk Prediction)
    if (humidity > 85 && temp >= 22 && temp <= 29) {
      list.push({
        id: 'disease',
        category: 'Dự Báo Dịch Bệnh Lúa',
        status: 'DANGER',
        title: '🦠 NGUY CƠ BÙNG PHÁT BỆNH ĐẠO ÔN & THÁN THƯ',
        badge: 'Độ ẩm cao ' + humidity + '% + Nhiệt độ 22-29°C',
        desc: `Ẩm độ ${humidity}% kéo dài kết hợp sương đêm là môi trường vàng cho bào tử nấm Bệnh Đạo Ôn Lá (Pyricularia oryzae) và Đốm Vằn phát triển cực nhanh.`,
        action: 'Thăm ruộng thường xuyên, ngưng bón thừa phân Đạm (N), chuẩn bị sẵn thuốc đặc trị nấm sinh học.'
      });
    } else if (humidity > 75 && wind < 8) {
      list.push({
        id: 'disease',
        category: 'Dự Báo Dịch Bệnh Lúa',
        status: 'WARNING',
        title: '🌾 CHÚ Ý BỆNH SƯƠNG MAI & SÂU CUỐN LÁ',
        badge: 'Độ ẩm ' + humidity + '%',
        desc: `Trời lặng gió và ẩm ướt là điều kiện thuận lợi cho bướm sâu cuốn lá nhỏ đẻ trứng.`,
        action: 'Kiểm tra mật độ bướm đêm và vết bệnh chấm dừa trên lá lúa.'
      });
    } else {
      list.push({
        id: 'disease',
        category: 'Dự Báo Dịch Bệnh Lúa',
        status: 'OPTIMAL',
        title: '🛡️ ÁP LỰC SÂU BỆNH THẤP',
        badge: 'An toàn dịch bệnh',
        desc: `Thời tiết thông thoáng, độ ẩm không khí mức an toàn (${humidity}%). Nấm bệnh khó phát tán.`,
        action: 'Tiếp tục theo dõi định kỳ 2 lần/tuần.'
      });
    }

    return list;
  };

  const currentCondition = weather ? interpretWmoCode(weather.current.weather_code) : null;
  const ConditionIcon = currentCondition?.icon || Sun;
  const agriAdvisories = calculateAgriRecommendations();

  // Construct Windy URL dynamically
  const windyEmbedUrl = `https://embed.windy.com/embed.html?lat=${activeLat}&lon=${activeLon}&detailLat=${activeLat}&detailLon=${activeLon}&width=100%25&height=550&zoom=7&level=surface&overlay=${windyOverlay}&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`;

  return (
    <div className="w-full space-y-8 pb-12">
      
      {/* 🗺️ Interactive Live Weather Radar Map Section (Always Visible) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden space-y-0">
        
        {/* Map Header Toolbar */}
        <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600/30 border border-emerald-500/40 rounded-xl text-emerald-400">
              <MapIcon size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Bản Đồ Khí Tượng & Ra-da Thời Tiết Live</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">REALTIME</span>
              </h3>
              <p className="text-xs text-slate-400">
                Quan sát mô phỏng hướng gió, bão, vùng mưa & nhiệt độ trực quan theo thời gian thực
              </p>
            </div>
          </div>

          {/* Map Mode Tabs (Windy Live vs Leaflet Interactive Farm Picker) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMapMode('windy')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mapMode === 'windy'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              🌐 Windy Ra-da Live
            </button>
            <button
              onClick={() => setMapMode('leaflet')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mapMode === 'leaflet'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              📍 Bản Đồ Chọn Thửa Ruộng
            </button>
          </div>
        </div>

        {/* Windy Layer Switcher Sub-bar */}
        {mapMode === 'windy' && (
          <div className="px-4 py-2 bg-slate-800 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Layers size={14} /> Chọn Lớp Thời Tiết:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'wind', label: '💨 Gió (Wind)', icon: Wind },
                { id: 'rain', label: '🌧️ Mưa (Rain)', icon: CloudRain },
                { id: 'temp', label: '🌡️ Nhiệt độ (Temp)', icon: Thermometer },
                { id: 'clouds', label: '☁️ Mây (Clouds)', icon: Sun },
                { id: 'radar', label: '📡 Ra-da Sét (Radar)', icon: Zap }
              ].map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setWindyOverlay(layer.id)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    windyOverlay === layer.id
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {layer.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Map View Frame */}
        <div className="relative w-full h-[480px] bg-slate-950">
          {mapMode === 'windy' ? (
            <iframe
              key={`${activeLat}-${activeLon}-${windyOverlay}`}
              title="Windy Weather Radar Map"
              src={windyEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="relative w-full h-full">
              <div ref={mapContainerRef} className="w-full h-full z-10" />
              <div className="absolute top-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border border-slate-700 text-xs shadow-lg max-w-xs space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1">
                  <Crosshair size={14} /> Mẹo chọn thửa ruộng:
                </div>
                <p className="text-slate-300 leading-snug">
                  Nhấp chuột vào vị trí bất kỳ trên bản đồ hoặc kéo ghim để chọn tọa độ mảnh đất của bạn!
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 📅 7-Day Location Search & Agricultural Forecast Component */}
      <Location7DayForecast />

    </div>
  );
}
