package com.dmgdev.pokehub.spawn.dto;

import java.util.List;

public record PokemonSpawnCandidate(
        Integer id,
        String name,
        String imageUrl,
        List<String> types
) {
}