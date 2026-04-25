package com.dmgdev.pokeapi.pokemon.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.dmgdev.pokeapi.pokemon.client.PokeApiClient;
import com.dmgdev.pokeapi.pokemon.dto.PokemonDetailResponse;
import com.dmgdev.pokeapi.pokemon.dto.PokemonEvolutionResponse;
import com.dmgdev.pokeapi.pokemon.dto.PokemonListItemResponse;
import com.dmgdev.pokeapi.pokemon.dto.PokemonTypeResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@SuppressWarnings("unchecked")
public class PokemonService {

    private final PokeApiClient pokeApiClient;

    public List<PokemonListItemResponse> getPokemonList(int limit, int offset) {
        Map<String, Object> response = pokeApiClient.getPokemonList(limit, offset);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        return mapPokemonList(results);
    }

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

    public PokemonDetailResponse getPokemonByName(String name) {
        Map<String, Object> response = pokeApiClient.getPokemonByName(name);

        Integer id = (Integer) response.get("id");
        String pokemonName = capitalize((String) response.get("name"));
        Integer height = (Integer) response.get("height");
        Integer weight = (Integer) response.get("weight");

        List<PokemonTypeResponse> types = ((List<Map<String, Object>>) response.get("types")).stream()
                .map(typeEntry -> (Map<String, Object>) typeEntry.get("type"))
                .map(type -> {
                    String key = (String) type.get("name");
                    String url = (String) type.get("url");
                    String translated = getSpanishNameFromResource(url);
                    return new PokemonTypeResponse(
                            key,
                            capitalize(translated != null ? translated : key)
                    );
                })
                .toList();

        List<String> abilities = ((List<Map<String, Object>>) response.get("abilities")).stream()
                .map(abilityEntry -> (Map<String, Object>) abilityEntry.get("ability"))
                .map(ability -> {
                    String fallbackName = (String) ability.get("name");
                    String url = (String) ability.get("url");
                    String translated = getSpanishNameFromResource(url);
                    return capitalize(translated != null ? translated : fallbackName);
                })
                .toList();

        List<String> moves = ((List<Map<String, Object>>) response.get("moves")).stream()
                .map(moveEntry -> (Map<String, Object>) moveEntry.get("move"))
                .map(move -> {
                    String fallbackName = (String) move.get("name");
                    String url = (String) move.get("url");
                    String translated = getSpanishNameFromResource(url);
                    return capitalize(translated != null ? translated : fallbackName);
                })
                .toList();

        List<PokemonEvolutionResponse> evolutions = getEvolutionLine(name);

        return new PokemonDetailResponse(
                id,
                pokemonName,
                height,
                weight,
                types,
                abilities,
                moves,
                evolutions,
                getOfficialArtworkUrl(id)
        );
    }

    public List<String> getPokemonMoves(String name) {
        return getPokemonByName(name).moves();
    }

    public List<String> getPokemonAbilities(String name) {
        return getPokemonByName(name).abilities();
    }

    private List<PokemonEvolutionResponse> getEvolutionLine(String name) {
        Map<String, Object> speciesResponse = pokeApiClient.getPokemonSpecies(name);
        Map<String, Object> evolutionChain = (Map<String, Object>) speciesResponse.get("evolution_chain");

        if (evolutionChain == null || evolutionChain.get("url") == null) {
            return List.of();
        }

        String evolutionChainUrl = (String) evolutionChain.get("url");
        Map<String, Object> evolutionResponse = pokeApiClient.getResourceByUrl(evolutionChainUrl);
        Map<String, Object> chain = (Map<String, Object>) evolutionResponse.get("chain");

        List<PokemonEvolutionResponse> evolutions = new ArrayList<>();
        collectEvolutionChain(chain, evolutions);
        return evolutions;
    }

    private void collectEvolutionChain(Map<String, Object> chainNode, List<PokemonEvolutionResponse> evolutions) {
        if (chainNode == null) {
            return;
        }

        Map<String, Object> species = (Map<String, Object>) chainNode.get("species");
        if (species != null) {
            String speciesName = (String) species.get("name");
            String speciesUrl = (String) species.get("url");
            Integer id = extractPokemonId(speciesUrl);

            evolutions.add(new PokemonEvolutionResponse(
                    id,
                    capitalize(speciesName),
                    getOfficialArtworkUrl(id)
            ));
        }

        List<Map<String, Object>> evolvesTo = (List<Map<String, Object>>) chainNode.get("evolves_to");
        if (evolvesTo != null) {
            for (Map<String, Object> nextEvolution : evolvesTo) {
                collectEvolutionChain(nextEvolution, evolutions);
            }
        }
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
    
    @Cacheable(value = "pokemonTranslations", key = "#url")
    public String getSpanishNameFromResource(String url) {
        try {
            Map<String, Object> response = pokeApiClient.getResourceByUrl(url);
            List<Map<String, Object>> names = (List<Map<String, Object>>) response.get("names");

            if (names == null) {
                return null;
            }

            return names.stream()
                    .filter(nameEntry -> {
                        Map<String, Object> language = (Map<String, Object>) nameEntry.get("language");
                        return "es".equals(language.get("name"));
                    })
                    .map(nameEntry -> (String) nameEntry.get("name"))
                    .findFirst()
                    .orElse(null);

        } catch (Exception e) {
            return null;
        }
    }

    private String capitalize(String text) {
        if (text == null || text.isBlank()) {
            return text;
        }
        return text.substring(0, 1).toUpperCase() + text.substring(1);
    }
}