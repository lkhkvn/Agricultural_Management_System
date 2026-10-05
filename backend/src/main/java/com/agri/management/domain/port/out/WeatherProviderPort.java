package com.agri.management.domain.port.out;

import com.agri.management.domain.model.WeatherInfo;
import java.util.List;
import java.util.Map;

public interface WeatherProviderPort {
    WeatherInfo getWeatherForecast(Double latitude, Double longitude);
    List<Map<String, Object>> searchLocations(String query);
}
