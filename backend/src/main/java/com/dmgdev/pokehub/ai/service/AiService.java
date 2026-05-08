package com.dmgdev.pokehub.ai.service;

import com.dmgdev.pokehub.ai.client.GeminiClient;
import com.dmgdev.pokehub.ai.dto.AiAnalysisResponse;
import com.dmgdev.pokehub.ai.dto.AiTextResponse;
import com.dmgdev.pokehub.ai.dto.DeckAnalysisRequest;
import com.dmgdev.pokehub.ai.dto.SpawnExplanationRequest;
import com.dmgdev.pokehub.ai.dto.TeamAnalysisRequest;
import org.springframework.stereotype.Service;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

@Service
public class AiService {

    private final GeminiClient geminiClient;
    private final AiPromptBuilder promptBuilder;
    private final ObjectMapper objectMapper;

    public AiService(
            GeminiClient geminiClient,
            AiPromptBuilder promptBuilder,
            ObjectMapper objectMapper
    ) {
        this.geminiClient = geminiClient;
        this.promptBuilder = promptBuilder;
        this.objectMapper = objectMapper;
    }

    public AiAnalysisResponse analyzeTeam(TeamAnalysisRequest request) {
        String prompt = promptBuilder.buildTeamAnalysisPrompt(request);
        String json = geminiClient.generateJson(prompt);
        return parseAnalysisResponse(json);
    }

    public AiAnalysisResponse recommendPokemon(TeamAnalysisRequest request) {
        String prompt = promptBuilder.buildTeamRecommendationPrompt(request);
        String json = geminiClient.generateJson(prompt);
        return parseAnalysisResponse(json);
    }

    public AiAnalysisResponse analyzeDeck(DeckAnalysisRequest request) {
        String prompt = promptBuilder.buildDeckAnalysisPrompt(request);
        String json = geminiClient.generateJson(prompt);
        return parseAnalysisResponse(json);
    }

    public AiAnalysisResponse recommendCards(DeckAnalysisRequest request) {
        String prompt = promptBuilder.buildDeckRecommendationPrompt(request);
        String json = geminiClient.generateJson(prompt);
        return parseAnalysisResponse(json);
    }

    public AiTextResponse explainSpawns(SpawnExplanationRequest request) {
        String prompt = promptBuilder.buildSpawnExplanationPrompt(request);
        String json = geminiClient.generateJson(prompt);
        return parseTextResponse(json);
    }

    private AiAnalysisResponse parseAnalysisResponse(String json) {
        try {
            return objectMapper.readValue(cleanJson(json), AiAnalysisResponse.class);
        } catch (JacksonException exception) {
            throw new IllegalStateException("No se pudo interpretar la respuesta de Gemini como análisis de IA.", exception);
        }
    }

    private AiTextResponse parseTextResponse(String json) {
        try {
            return objectMapper.readValue(cleanJson(json), AiTextResponse.class);
        } catch (JacksonException exception) {
            throw new IllegalStateException("No se pudo interpretar la respuesta de Gemini como explicación de IA.", exception);
        }
    }

    private String cleanJson(String value) {
        if (value == null) {
            return "";
        }

        String cleaned = value
                .replace("```json", "")
                .replace("```", "")
                .trim();

        int firstBrace = cleaned.indexOf("{");
        int lastBrace = cleaned.lastIndexOf("}");

        if (firstBrace >= 0 && lastBrace > firstBrace) {
            return cleaned.substring(firstBrace, lastBrace + 1);
        }

        return cleaned;
    }
}