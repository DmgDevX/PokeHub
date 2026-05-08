package com.dmgdev.pokehub.ai.service;

import com.dmgdev.pokehub.ai.dto.DeckAnalysisRequest;
import com.dmgdev.pokehub.ai.dto.SpawnExplanationRequest;
import com.dmgdev.pokehub.ai.dto.TeamAnalysisRequest;
import org.springframework.stereotype.Component;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

@Component
public class AiPromptBuilder {

    private final ObjectMapper objectMapper;

    public AiPromptBuilder(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public String buildTeamAnalysisPrompt(TeamAnalysisRequest request) {
        return """
                Eres un asistente estratégico especializado en Pokémon.

                Analiza el siguiente equipo Pokémon usando únicamente los datos proporcionados.
                No inventes datos que no aparezcan en el JSON.
                Responde siempre en español.
                Devuelve únicamente JSON válido, sin markdown, sin ```json y sin texto adicional.

                El JSON de respuesta debe tener exactamente esta estructura:
                {
                  "title": "Análisis del equipo",
                  "summary": "Resumen general del equipo",
                  "strengths": ["Punto fuerte 1", "Punto fuerte 2"],
                  "weaknesses": ["Debilidad 1", "Debilidad 2"],
                  "risks": ["Riesgo 1", "Riesgo 2"],
                  "recommendations": [
                    {
                      "name": "Nombre del Pokémon recomendado o mejora",
                      "role": "Rol estratégico",
                      "reason": "Motivo de la recomendación"
                    }
                  ]
                }

                Ten en cuenta:
                - cobertura de tipos
                - equilibrio físico/especial
                - velocidad del equipo
                - debilidades repetidas
                - movimientos disponibles
                - habilidades seleccionadas
                - posibles roles: atacante físico, atacante especial, soporte, tanque, muro defensivo, revenge killer

                Equipo:
                %s
                """.formatted(toJson(request));
    }

    public String buildTeamRecommendationPrompt(TeamAnalysisRequest request) {
        return """
                Eres un asistente estratégico especializado en Pokémon.

                Usa frases breves. Cada resumen debe tener máximo 400 caracteres.
                Cada punto fuerte, debilidad, riesgo y recomendación debe ser breve.
                Recomienda Pokémon para completar o mejorar el siguiente equipo.
                Usa únicamente el contexto proporcionado.
                Responde siempre en español.
                Devuelve únicamente JSON válido, sin markdown, sin ```json y sin texto adicional.

                El JSON de respuesta debe tener exactamente esta estructura:
                {
                  "title": "Recomendación de Pokémon",
                  "summary": "Resumen breve de qué necesita el equipo",
                  "strengths": ["Aspecto positivo del equipo"],
                  "weaknesses": ["Hueco estratégico detectado"],
                  "risks": ["Riesgo si no se corrige"],
                  "recommendations": [
                    {
                      "name": "Nombre del Pokémon recomendado",
                      "role": "Rol que cumpliría",
                      "reason": "Por qué encaja en el equipo"
                    }
                  ]
                }

                Recomienda entre 3 y 5 opciones.
                Prioriza recomendaciones que cubran debilidades claras del equipo.

                Equipo:
                %s
                """.formatted(toJson(request));
    }

    public String buildDeckAnalysisPrompt(DeckAnalysisRequest request) {
        return """
                Eres un asistente estratégico especializado en Pokémon TCG.

                Analiza el siguiente deck usando únicamente las cartas proporcionadas.
                Responde siempre en español.
                Devuelve únicamente JSON válido, sin markdown, sin ```json y sin texto adicional.

                El JSON de respuesta debe tener exactamente esta estructura:
                {
                  "title": "Análisis del deck",
                  "summary": "Resumen general del deck",
                  "strengths": ["Punto fuerte 1", "Punto fuerte 2"],
                  "weaknesses": ["Debilidad 1", "Debilidad 2"],
                  "risks": ["Riesgo 1", "Riesgo 2"],
                  "recommendations": [
                    {
                      "name": "Carta o tipo de carta recomendada",
                      "role": "Función dentro del deck",
                      "reason": "Motivo de la recomendación"
                    }
                  ]
                }

                Evalúa:
                - balance entre Pokémon, Trainer y Energy
                - consistencia
                - dependencia de cartas concretas
                - curva de juego
                - sinergias por tipo
                - exceso o falta de cartas repetidas
                - posibles cartas de búsqueda, robo, energía o recuperación

                Deck:
                %s
                """.formatted(toJson(request));
    }

    public String buildDeckRecommendationPrompt(DeckAnalysisRequest request) {
        return """
                Eres un asistente estratégico especializado en Pokémon TCG.

                Recomienda cartas para mejorar el siguiente deck.
                Responde siempre en español.
                Devuelve únicamente JSON válido, sin markdown, sin ```json y sin texto adicional.

                El JSON de respuesta debe tener exactamente esta estructura:
                {
                  "title": "Recomendación de cartas",
                  "summary": "Resumen breve de qué necesita el deck",
                  "strengths": ["Aspecto positivo del deck"],
                  "weaknesses": ["Problema principal detectado"],
                  "risks": ["Riesgo si no se mejora"],
                  "recommendations": [
                    {
                      "name": "Nombre de carta recomendada o tipo de carta",
                      "role": "Función estratégica",
                      "reason": "Por qué mejoraría el deck"
                    }
                  ]
                }

                Recomienda entre 3 y 5 cartas o tipos de carta.
                Prioriza consistencia, robo, búsqueda, energía y sinergia.

                Deck:
                %s
                """.formatted(toJson(request));
    }

    public String buildSpawnExplanationPrompt(SpawnExplanationRequest request) {
        return """
                Eres un asistente experto en Pokémon, clima y hábitats.

                Explica por qué los Pokémon del siguiente ranking tienen sentido según la ciudad, el clima y las probabilidades.
                Responde siempre en español.
                Devuelve únicamente JSON válido, sin markdown, sin ```json y sin texto adicional.

                El JSON de respuesta debe tener exactamente esta estructura:
                {
                  "title": "Explicación de spawns",
                  "explanation": "Explicación clara y natural de por qué aparecen esos Pokémon en esta ciudad y bajo este clima."
                }

                Contexto de spawn:
                %s
                """.formatted(toJson(request));
    }

    private String toJson(Object value) {
        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(value);
        } catch (JacksonException exception) {
            throw new IllegalStateException("No se pudo convertir el contexto de IA a JSON.", exception);
        }
    }
}