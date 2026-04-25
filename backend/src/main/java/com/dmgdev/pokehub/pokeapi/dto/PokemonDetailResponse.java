package com.dmgdev.pokehub.pokeapi.dto;

import java.util.List;

public record PokemonDetailResponse(
        Integer id,
        String name,
        Integer height,
        Integer weight,
        List<PokemonTypeResponse> types,
        List<String> abilities,
        List<PokemonMoveResponse> moves,
        List<PokemonEvolutionResponse> evolutions,
        String image
) {}