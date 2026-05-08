package com.dmgdev.pokehub.ai.client;

import com.dmgdev.pokehub.ai.config.GeminiProperties;
import com.dmgdev.pokehub.ai.dto.GeminiRequest;
import com.dmgdev.pokehub.ai.dto.GeminiResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GeminiClient {

    private final RestClient restClient;
    private final GeminiProperties properties;

    public GeminiClient(RestClient.Builder restClientBuilder, GeminiProperties properties) {
        this.properties = properties;
        this.restClient = restClientBuilder
                .baseUrl(properties.baseUrl())
                .build();
    }

    public String generateJson(String prompt) {
        if (!properties.isEnabled()) {
            throw new IllegalStateException("Gemini está desactivado en la configuración.");
        }

        if (properties.apiKey() == null || properties.apiKey().isBlank()) {
            throw new IllegalStateException("No se ha configurado la API key de Gemini.");
        }

        if (prompt != null && prompt.length() > properties.getMaxInputLength()) {
            throw new IllegalArgumentException("El prompt enviado a Gemini es demasiado largo.");
        }

        GeminiRequest request = GeminiRequest.fromPrompt(prompt);

        GeminiResponse response = restClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/models/{model}:generateContent")
                        .queryParam("key", properties.apiKey())
                        .build(properties.model()))
                .body(request)
                .retrieve()
                .body(GeminiResponse.class);

        if (response == null) {
            throw new IllegalStateException("Gemini no devolvió respuesta.");
        }

        String text = response.extractText();

        if (text == null || text.isBlank()) {
            throw new IllegalStateException("Gemini devolvió una respuesta vacía.");
        }

        return text;
    }
}