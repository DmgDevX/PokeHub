package com.dmgdev.pokehub.tcg.dto;

import java.util.List;

public record TcgCardPageResponse(
        List<TcgCardResponse> cards,
        int page,
        int size,
        boolean hasMore
) {}