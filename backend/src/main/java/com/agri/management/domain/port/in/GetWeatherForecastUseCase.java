package com.agri.management.domain.port.in;

import com.agri.management.domain.model.WeatherInfo;
import java.util.List;
import java.util.Map;

public interface GetWeatherForecastUseCase {
    WeatherInfo getWeatherByCoordinates(Double latitude, Double longitude, String locationName);
    List<Map<String, Object>> searchLocationByName(String query);
}

