package com.dmgdev.pokehub.map.city.service;

import com.dmgdev.pokehub.map.city.data.SpanishCityCatalog;
import com.dmgdev.pokehub.map.city.dto.CityMarkerResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    public List<CityMarkerResponse> getSpanishCities() {
        return SpanishCityCatalog.getCities();
    }
}