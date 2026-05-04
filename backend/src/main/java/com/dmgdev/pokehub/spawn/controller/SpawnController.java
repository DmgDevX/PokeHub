package com.dmgdev.pokehub.spawn.controller;

import com.dmgdev.pokehub.spawn.dto.SpawnPredictionResponse;
import com.dmgdev.pokehub.spawn.service.SpawnService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spawn")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SpawnController {

    private final SpawnService spawnService;

    @GetMapping("/predictions")
    public List<SpawnPredictionResponse> getPredictions(
            @RequestParam String city,
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam String geographicZone,
            @RequestParam(defaultValue = "1") List<Integer> generations
    ) {
        return spawnService.getPredictions(
                city,
                lat,
                lon,
                geographicZone,
                generations
        );
    }
}