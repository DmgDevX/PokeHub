package com.dmgdev.pokehub.tcg.dto;

import java.util.List;

public record TcgCardDetailResponse(
        String id,
        String name,
        String image,
        String localId,
        String category,
        String illustrator,
        String rarity,
        String setName,
        List<String> types
) {}