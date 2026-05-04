package com.dmgdev.pokehub.map.weather.dto;

public record WeatherSnapshotResponse(
        String city,
        Double latitude,
        Double longitude,
        Double temperature,
        Double humidity,
        Double windSpeed,
        String condition
) {
}