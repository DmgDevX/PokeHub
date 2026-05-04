package com.dmgdev.pokehub.spawn.dto;

import java.util.List;

public record SpawnPredictionResponse(
        Integer pokemonId,
        String pokemonName,
        String imageUrl,
        List<String> types,
        Double probability,
        String reason
) {
}