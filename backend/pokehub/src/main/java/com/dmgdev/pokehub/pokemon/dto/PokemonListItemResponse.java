package com.dmgdev.pokehub.pokemon.dto;

public record PokemonListItemResponse(
        String name,
        String url,
        Integer id,
        String image
) {}