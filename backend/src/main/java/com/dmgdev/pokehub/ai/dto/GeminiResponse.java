package com.dmgdev.pokehub.ai.dto;

import java.util.List;

public record GeminiResponse(
        List<Candidate> candidates
) {
    public record Candidate(
            Content content
    ) {
    }

    public record Content(
            List<Part> parts
    ) {
    }

    public record Part(
            String text
    ) {
    }

    public String extractText() {
        if (candidates == null || candidates.isEmpty()) {
            return "";
        }

        Content content = candidates.getFirst().content();

        if (content == null || content.parts() == null || content.parts().isEmpty()) {
            return "";
        }

        return content.parts()
                .stream()
                .map(Part::text)
                .filter(text -> text != null && !text.isBlank())
                .reduce("", String::concat)
                .trim();
    }
}