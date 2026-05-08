package com.dmgdev.pokehub.ai.controller;

import com.dmgdev.pokehub.ai.dto.AiAnalysisResponse;
import com.dmgdev.pokehub.ai.dto.AiTextResponse;
import com.dmgdev.pokehub.ai.dto.DeckAnalysisRequest;
import com.dmgdev.pokehub.ai.dto.SpawnExplanationRequest;
import com.dmgdev.pokehub.ai.dto.TeamAnalysisRequest;
import com.dmgdev.pokehub.ai.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/team-analysis")
    public ResponseEntity<AiAnalysisResponse> analyzeTeam(@RequestBody TeamAnalysisRequest request) {
        return ResponseEntity.ok(aiService.analyzeTeam(request));
    }

    @PostMapping("/team-recommendation")
    public ResponseEntity<AiAnalysisResponse> recommendPokemon(@RequestBody TeamAnalysisRequest request) {
        return ResponseEntity.ok(aiService.recommendPokemon(request));
    }

    @PostMapping("/deck-analysis")
    public ResponseEntity<AiAnalysisResponse> analyzeDeck(@RequestBody DeckAnalysisRequest request) {
        return ResponseEntity.ok(aiService.analyzeDeck(request));
    }

    @PostMapping("/deck-recommendation")
    public ResponseEntity<AiAnalysisResponse> recommendCards(@RequestBody DeckAnalysisRequest request) {
        return ResponseEntity.ok(aiService.recommendCards(request));
    }

    @PostMapping("/spawn-explanation")
    public ResponseEntity<AiTextResponse> explainSpawns(@RequestBody SpawnExplanationRequest request) {
        return ResponseEntity.ok(aiService.explainSpawns(request));
    }
}