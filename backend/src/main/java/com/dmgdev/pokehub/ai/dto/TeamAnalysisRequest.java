package com.dmgdev.pokehub.ai.dto;

import java.util.List;

public record TeamAnalysisRequest(
        String teamName,
        List<TeamPokemonDto> pokemon
) {
    public record TeamPokemonDto(
            String name,
            List<String> types,
            String ability,
            List<String> moves,
            PokemonStatsDto stats
    ) {
    }

    public record PokemonStatsDto(
            Integer hp,
            Integer attack,
            Integer defense,
            Integer specialAttack,
            Integer specialDefense,
            Integer speed
    ) {
    }
}