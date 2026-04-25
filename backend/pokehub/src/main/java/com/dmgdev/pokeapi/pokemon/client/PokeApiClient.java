<<<<<<<< HEAD:backend/pokehub/src/main/java/com/dmgdev/pokehub/pokeapi/client/PokeApiClient.java
package com.dmgdev.pokehub.pokeapi.client;
========
package com.dmgdev.pokeapi.pokemon.client;
>>>>>>>> 603e74f3a7d05631e141d5394c63ee73b954b46e:backend/pokehub/src/main/java/com/dmgdev/pokeapi/pokemon/client/PokeApiClient.java

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