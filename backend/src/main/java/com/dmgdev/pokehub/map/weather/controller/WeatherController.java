package com.dmgdev.pokehub.map.weather.controller;

import com.dmgdev.pokehub.map.weather.dto.WeatherSnapshotResponse;
import com.dmgdev.pokehub.map.weather.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/map/weather")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping
    public WeatherSnapshotResponse getCurrentWeather(
            @RequestParam String city,
            @RequestParam double lat,
            @RequestParam double lon
    ) {
        return weatherService.getCurrentWeather(city, lat, lon);
    }
}