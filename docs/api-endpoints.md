# 🔌 API Endpoints

Este documento recoge los endpoints principales del backend de PokéHub.

La API sigue una estructura REST y actúa como capa intermedia entre el frontend y las APIs externas.

---

## Pokémon

### Obtener listado de Pokémon

```http
GET /api/pokemon
```

Permite obtener Pokémon de forma paginada y con búsqueda opcional.

Parámetros habituales:

- `limit`
- `offset`
- `search`

### Obtener detalle de un Pokémon

```http
GET /api/pokemon/{name}
```

Devuelve información detallada del Pokémon:

- Nombre
- Número
- Imagen
- Tipos
- Stats
- Habilidades
- Movimientos
- Evoluciones

### Obtener movimientos de un Pokémon

```http
GET /api/pokemon/{name}/moves
```

Devuelve los movimientos disponibles para un Pokémon.

### Obtener habilidades de un Pokémon

```http
GET /api/pokemon/{name}/abilities
```

Devuelve las habilidades disponibles para un Pokémon.

---

## Cartas TCG

### Obtener cartas

```http
GET /api/tcg/cards
```

Permite buscar cartas Pokémon TCG.

Parámetros habituales:

- `query`
- `collection`
- `type`
- `rarity`

### Obtener detalle de carta

```http
GET /api/tcg/cards/{id}
```

Devuelve información detallada de una carta concreta.

---

## Clima

### Obtener clima por ciudad

```http
GET /api/weather?city={city}
```

Devuelve datos meteorológicos asociados a una ciudad.

### Obtener clima por coordenadas

```http
GET /api/weather/location
```

Parámetros habituales:

- `city`
- `latitude`
- `longitude`

Devuelve:

- Temperatura
- Humedad
- Condición climática
- Viento

---

## Ciudades / Mapa

### Obtener ciudades españolas

```http
GET /api/map/cities
```

Devuelve ciudades disponibles para el mapa.

Cada ciudad incluye:

- Nombre
- País
- Latitud
- Longitud
- Zona geográfica

---

## Spawn

### Obtener predicciones de spawn

```http
GET /api/spawn/predictions
```

Parámetros habituales:

- `city`
- `latitude`
- `longitude`
- `geographicZone`
- `generations`

Devuelve un ranking de Pokémon probables según:

- Clima
- Ciudad
- Coordenadas
- Zona geográfica
- Generación seleccionada

Ejemplo de respuesta:

```json
[
  {
    "pokemonId": 4,
    "pokemonName": "charmander",
    "imageUrl": "https://...",
    "probability": 0.5,
    "reason": "Condiciones neutras para este Pokémon y la zona geográfica también favorece su aparición"
  }
]
```

---

## IA

El módulo de IA utiliza Gemini API desde el backend.

La API key nunca se expone en el frontend.

### Analizar equipo Pokémon

```http
POST /api/ai/team-analysis
```

Analiza un equipo Pokémon actual.

Entrada esperada:

```json
{
  "teamName": "Mi equipo Pokémon",
  "pokemon": [
    {
      "name": "charizard",
      "types": ["fire", "flying"],
      "ability": "blaze",
      "moves": ["flamethrower", "air-slash"],
      "stats": {
        "hp": 78,
        "attack": 84,
        "defense": 78,
        "specialAttack": 109,
        "specialDefense": 85,
        "speed": 100
      }
    }
  ]
}
```

Devuelve:

- Resumen
- Puntos fuertes
- Debilidades
- Riesgos
- Recomendaciones

### Recomendar Pokémon

```http
POST /api/ai/team-recommendation
```

Recomienda Pokémon para completar o mejorar un equipo.

Devuelve recomendaciones basadas en:

- Cobertura de tipos
- Roles faltantes
- Debilidades repetidas
- Equilibrio ofensivo/defensivo

### Analizar deck TCG

```http
POST /api/ai/deck-analysis
```

Analiza un mazo Pokémon TCG.

Entrada esperada:

```json
{
  "deckName": "Mi mazo Pokémon TCG",
  "cards": [
    {
      "cardId": "base1-4",
      "name": "Charizard",
      "category": "Pokemon",
      "type": "Fire",
      "rarity": "Rare",
      "quantity": 1
    }
  ]
}
```

Devuelve:

- Resumen del deck
- Puntos fuertes
- Debilidades
- Riesgos
- Recomendaciones

### Recomendar cartas

```http
POST /api/ai/deck-recommendation
```

Recomienda cartas o tipos de carta para mejorar un mazo.

Tiene en cuenta:

- Consistencia
- Robo
- Búsqueda
- Energía
- Balance entre Pokémon, Trainer y Energy

### Explicar spawns

```http
POST /api/ai/spawn-explanation
```

Genera una explicación natural de por qué aparecen ciertos Pokémon en una ciudad según el clima y la zona geográfica.

Entrada esperada:

```json
{
  "city": "Córdoba",
  "weather": {
    "temperature": 21.8,
    "humidity": 43,
    "condition": "Parcialmente nublado"
  },
  "spawns": [
    {
      "pokemonName": "charmander",
      "probability": 0.5,
      "reason": "La zona geográfica favorece su aparición"
    }
  ]
}
```

Devuelve:

```json
{
  "title": "Explicación de spawns",
  "explanation": "Texto generado por IA..."
}
```

---

## Persistencia

El proyecto no implementa autenticación ni persistencia de usuarios.

Los equipos y mazos se gestionan principalmente en frontend mediante estado local y almacenamiento local del navegador.

---

## Estado

✅ Endpoints principales finalizados
