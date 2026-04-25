package com.dmgdev.pokehub.pokeapi.dto;

public record PokemonListItemResponse(
        String name,
        String url,
        Integer id,
        String image
) {}