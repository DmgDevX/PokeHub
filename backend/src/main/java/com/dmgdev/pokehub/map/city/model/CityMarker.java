package com.dmgdev.pokehub.map.city.model;

public record CityMarker(
        String name,
        String country,
        double latitude,
        double longitude
) {
}