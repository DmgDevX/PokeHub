package com.dmgdev.pokehub.ai.dto;

import java.util.List;

public record SpawnExplanationRequest(
        String city,
        WeatherContextDto weather,
        List<SpawnPokemonDto> spawns
) {
    public record WeatherContextDto(
            Double temperature,
            Integer humidity,
            String condition
    ) {
    }

    public record SpawnPokemonDto(
            String pokemonName,
            Double probability,
            String reason
    ) {
    }
}