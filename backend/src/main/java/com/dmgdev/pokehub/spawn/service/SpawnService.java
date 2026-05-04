package com.dmgdev.pokehub.spawn.service;

import com.dmgdev.pokehub.map.weather.dto.WeatherSnapshotResponse;
import com.dmgdev.pokehub.map.weather.service.WeatherService;
import com.dmgdev.pokehub.spawn.client.PokeApiSpawnCandidateClient;
import com.dmgdev.pokehub.spawn.dto.PokemonSpawnCandidate;
import com.dmgdev.pokehub.spawn.dto.SpawnPredictionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpawnService {

    private final WeatherService weatherService;
    private final PokeApiSpawnCandidateClient pokeApiSpawnCandidateClient;

    public List<SpawnPredictionResponse> getPredictions(
        String city,
        double latitude,
        double longitude,
        String geographicZone,
        List<Integer> generations
) {
    WeatherSnapshotResponse weather = weatherService.getCurrentWeather(city, latitude, longitude);

    List<PokemonSpawnCandidate> candidates =
            pokeApiSpawnCandidateClient.getCandidatesByGenerations(generations);

    return candidates.stream()
            .map(candidate -> calculate(candidate, weather, geographicZone))
            .sorted(Comparator.comparing(SpawnPredictionResponse::probability).reversed())
            .limit(20)
            .toList();
}

    private SpawnPredictionResponse calculate(
        PokemonSpawnCandidate pokemon,
        WeatherSnapshotResponse weather,
        String geographicZone
    ) {
        double probability = 0.25;
        String reason = "Condiciones neutras para este Pokémon";

        String condition = weather.condition().toLowerCase();
        double temperature = weather.temperature();
        double humidity = weather.humidity();

        List<String> types = pokemon.types();

        if (types.contains("water") && isRain(condition)) {
            probability += 0.40;
            reason = "La lluvia favorece a los Pokémon de tipo agua";
        }

        if (types.contains("fire") && temperature >= 28) {
            probability += 0.40;
            reason = "Las temperaturas altas favorecen a los Pokémon de tipo fuego";
        }

        if (types.contains("grass") && humidity >= 60) {
            probability += 0.35;
            reason = "La humedad favorece a los Pokémon de tipo planta";
        }

        if (types.contains("ice") && temperature <= 5) {
            probability += 0.45;
            reason = "El frío favorece a los Pokémon de tipo hielo";
        }

        if (types.contains("electric") && isStorm(condition)) {
            probability += 0.45;
            reason = "Las tormentas favorecen a los Pokémon de tipo eléctrico";
        }

        if (types.contains("rock") && temperature >= 22 && humidity < 50) {
            probability += 0.25;
            reason = "El clima seco favorece a los Pokémon de tipo roca";
        }

        if (types.contains("ground") && temperature >= 24 && humidity < 55) {
            probability += 0.25;
            reason = "El terreno seco y cálido favorece a los Pokémon de tipo tierra";
        }

        if (types.contains("flying") && weather.windSpeed() >= 18) {
            probability += 0.25;
            reason = "El viento favorece a los Pokémon de tipo volador";
        }

        if (types.contains("ghost") && isFog(condition)) {
            probability += 0.35;
            reason = "La niebla favorece a los Pokémon de tipo fantasma";
        }

        if (types.contains("bug") && humidity >= 55 && temperature >= 18) {
            probability += 0.25;
            reason = "La humedad y temperatura suave favorecen a los Pokémon de tipo bicho";
        }

        double geographicBonus = calculateGeographicBonus(types, geographicZone);

        if (geographicBonus > 0) {
            probability += geographicBonus;
            reason = reason + " y la zona geográfica también favorece su aparición";
        }

        probability = Math.min(probability, 0.95);

        return new SpawnPredictionResponse(
                pokemon.id(),
                pokemon.name(),
                pokemon.imageUrl(),
                pokemon.types(),
                probability,
                reason
        );
    }

        private boolean isRain(String condition) {
            return condition.contains("lluvia")
                    || condition.contains("chubascos");
        }

        private boolean isStorm(String condition) {
            return condition.contains("tormenta");
        }

        private boolean isFog(String condition) {
            return condition.contains("niebla");
        }

        private double calculateGeographicBonus(List<String> types, String geographicZone) {
        if (geographicZone == null) {
            return 0.0;
        }

        return switch (geographicZone.toLowerCase()) {
            case "coast" -> {
                if (types.contains("water")) yield 0.25;
                if (types.contains("flying")) yield 0.15;
                yield 0.0;
            }

            case "mountain" -> {
                if (types.contains("rock")) yield 0.25;
                if (types.contains("ground")) yield 0.20;
                if (types.contains("ice")) yield 0.15;
                if (types.contains("fighting")) yield 0.10;
                yield 0.0;
            }

            case "inland" -> {
                if (types.contains("ground")) yield 0.20;
                if (types.contains("normal")) yield 0.15;
                if (types.contains("grass")) yield 0.10;
                yield 0.0;
            }

            case "island" -> {
                if (types.contains("water")) yield 0.25;
                if (types.contains("flying")) yield 0.20;
                if (types.contains("dragon")) yield 0.10;
                yield 0.0;
            }

            case "north" -> {
                if (types.contains("grass")) yield 0.20;
                if (types.contains("water")) yield 0.15;
                if (types.contains("bug")) yield 0.15;
                if (types.contains("ice")) yield 0.10;
                yield 0.0;
            }

            case "south" -> {
                if (types.contains("fire")) yield 0.25;
                if (types.contains("ground")) yield 0.20;
                if (types.contains("rock")) yield 0.15;
                yield 0.0;
            }

            case "urban" -> {
                if (types.contains("electric")) yield 0.20;
                if (types.contains("normal")) yield 0.15;
                if (types.contains("poison")) yield 0.10;
                yield 0.0;
            }

            default -> 0.0;
        };
    }
}