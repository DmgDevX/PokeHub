package com.dmgdev.pokehub.spawn.client;

import com.dmgdev.pokehub.spawn.dto.PokemonSpawnCandidate;
import com.dmgdev.pokehub.spawn.model.GenerationRange;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PokeApiSpawnCandidateClient {

    private final RestClient restClient;
    private final Map<Integer, PokemonSpawnCandidate> pokemonCache = new ConcurrentHashMap<>();

    public PokeApiSpawnCandidateClient(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://pokeapi.co/api/v2")
                .build();
    }

    public List<PokemonSpawnCandidate> getCandidatesByGenerations(List<Integer> generations) {
        List<PokemonSpawnCandidate> candidates = new ArrayList<>();

        for (Integer generation : generations) {
            GenerationRange range = GenerationRange.fromGeneration(generation);

            for (int id = range.getStartId(); id <= range.getEndId(); id++) {
                PokemonSpawnCandidate candidate = getPokemonById(id);

                if (candidate != null) {
                    candidates.add(candidate);
                }
            }
        }

        return candidates.stream()
                .sorted(Comparator.comparing(PokemonSpawnCandidate::id))
                .toList();
    }

    private PokemonSpawnCandidate getPokemonById(Integer id) {
        if (pokemonCache.containsKey(id)) {
            return pokemonCache.get(id);
        }

        try {
            Map<String, Object> response = restClient.get()
                    .uri("/pokemon/{id}", id)
                    .retrieve()
                    .body(new ParameterizedTypeReference<>() {
                    });

            if (response == null) {
                return null;
            }

            String name = String.valueOf(response.get("name"));

            List<Map<String, Object>> typesResponse =
                    (List<Map<String, Object>>) response.get("types");

            List<String> types = typesResponse.stream()
                    .map(typeSlot -> (Map<String, Object>) typeSlot.get("type"))
                    .map(typeData -> String.valueOf(typeData.get("name")))
                    .toList();

            PokemonSpawnCandidate candidate = new PokemonSpawnCandidate(
                    id,
                    name,
                    getImageUrl(id),
                    types
            );

            pokemonCache.put(id, candidate);

            return candidate;
        } catch (Exception e) {
            return null;
        }
    }

    private String getImageUrl(Integer id) {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
                + id
                + ".png";
    }
}