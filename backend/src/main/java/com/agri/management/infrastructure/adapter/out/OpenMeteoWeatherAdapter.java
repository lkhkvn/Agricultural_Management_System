package com.agri.management.infrastructure.adapter.out;

import com.agri.management.domain.model.WeatherInfo;
import com.agri.management.domain.port.out.WeatherProviderPort;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Adapter Out: Nơi tập trung toàn bộ kết nối HTTP ra API Open-Meteo
 * Đặt trực tiếp tại package com.agri.management.infrastructure.adapter.out
 */
@Component
public class OpenMeteoWeatherAdapter implements WeatherProviderPort {

    private final RestTemplate restTemplate;

    public OpenMeteoWeatherAdapter() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    public WeatherInfo getWeatherForecast(Double latitude, Double longitude) {
        String url = String.format(
            "https://api.open-meteo.com/v1/forecast?latitude=%.4f&longitude=%.4f" +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m" +
            "&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m" +
            "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max" +
            "&timezone=Asia/Ho_Chi_Minh",
            latitude, longitude
        );

        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response == null) return buildFallbackWeather(latitude, longitude);

            WeatherInfo info = new WeatherInfo();
            info.setLatitude(latitude);
            info.setLongitude(longitude);
            info.setLocationName("Tọa độ (" + latitude + ", " + longitude + ")");

            if (response.containsKey("current")) {
                Map<String, Object> current = (Map<String, Object>) response.get("current");
                info.setTemperature(parseDouble(current.get("temperature_2m")));
                info.setApparentTemperature(parseDouble(current.get("apparent_temperature")));
                info.setHumidity(parseDouble(current.get("relative_humidity_2m")));
                info.setPrecipitation(parseDouble(current.get("precipitation")));
                info.setWindSpeed(parseDouble(current.get("wind_speed_10m")));
                info.setWindDirection(parseDouble(current.get("wind_direction_10m")));
                info.setWeatherCode(parseInteger(current.get("weather_code")));
                info.setWeatherConditionLabel(decodeWeatherCode(info.getWeatherCode()));
            }

            info.setDailyForecasts(parseDailyForecasts(response));
            info.setHourlyForecasts(parseHourlyForecasts(response));

            return info;
        } catch (Exception e) {
            return buildFallbackWeather(latitude, longitude);
        }
    }

    @Override
    public List<Map<String, Object>> searchLocations(String query) {
        List<Map<String, Object>> results = new ArrayList<>();
        String url = String.format(
            "https://geocoding-api.open-meteo.com/v1/search?name=%s&count=10&language=vi&format=json&countrycode=VN",
            query
        );

        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null && response.containsKey("results")) {
                List<Map<String, Object>> rawResults = (List<Map<String, Object>>) response.get("results");
                for (Map<String, Object> item : rawResults) {
                    Map<String, Object> loc = new HashMap<>();
                    String name = (String) item.get("name");
                    String admin1 = (String) item.get("admin1");
                    String admin2 = (String) item.get("admin2");

                    StringBuilder fullName = new StringBuilder(name);
                    if (admin2 != null) fullName.append(", ").append(admin2);
                    if (admin1 != null) fullName.append(", ").append(admin1);

                    loc.put("name", fullName.toString());
                    loc.put("latitude", item.get("latitude"));
                    loc.put("longitude", item.get("longitude"));
                    results.add(loc);
                }
            }
        } catch (Exception e) {
            // Log ngoại lệ nếu cần
        }
        return results;
    }

    private WeatherInfo buildFallbackWeather(Double latitude, Double longitude) {
        WeatherInfo fallback = new WeatherInfo();
        fallback.setLatitude(latitude);
        fallback.setLongitude(longitude);
        fallback.setLocationName("Cần Thơ (Dữ liệu ngoại tuyến)");
        fallback.setTemperature(31.0);
        fallback.setApparentTemperature(33.0);
        fallback.setHumidity(75.0);
        fallback.setWindSpeed(10.0);
        fallback.setWeatherConditionLabel("Nắng nhẹ");
        fallback.setDailyForecasts(new ArrayList<>());
        fallback.setHourlyForecasts(new ArrayList<>());
        return fallback;
    }

    private List<WeatherInfo.DailyForecast> parseDailyForecasts(Map<String, Object> response) {
        List<WeatherInfo.DailyForecast> list = new ArrayList<>();
        if (response.containsKey("daily")) {
            Map<String, Object> daily = (Map<String, Object>) response.get("daily");
            List<String> dates = (List<String>) daily.get("time");
            List<Object> maxTemps = (List<Object>) daily.get("temperature_2m_max");
            List<Object> minTemps = (List<Object>) daily.get("temperature_2m_min");
            List<Object> precipSums = (List<Object>) daily.get("precipitation_sum");
            List<Object> precipProbs = (List<Object>) daily.get("precipitation_probability_max");
            List<Object> windSpeedMaxs = (List<Object>) daily.get("wind_speed_10m_max");
            List<Object> uvMaxs = (List<Object>) daily.get("uv_index_max");
            List<Object> codes = (List<Object>) daily.get("weather_code");

            if (dates != null) {
                for (int i = 0; i < dates.size(); i++) {
                    WeatherInfo.DailyForecast df = new WeatherInfo.DailyForecast();
                    df.setDate(dates.get(i));
                    if (maxTemps != null && i < maxTemps.size()) df.setMaxTemp(parseDouble(maxTemps.get(i)));
                    if (minTemps != null && i < minTemps.size()) df.setMinTemp(parseDouble(minTemps.get(i)));
                    if (precipSums != null && i < precipSums.size()) df.setPrecipitationSum(parseDouble(precipSums.get(i)));
                    if (precipProbs != null && i < precipProbs.size()) df.setPrecipitationProbabilityMax(parseInteger(precipProbs.get(i)));
                    if (windSpeedMaxs != null && i < windSpeedMaxs.size()) df.setWindSpeedMax(parseDouble(windSpeedMaxs.get(i)));
                    if (uvMaxs != null && i < uvMaxs.size()) df.setUvIndexMax(parseDouble(uvMaxs.get(i)));
                    if (codes != null && i < codes.size()) df.setWeatherCode(parseInteger(codes.get(i)));
                    list.add(df);
                }
            }
        }
        return list;
    }

    private List<WeatherInfo.HourlyForecast> parseHourlyForecasts(Map<String, Object> response) {
        List<WeatherInfo.HourlyForecast> list = new ArrayList<>();
        if (response.containsKey("hourly")) {
            Map<String, Object> hourly = (Map<String, Object>) response.get("hourly");
            List<String> times = (List<String>) hourly.get("time");
            List<Object> temps = (List<Object>) hourly.get("temperature_2m");
            List<Object> probs = (List<Object>) hourly.get("precipitation_probability");
            List<Object> precips = (List<Object>) hourly.get("precipitation");
            List<Object> winds = (List<Object>) hourly.get("wind_speed_10m");
            List<Object> codes = (List<Object>) hourly.get("weather_code");

            if (times != null) {
                int limit = Math.min(24, times.size());
                for (int i = 0; i < limit; i++) {
                    WeatherInfo.HourlyForecast hf = new WeatherInfo.HourlyForecast();
                    hf.setTime(times.get(i));
                    if (temps != null && i < temps.size()) hf.setTemperature(parseDouble(temps.get(i)));
                    if (probs != null && i < probs.size()) hf.setPrecipitationProbability(parseInteger(probs.get(i)));
                    if (precips != null && i < precips.size()) hf.setPrecipitation(parseDouble(precips.get(i)));
                    if (winds != null && i < winds.size()) hf.setWindSpeed(parseDouble(winds.get(i)));
                    if (codes != null && i < codes.size()) hf.setWeatherCode(parseInteger(codes.get(i)));
                    list.add(hf);
                }
            }
        }
        return list;
    }

    private Double parseDouble(Object val) {
        if (val == null) return 0.0;
        if (val instanceof Number) return ((Number) val).doubleValue();
        try { return Double.parseDouble(val.toString()); } catch (Exception e) { return 0.0; }
    }

    private Integer parseInteger(Object val) {
        if (val == null) return 0;
        if (val instanceof Number) return ((Number) val).intValue();
        try { return Integer.parseInt(val.toString()); } catch (Exception e) { return 0; }
    }

    private String decodeWeatherCode(Integer code) {
        if (code == null) return "Không xác định";
        switch (code) {
            case 0: return "Trời quang mây tạnh";
            case 1: case 2: case 3: return "Mây rải rác / Nắng gián đoạn";
            case 45: case 48: return "Sương mù";
            case 51: case 53: case 55: return "Mưa phun nhẹ";
            case 61: case 63: case 65: return "Mưa rào nhẹ - vừa";
            case 80: case 81: case 82: return "Mưa rào lớn";
            case 95: case 96: case 99: return "Dông lốc, có sấm sét";
            default: return "Nhiều mây";
        }
    }
}
