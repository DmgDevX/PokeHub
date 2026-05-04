package com.dmgdev.pokehub.map.city.controller;

import com.dmgdev.pokehub.map.city.dto.CityMarkerResponse;
import com.dmgdev.pokehub.map.city.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/map/cities")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CityController {

    private final CityService cityService;

    @GetMapping
    public List<CityMarkerResponse> getSpanishCities() {
        return cityService.getSpanishCities();
    }
}