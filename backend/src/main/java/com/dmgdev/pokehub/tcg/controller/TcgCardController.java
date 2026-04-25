package com.dmgdev.pokehub.tcg.controller;

import com.dmgdev.pokehub.tcg.dto.TcgCardDetailResponse;
import com.dmgdev.pokehub.tcg.dto.TcgCardPageResponse;
import com.dmgdev.pokehub.tcg.service.TcgCardService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tcg/cards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TcgCardController {

    private final TcgCardService tcgCardService;

    @GetMapping
    public TcgCardPageResponse getCards(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String pokemon,
            @RequestParam(required = false) String rarity,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page
    ) {
        return tcgCardService.getCards(search, pokemon, rarity, category, page);
    }

    @GetMapping("/{id}")
    public TcgCardDetailResponse getCardById(@PathVariable String id) {
        return tcgCardService.getCardById(id);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return tcgCardService.getCategories();
    }

    @GetMapping("/rarities")
    public List<String> getRarities() {
        return tcgCardService.getRarities();
    }
}