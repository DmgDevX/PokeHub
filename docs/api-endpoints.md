# 🔌 API Endpoints

## Pokémon

- GET /api/pokemon
- GET /api/pokemon/{name}
- GET /api/pokemon/{name}/moves
- GET /api/pokemon/{name}/abilities

## Cartas TCG

- GET /api/tcg/cards
- GET /api/tcg/cards/{id}

## Clima

- GET /api/weather?city={city}

## Spawn

- GET /api/spawn/predictions?city={city}

## Equipos

- POST /api/teams
- GET /api/teams/{id}
- POST /api/teams/{id}/pokemon

## Mazos

- POST /api/decks
- GET /api/decks/{id}
- POST /api/decks/{id}/cards

## IA

- POST /api/ai/team-recommendation
- POST /api/ai/deck-recommendation
- POST /api/ai/spawn-explanation