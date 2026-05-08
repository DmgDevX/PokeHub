# 🧩 Modelo de Datos

Este documento describe las estructuras principales utilizadas en PokéHub.

El proyecto trabaja principalmente con DTOs procedentes de APIs externas y estructuras propias para representar equipos, mazos, clima, spawns e IA.

---

## Pokémon

### PokemonListItem

Representa un Pokémon en listados.

Campos principales:

- `id`
- `name`
- `imageUrl`
- `types`

---

### PokemonDetail

Representa el detalle completo de un Pokémon.

Campos principales:

- `id`
- `name`
- `imageUrl`
- `height`
- `weight`
- `types`
- `abilities`
- `moves`
- `stats`
- `evolutionChain`

---

### PokemonStats

Representa las estadísticas base de un Pokémon.

Campos principales:

- `hp`
- `attack`
- `defense`
- `specialAttack`
- `specialDefense`
- `speed`

---

## Team Builder

### PokemonTeam

Representa un equipo Pokémon.

Campos principales:

- `id`
- `name`
- `createdAt`
- `slots`

---

### TeamSlot

Representa un hueco del equipo.

Campos principales:

- `id`
- `pokemonName`
- `pokemonId`
- `imageUrl`
- `types`
- `ability`
- `moves`
- `stats`

Cada equipo puede contener hasta 6 slots.

---

## Deck Builder

### Deck

Representa un mazo Pokémon TCG.

Campos principales:

- `id`
- `name`
- `cards`

---

### DeckCard

Representa una carta añadida al mazo.

Campos principales:

- `cardId`
- `name`
- `imageUrl`
- `category`
- `type`
- `rarity`
- `quantity`

---

## Clima

### WeatherSnapshot

Representa una captura del clima actual.

Campos principales:

- `temperature`
- `humidity`
- `condition`
- `windSpeed`

---

## Ciudades

### CityMarker

Representa una ciudad disponible en el mapa.

Campos principales:

- `id`
- `name`
- `country`
- `latitude`
- `longitude`
- `geographicZone`

---

## Spawn

### SpawnPrediction

Representa una predicción de aparición Pokémon.

Campos principales:

- `pokemonId`
- `pokemonName`
- `imageUrl`
- `probability`
- `reason`

Ejemplo:

```json
{
  "pokemonId": 4,
  "pokemonName": "charmander",
  "imageUrl": "https://...",
  "probability": 0.5,
  "reason": "La zona geográfica favorece su aparición"
}
```

---

## IA

### TeamAnalysisRequest

Estructura enviada a Gemini para analizar un equipo.

Campos principales:

- `teamName`
- `pokemon`

Cada Pokémon incluye:

- `name`
- `types`
- `ability`
- `moves`
- `stats`

---

### DeckAnalysisRequest

Estructura enviada a Gemini para analizar un mazo.

Campos principales:

- `deckName`
- `cards`

Cada carta incluye:

- `cardId`
- `name`
- `category`
- `type`
- `rarity`
- `quantity`

---

### SpawnExplanationRequest

Estructura enviada a Gemini para explicar spawns.

Campos principales:

- `city`
- `weather`
- `spawns`

---

### AiAnalysisResponse

Respuesta estructurada de Gemini para análisis y recomendaciones.

Campos principales:

- `title`
- `summary`
- `strengths`
- `weaknesses`
- `risks`
- `recommendations`

---

### AiRecommendationDto

Representa una recomendación generada por IA.

Campos principales:

- `name`
- `role`
- `reason`

---

### AiTextResponse

Respuesta textual para explicaciones de IA.

Campos principales:

- `title`
- `explanation`

---

## Persistencia

El proyecto no requiere persistencia de usuarios.

La construcción de equipos y mazos se gestiona principalmente mediante estado local y almacenamiento local del navegador.

---

## Flujo de datos

El flujo habitual sigue este patrón:

```txt
Frontend
   ↓
DTO Request
   ↓
Backend
   ↓
API externa / lógica propia
   ↓
DTO Response
   ↓
Frontend
```

---

## Estado

✅ Modelo de datos finalizado
