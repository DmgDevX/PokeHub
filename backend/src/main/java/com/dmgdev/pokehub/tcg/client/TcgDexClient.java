package com.dmgdev.pokehub.tcg.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class TcgDexClient {

    private final RestClient restClient;

    @Value("${tcgdex.base-url}")
    private String baseUrl;

    public List<Map<String, Object>> getCardsBatch(
            int apiPage,
            int itemsPerPage,
            String search,
            String rarity,
            String category
    ) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(baseUrl + "/cards")
                .queryParam("pagination:page", apiPage)
                .queryParam("pagination:itemsPerPage", itemsPerPage)
                .queryParam("sort:field", "releaseDate")
                .queryParam("sort:order", "DESC");

        if (search != null && !search.isBlank()) {
            builder.queryParam("name", search.trim());
        }

        if (rarity != null && !rarity.isBlank()) {
            builder.queryParam("rarity", rarity.trim());
        }

        if (category != null && !category.isBlank()) {
            builder.queryParam("category", category.trim());
        }

        URI uri = builder.build().encode().toUri();

        return restClient.get()
                .uri(uri)
                .retrieve()
                .body(List.class);
    }

    public Map<String, Object> getCardById(String id) {
        return restClient.get()
                .uri(baseUrl + "/cards/{id}", id)
                .retrieve()
                .body(Map.class);
    }

    public List<String> getCategories() {
        return restClient.get()
                .uri(baseUrl + "/categories")
                .retrieve()
                .body(List.class);
    }

    public List<String> getRarities() {
        return restClient.get()
                .uri(baseUrl + "/rarities")
                .retrieve()
                .body(List.class);
    }
}