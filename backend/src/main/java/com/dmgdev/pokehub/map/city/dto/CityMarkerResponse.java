package com.dmgdev.pokehub.map.city.dto;

public record CityMarkerResponse(
        String name,
        String country,
        Double latitude,
        Double longitude,
        String geographicZone
) {
}