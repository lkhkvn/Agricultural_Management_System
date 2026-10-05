package com.agri.management.domain.model;

import java.util.List;

/**
 * Domain Model WeatherInfo thuần Java (Không dùng Lombok)
 */
public class WeatherInfo {
    private String locationName;
    private Double latitude;
    private Double longitude;
    private Double temperature;
    private Double apparentTemperature;
    private Double humidity;
    private Double windSpeed;
    private Double windDirection;
    private Double precipitation;
    private Integer weatherCode;
    private String weatherConditionLabel;

    private List<DailyForecast> dailyForecasts;
    private List<HourlyForecast> hourlyForecasts;

    public WeatherInfo() {}

    public WeatherInfo(String locationName, Double latitude, Double longitude, Double temperature, 
                       Double apparentTemperature, Double humidity, Double windSpeed, Double windDirection, 
                       Double precipitation, Integer weatherCode, String weatherConditionLabel, 
                       List<DailyForecast> dailyForecasts, List<HourlyForecast> hourlyForecasts) {
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.temperature = temperature;
        this.apparentTemperature = apparentTemperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.windDirection = windDirection;
        this.precipitation = precipitation;
        this.weatherCode = weatherCode;
        this.weatherConditionLabel = weatherConditionLabel;
        this.dailyForecasts = dailyForecasts;
        this.hourlyForecasts = hourlyForecasts;
    }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }

    public Double getApparentTemperature() { return apparentTemperature; }
    public void setApparentTemperature(Double apparentTemperature) { this.apparentTemperature = apparentTemperature; }

    public Double getHumidity() { return humidity; }
    public void setHumidity(Double humidity) { this.humidity = humidity; }

    public Double getWindSpeed() { return windSpeed; }
    public void setWindSpeed(Double windSpeed) { this.windSpeed = windSpeed; }
    public Double getWindDirection() { return windDirection; }
    public void setWindDirection(Double windDirection) { this.windDirection = windDirection; }
    public Double getPrecipitation() { return precipitation; }
    public void setPrecipitation(Double precipitation) { this.precipitation = precipitation; }
    public Integer getWeatherCode() { return weatherCode; }
    public void setWeatherCode(Integer weatherCode) { this.weatherCode = weatherCode; }
    public String getWeatherConditionLabel() { return weatherConditionLabel; }
    public void setWeatherConditionLabel(String weatherConditionLabel) { this.weatherConditionLabel = weatherConditionLabel; }
    public List<DailyForecast> getDailyForecasts() { return dailyForecasts; }
    public void setDailyForecasts(List<DailyForecast> dailyForecasts) { this.dailyForecasts = dailyForecasts; }
    public List<HourlyForecast> getHourlyForecasts() { return hourlyForecasts; }
    public void setHourlyForecasts(List<HourlyForecast> hourlyForecasts) { this.hourlyForecasts = hourlyForecasts; }
    // Inner static class DailyForecast
    public static class DailyForecast {
        private String date;
        private Double maxTemp;
        private Double minTemp;
        private Double precipitationSum;
        private Integer precipitationProbabilityMax;
        private Double windSpeedMax;
        private Double et0Evapotranspiration;
        private Double uvIndexMax;
        private Integer weatherCode;
        private String dayRecommendation;
        public DailyForecast() {}
        public DailyForecast(String date, Double maxTemp, Double minTemp, Double precipitationSum, 
                             Integer precipitationProbabilityMax, Double windSpeedMax, 
                             Double et0Evapotranspiration, Double uvIndexMax, Integer weatherCode, 
                             String dayRecommendation) {
            this.date = date;
            this.maxTemp = maxTemp;
            this.minTemp = minTemp;
            this.precipitationSum = precipitationSum;
            this.precipitationProbabilityMax = precipitationProbabilityMax;
            this.windSpeedMax = windSpeedMax;
            this.et0Evapotranspiration = et0Evapotranspiration;
            this.uvIndexMax = uvIndexMax;
            this.weatherCode = weatherCode;
            this.dayRecommendation = dayRecommendation;
        }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public Double getMaxTemp() { return maxTemp; }
        public void setMaxTemp(Double maxTemp) { this.maxTemp = maxTemp; }
        public Double getMinTemp() { return minTemp; }
        public void setMinTemp(Double minTemp) { this.minTemp = minTemp; }
        public Double getPrecipitationSum() { return precipitationSum; }
        public void setPrecipitationSum(Double precipitationSum) { this.precipitationSum = precipitationSum; }
        public Integer getPrecipitationProbabilityMax() { return precipitationProbabilityMax; }
        public void setPrecipitationProbabilityMax(Integer precipitationProbabilityMax) { this.precipitationProbabilityMax = precipitationProbabilityMax; }
        public Double getWindSpeedMax() { return windSpeedMax; }
        public void setWindSpeedMax(Double windSpeedMax) { this.windSpeedMax = windSpeedMax; }
        public Double getEt0Evapotranspiration() { return et0Evapotranspiration; }
        public void setEt0Evapotranspiration(Double et0Evapotranspiration) { this.et0Evapotranspiration = et0Evapotranspiration; }
        public Double getUvIndexMax() { return uvIndexMax; }
        public void setUvIndexMax(Double uvIndexMax) { this.uvIndexMax = uvIndexMax; }
        public Integer getWeatherCode() { return weatherCode; }
        public void setWeatherCode(Integer weatherCode) { this.weatherCode = weatherCode; }
        public String getDayRecommendation() { return dayRecommendation; }
        public void setDayRecommendation(String dayRecommendation) { this.dayRecommendation = dayRecommendation; }
    }
    // Inner static class HourlyForecast
    public static class HourlyForecast {
        private String time;
        private Double temperature;
        private Integer precipitationProbability;
        private Double precipitation;
        private Double windSpeed;
        private Integer weatherCode;
        private Boolean safeForSpraying;
        public HourlyForecast() {}
        public HourlyForecast(String time, Double temperature, Integer precipitationProbability, 
                              Double precipitation, Double windSpeed, Integer weatherCode, 
                              Boolean safeForSpraying) {
            this.time = time;
            this.temperature = temperature;
            this.precipitationProbability = precipitationProbability;
            this.precipitation = precipitation;
            this.windSpeed = windSpeed;
            this.weatherCode = weatherCode;
            this.safeForSpraying = safeForSpraying;
        }
        public String getTime() { return time; }
        public void setTime(String time) { this.time = time; }
        public Double getTemperature() { return temperature; }
        public void setTemperature(Double temperature) { this.temperature = temperature; }
        public Integer getPrecipitationProbability() { return precipitationProbability; }
        public void setPrecipitationProbability(Integer precipitationProbability) { this.precipitationProbability = precipitationProbability; }
        public Double getPrecipitation() { return precipitation; }
        public void setPrecipitation(Double precipitation) { this.precipitation = precipitation; }
        public Double getWindSpeed() { return windSpeed; }
        public void setWindSpeed(Double windSpeed) { this.windSpeed = windSpeed; }
        public Integer getWeatherCode() { return weatherCode; }
        public void setWeatherCode(Integer weatherCode) { this.weatherCode = weatherCode; }
        public Boolean getSafeForSpraying() { return safeForSpraying; }
        public void setSafeForSpraying(Boolean safeForSpraying) { this.safeForSpraying = safeForSpraying; }
    }
}

