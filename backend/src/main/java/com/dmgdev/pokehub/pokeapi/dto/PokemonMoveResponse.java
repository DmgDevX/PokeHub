package com.dmgdev.pokehub.pokeapi.dto;

public record PokemonMoveResponse(
        String name,
        String learnMethod,
        Integer levelLearnedAt
) {}