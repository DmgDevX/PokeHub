package com.dmgdev.pokehub.ai.dto;

import java.util.List;

public record GeminiRequest(
        List<Content> contents,
        GenerationConfig generationConfig
) {
    public record Content(
            String role,
            List<Part> parts
    ) {
    }

    public record Part(
            String text
    ) {
    }

    public record GenerationConfig(
            Double temperature,
            Integer maxOutputTokens,
            String responseMimeType
    ) {
    }

    public static GeminiRequest fromPrompt(String prompt) {
        return new GeminiRequest(
                List.of(
                        new Content(
                                "user",
                                List.of(new Part(prompt))
                        )
                ),
                new GenerationConfig(
                        0.2,
                        4096,
                        "application/json"
                )
        );
    }
}