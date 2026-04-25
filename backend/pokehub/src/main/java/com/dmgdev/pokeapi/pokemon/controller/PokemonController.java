<<<<<<<< HEAD:backend/pokehub/src/main/java/com/dmgdev/pokehub/pokeapi/controller/PokemonController.java
package com.dmgdev.pokehub.pokeapi.controller;
========
package com.dmgdev.pokeapi.pokemon.controller;
>>>>>>>> 603e74f3a7d05631e141d5394c63ee73b954b46e:backend/pokehub/src/main/java/com/dmgdev/pokeapi/pokemon/controller/PokemonController.java

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

<<<<<<<< HEAD:backend/pokehub/src/main/java/com/dmgdev/pokehub/pokeapi/controller/PokemonController.java
import com.dmgdev.pokehub.pokeapi.dto.PokemonDetailResponse;
import com.dmgdev.pokehub.pokeapi.dto.PokemonListItemResponse;
import com.dmgdev.pokehub.pokeapi.service.PokemonService;
========
import com.dmgdev.pokeapi.pokemon.dto.PokemonDetailResponse;
import com.dmgdev.pokeapi.pokemon.dto.PokemonListItemResponse;
import com.dmgdev.pokeapi.pokemon.service.PokemonService;
>>>>>>>> 603e74f3a7d05631e141d5394c63ee73b954b46e:backend/pokehub/src/main/java/com/dmgdev/pokeapi/pokemon/controller/PokemonController.java

import java.util.List;

@RestController
@RequestMapping("/api/pokemon")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PokemonController {

    private final PokemonService pokemonService;

    @GetMapping
    public List<PokemonListItemResponse> getPokemonList(
            @RequestParam(defaultValue = "24") int limit,
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(required = false) String search
    ) {
        if (search != null && !search.isBlank()) {
            return pokemonService.searchPokemon(search);
        }

        return pokemonService.getPokemonList(limit, offset);
    }

    @GetMapping("/{name}")
    public PokemonDetailResponse getPokemonByName(@PathVariable String name) {
        return pokemonService.getPokemonByName(name);
    }

    @GetMapping("/{name}/moves")
    public List<String> getPokemonMoves(@PathVariable String name) {
        return pokemonService.getPokemonMoves(name);
    }

    @GetMapping("/{name}/abilities")
    public List<String> getPokemonAbilities(@PathVariable String name) {
        return pokemonService.getPokemonAbilities(name);
    }
}