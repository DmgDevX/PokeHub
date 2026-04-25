package com.dmgdev.pokeapi.pokemon.dto;

public record PokemonEvolutionResponse(
        Integer id,
        String name,
        String image
) {}