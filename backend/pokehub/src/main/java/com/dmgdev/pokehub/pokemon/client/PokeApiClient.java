package com.dmgdev.pokehub.pokemon.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class PokeApiClient {

    private final RestClient restClient;

    @Value("${pokeapi.base-url}")
    private String baseUrl;

    public Map<String, Object> getPokemonList(int limit, int offset) {
        return restClient.get()
                .uri(baseUrl + "/pokemon?limit={limit}&offset={offset}", limit, offset)
                .retrieve()
                .body(Map.class);
    }

    public Map<String, Object> getPokemonByName(String name) {
        return restClient.get()
                .uri(baseUrl + "/pokemon/{name}", name.toLowerCase())
                .retrieve()
                .body(Map.class);
    }

    public Map<String, Object> getPokemonSpecies(String name) {
        return restClient.get()
                .uri(baseUrl + "/pokemon-species/{name}", name.toLowerCase())
                .retrieve()
                .body(Map.class);
    }

    public Map<String, Object> getAllPokemonBasicList() {
        return restClient.get()
                .uri(baseUrl + "/pokemon?limit=2000&offset=0")
                .retrieve()
                .body(Map.class);
    }

    public Map<String, Object> getResourceByUrl(String url) {
        return restClient.get()
                .uri(url)
                .retrieve()
                .body(Map.class);
    }
}