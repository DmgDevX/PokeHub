package com.dmgdev.pokehub.ai.dto;

import java.util.List;

public record DeckAnalysisRequest(
        String deckName,
        List<DeckCardDto> cards
) {
    public record DeckCardDto(
            String cardId,
            String name,
            String category,
            String type,
            String rarity,
            Integer quantity
    ) {
    }
}