package com.agri.management.infrastructure.adapter.in.web;

import com.agri.management.domain.model.WeatherInfo;
import com.agri.management.domain.port.in.GetWeatherForecastUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller Adapter In (REST API Web)
 * Xử lý các đường dẫn HTTP cho Frontend gọi vào
 */
@RestController
@RequestMapping("/api/v1/weather")
@CrossOrigin(origins = "*")
public class WeatherForecastController {

    private final GetWeatherForecastUseCase getWeatherForecastUseCase;

    public WeatherForecastController(GetWeatherForecastUseCase getWeatherForecastUseCase) {
        this.getWeatherForecastUseCase = getWeatherForecastUseCase;
    }

    /**
     * GET /api/v1/weather/forecast?lat=10.0333&lng=105.7833&location=C%E1%BA%A7n%20Th%C6%A1
     */
    @GetMapping("/forecast")
    public ResponseEntity<WeatherInfo> getWeatherForecast(
            @RequestParam(value = "lat", defaultValue = "10.0333") Double latitude,
            @RequestParam(value = "lng", defaultValue = "105.7833") Double longitude,
            @RequestParam(value = "location", required = false) String locationName) {

        WeatherInfo forecast = getWeatherForecastUseCase.getWeatherByCoordinates(latitude, longitude, locationName);
        return ResponseEntity.ok(forecast);
    }

    /**
     * GET /api/v1/weather/search?query=M%E1%BB%B9%20Kh%C3%A1nh
     */
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchLocation(
            @RequestParam(value = "query") String query) {

        List<Map<String, Object>> locations = getWeatherForecastUseCase.searchLocationByName(query);
        return ResponseEntity.ok(locations);
    }
}
