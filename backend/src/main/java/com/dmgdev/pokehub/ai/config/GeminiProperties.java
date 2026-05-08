package com.dmgdev.pokehub.ai.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "gemini")
public record GeminiProperties(
        String apiKey,
        String model,
        String baseUrl,
        Boolean enabled,
        Integer maxInputLength
) {
    public boolean isEnabled() {
        return enabled == null || enabled;
    }

    public int getMaxInputLength() {
        return maxInputLength == null ? 12000 : maxInputLength;
    }
}