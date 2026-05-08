package com.dmgdev.pokehub.ai.dto;

import java.util.List;

public record AiAnalysisResponse(
        String title,
        String summary,
        List<String> strengths,
        List<String> weaknesses,
        List<String> risks,
        List<AiRecommendationDto> recommendations
) {
}