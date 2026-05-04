package com.dmgdev.pokehub.map.weather.client;

import com.dmgdev.pokehub.map.weather.dto.WeatherSnapshotResponse;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class OpenMeteoClient {

    private final RestClient restClient;

    public OpenMeteoClient(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://api.open-meteo.com")
                .build();
    }

    public WeatherSnapshotResponse getCurrentWeather(
            String city,
            double latitude,
            double longitude
    ) {
        Map<String, Object> response = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/forecast")
                        .queryParam("latitude", latitude)
                        .queryParam("longitude", longitude)
                        .queryParam("current", "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m")
                        .queryParam("timezone", "auto")
                        .build())
                .retrieve()
                .body(new ParameterizedTypeReference<>() {
                });

        if (response == null || response.get("current") == null) {
            throw new RuntimeException("No se pudo obtener el clima actual");
        }

        Map<String, Object> current = (Map<String, Object>) response.get("current");

        Double temperature = toDouble(current.get("temperature_2m"));
        Double humidity = toDouble(current.get("relative_humidity_2m"));
        Double windSpeed = toDouble(current.get("wind_speed_10m"));
        Integer weatherCode = Integer.valueOf(String.valueOf(current.get("weather_code")));

        return new WeatherSnapshotResponse(
                city,
                latitude,
                longitude,
                temperature,
                humidity,
                windSpeed,
                mapWeatherCode(weatherCode)
        );
    }

    private Double toDouble(Object value) {
        return Double.valueOf(String.valueOf(value));
    }

    private String mapWeatherCode(Integer code) {
        if (code == 0) return "Soleado";
        if (code >= 1 && code <= 3) return "Parcialmente nublado";
        if (code == 45 || code == 48) return "Niebla";
        if (code >= 51 && code <= 67) return "Lluvia";
        if (code >= 71 && code <= 77) return "Nieve";
        if (code >= 80 && code <= 82) return "Chubascos";
        if (code >= 95) return "Tormenta";

        return "Desconocido";
    }
}