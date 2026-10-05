package com.agri.management.domain.service;

import com.agri.management.domain.model.WeatherInfo;
import com.agri.management.domain.port.in.GetWeatherForecastUseCase;
import com.agri.management.domain.port.out.WeatherProviderPort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Domain Service thuần túy: Không dính mã HTTP/RestTemplate
 */
@Service
public class WeatherForecastService implements GetWeatherForecastUseCase {

    private final WeatherProviderPort weatherProviderPort;

    // Tiêm (Inject) WeatherProviderPort qua Constructor
    public WeatherForecastService(WeatherProviderPort weatherProviderPort) {
        this.weatherProviderPort = weatherProviderPort;
    }

    @Override
    public WeatherInfo getWeatherByCoordinates(Double latitude, Double longitude, String locationName) {
        if (latitude == null) latitude = 10.0333; // Mặc định Cần Thơ
        if (longitude == null) longitude = 105.7833;

        WeatherInfo weatherInfo = weatherProviderPort.getWeatherForecast(latitude, longitude);
        
        if (weatherInfo != null && locationName != null && !locationName.trim().isEmpty()) {
            weatherInfo.setLocationName(locationName);
        }

        return weatherInfo;
    }

    @Override
    public List<Map<String, Object>> searchLocationByName(String query) {
        if (query == null || query.trim().length() < 2) {
            return List.of();
        }
        // Ủy quyền việc gọi HTTP tìm địa danh cho Port Out xử lý
        return weatherProviderPort.searchLocations(query.trim());
    }
}
