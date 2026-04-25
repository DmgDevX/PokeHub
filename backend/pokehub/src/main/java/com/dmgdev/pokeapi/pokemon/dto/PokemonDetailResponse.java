<<<<<<<< HEAD:backend/pokehub/src/main/java/com/dmgdev/pokehub/pokeapi/dto/PokemonDetailResponse.java
package com.dmgdev.pokehub.pokeapi.dto;
========
package com.dmgdev.pokeapi.pokemon.dto;
>>>>>>>> 603e74f3a7d05631e141d5394c63ee73b954b46e:backend/pokehub/src/main/java/com/dmgdev/pokeapi/pokemon/dto/PokemonDetailResponse.java

import java.util.List;

public record PokemonDetailResponse(
        Integer id,
        String name,
        Integer height,
        Integer weight,
        List<PokemonTypeResponse> types,
        List<String> abilities,
        List<String> moves,
        List<PokemonEvolutionResponse> evolutions,
        String image
) {}