package com.dmgdev.pokehub.map.weather.service;

import com.dmgdev.pokehub.map.weather.client.OpenMeteoClient;
import com.dmgdev.pokehub.map.weather.dto.WeatherSnapshotResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final OpenMeteoClient openMeteoClient;

    public WeatherSnapshotResponse getCurrentWeather(
            String city,
            double latitude,
            double longitude
    ) {
        return openMeteoClient.getCurrentWeather(city, latitude, longitude);
    }
}