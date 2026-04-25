package com.dmgdev.pokehub.tcg.service;

import com.dmgdev.pokehub.tcg.client.TcgDexClient;
import com.dmgdev.pokehub.tcg.dto.TcgCardDetailResponse;
import com.dmgdev.pokehub.tcg.dto.TcgCardPageResponse;
import com.dmgdev.pokehub.tcg.dto.TcgCardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class TcgCardService {

    private static final int VISIBLE_PAGE_SIZE = 20;
    private static final int API_BATCH_SIZE = 40;

    private final TcgDexClient tcgDexClient;

    public TcgCardPageResponse getCards(String search, String pokemon, String rarity, String category, int page) {
        String effectiveSearch = hasText(pokemon) ? pokemon : search;

        int safePage = Math.max(page, 0);
        int apiPage = (safePage / 2) + 1;
        int startIndex = (safePage % 2) * VISIBLE_PAGE_SIZE;
        int endIndex = startIndex + VISIBLE_PAGE_SIZE;

        List<TcgCardResponse> batch = getCachedCardsBatch(
                apiPage,
                effectiveSearch,
                rarity,
                category
        );

        List<TcgCardResponse> visibleCards = batch.stream()
                .skip(startIndex)
                .limit(VISIBLE_PAGE_SIZE)
                .toList();

        boolean hasMore = batch.size() > endIndex || batch.size() == API_BATCH_SIZE;

        return new TcgCardPageResponse(
                visibleCards,
                safePage,
                VISIBLE_PAGE_SIZE,
                hasMore
        );
    }

    @Cacheable(
            value = "tcgCards",
            key = "#apiPage + '-' + #search + '-' + #rarity + '-' + #category"
    )
    public List<TcgCardResponse> getCachedCardsBatch(
            int apiPage,
            String search,
            String rarity,
            String category
    ) {
        List<Map<String, Object>> response = tcgDexClient.getCardsBatch(
                apiPage,
                API_BATCH_SIZE,
                normalize(search),
                normalize(rarity),
                normalize(category)
        );

        return response.stream()
                .map(this::mapCardBrief)
                .toList();
    }

    public TcgCardDetailResponse getCardById(String id) {
        Map<String, Object> response = tcgDexClient.getCardById(id);
        Map<String, Object> set = (Map<String, Object>) response.get("set");

        List<String> types = response.get("types") instanceof List<?>
                ? ((List<Object>) response.get("types")).stream().map(String::valueOf).toList()
                : List.of();

        return new TcgCardDetailResponse(
                getString(response, "id"),
                getString(response, "name"),
                normalizeImageUrl(getString(response, "image")),
                getString(response, "localId"),
                getString(response, "category"),
                getString(response, "illustrator"),
                getString(response, "rarity"),
                set != null ? getString(set, "name") : null,
                types
        );
    }

    private TcgCardResponse mapCardBrief(Map<String, Object> card) {
        Map<String, Object> set = (Map<String, Object>) card.get("set");

        return new TcgCardResponse(
                getString(card, "id"),
                getString(card, "name"),
                normalizeImageUrl(getString(card, "image")),
                getString(card, "localId"),
                getString(card, "category"),
                getString(card, "rarity"),
                set != null ? getString(set, "name") : null
        );
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }

    private String normalize(String value) {
        return hasText(value) ? value.trim() : null;
    }

    private String getString(Map<String, Object> map, String key) {
        Object value = map.get(key);
        return value != null ? String.valueOf(value) : null;
    }

    private String normalizeImageUrl(String image) {
        if (image == null || image.isBlank()) return null;
        if (image.endsWith(".png") || image.endsWith(".jpg") || image.endsWith(".webp")) return image;
        return image + "/high.png";
    }

    @Cacheable("tcgCategories")
    public List<String> getCategories() {
        return tcgDexClient.getCategories();
    }

    @Cacheable("tcgRarities")
    public List<String> getRarities() {
        return tcgDexClient.getRarities();
    }
}