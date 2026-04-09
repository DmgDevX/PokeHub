package com.dmgdev.pokehub.pokemon.service;

import com.dmgdev.pokehub.pokemon.client.PokeApiClient;
import com.dmgdev.pokehub.pokemon.dto.PokemonDetailResponse;
import com.dmgdev.pokehub.pokemon.dto.PokemonListItemResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PokemonService {

    private final PokeApiClient pokeApiClient;

    @SuppressWarnings("unchecked")
    public List<PokemonListItemResponse> getPokemonList(int limit, int offset) {
        Map<String, Object> response = pokeApiClient.getPokemonList(limit, offset);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        return mapPokemonList(results);
    }

    @SuppressWarnings("unchecked")
    public List<PokemonListItemResponse> searchPokemon(String search) {
        Map<String, Object> response = pokeApiClient.getAllPokemonBasicList();
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

        String normalizedSearch = search.trim().toLowerCase();

        return results.stream()
                .filter(item -> {
                    String name = (String) item.get("name");
                    return name != null && name.toLowerCase().contains(normalizedSearch);
                })
                .map(this::mapPokemonListItem)
                .toList();
    }

    @SuppressWarnings("unchecked")
    public PokemonDetailResponse getPokemonByName(String name) {
        Map<String, Object> response = pokeApiClient.getPokemonByName(name);

        Integer id = (Integer) response.get("id");
        String pokemonName = (String) response.get("name");
        Integer height = (Integer) response.get("height");
        Integer weight = (Integer) response.get("weight");

        List<String> types = ((List<Map<String, Object>>) response.get("types")).stream()
                .map(typeEntry -> (Map<String, Object>) typeEntry.get("type"))
                .map(type -> (String) type.get("name"))
                .toList();

        List<String> abilities = ((List<Map<String, Object>>) response.get("abilities")).stream()
                .map(abilityEntry -> (Map<String, Object>) abilityEntry.get("ability"))
                .map(ability -> (String) ability.get("name"))
                .toList();

        List<String> moves = ((List<Map<String, Object>>) response.get("moves")).stream()
                .limit(10)
                .map(moveEntry -> (Map<String, Object>) moveEntry.get("move"))
                .map(move -> (String) move.get("name"))
                .toList();

        return new PokemonDetailResponse(
                id,
                pokemonName,
                height,
                weight,
                types,
                abilities,
                moves,
                getOfficialArtworkUrl(id)
        );
    }

    public List<String> getPokemonMoves(String name) {
        return getPokemonByName(name).moves();
    }

    public List<String> getPokemonAbilities(String name) {
        return getPokemonByName(name).abilities();
    }

    private List<PokemonListItemResponse> mapPokemonList(List<Map<String, Object>> results) {
        return results.stream()
                .map(this::mapPokemonListItem)
                .toList();
    }

    private PokemonListItemResponse mapPokemonListItem(Map<String, Object> item) {
        String name = (String) item.get("name");
        String url = (String) item.get("url");
        Integer id = extractPokemonId(url);
        String image = getOfficialArtworkUrl(id);

        return new PokemonListItemResponse(name, url, id, image);
    }

    private Integer extractPokemonId(String url) {
        String cleanUrl = url.endsWith("/") ? url.substring(0, url.length() - 1) : url;
        return Integer.parseInt(cleanUrl.substring(cleanUrl.lastIndexOf("/") + 1));
    }

    private String getOfficialArtworkUrl(Integer id) {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png";
    }
}