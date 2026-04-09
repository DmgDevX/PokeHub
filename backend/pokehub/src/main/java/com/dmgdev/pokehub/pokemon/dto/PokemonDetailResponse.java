package com.dmgdev.pokehub.pokemon.dto;

import java.util.List;

public record PokemonDetailResponse(
        Integer id,
        String name,
        Integer height,
        Integer weight,
        List<String> types,
        List<String> abilities,
        List<String> moves,
        String image
) {}