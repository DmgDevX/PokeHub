package com.dmgdev.pokehub.pokemon.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class PokeApiClient {

    private final RestClient restClient;

    @Value("${pokeapi.base-url}")
    private String baseUrl;

    @SuppressWarnings("unchecked")
    public Map<String, Object> getPokemonList(int limit, int offset) {
        return restClient.get()
                .uri(baseUrl + "/pokemon?limit={limit}&offset={offset}", limit, offset)
                .retrieve()
                .body(Map.class);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getPokemonByName(String name) {
        return restClient.get()
                .uri(baseUrl + "/pokemon/{name}", name.toLowerCase())
                .retrieve()
                .body(Map.class);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getAllPokemonBasicList() {
        return restClient.get()
                .uri(baseUrl + "/pokemon?limit=2000&offset=0")
                .retrieve()
                .body(Map.class);
    }
}

