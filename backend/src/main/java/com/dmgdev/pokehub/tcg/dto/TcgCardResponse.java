package com.dmgdev.pokehub.tcg.dto;

public record TcgCardResponse(
        String id,
        String name,
        String image,
        String localId,
        String category,
        String rarity,
        String setName
) {}