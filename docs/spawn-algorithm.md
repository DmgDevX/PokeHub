# 🌦️ Algoritmo de Spawn

El sistema de spawn es una lógica propia basada en:

## Variables

- clima actual
- tipo de Pokémon
- hábitat
- temperatura
- humedad

## Ejemplo de reglas

- Agua → aumenta probabilidad con lluvia
- Fuego → aumenta con calor
- Planta → aumenta con humedad
- Hielo → aumenta con frío

## Resultado

Se genera un ranking de Pokémon con probabilidad:

```json
[
  {
    "pokemon": "Squirtle",
    "probability": 0.75,
    "reason": "Clima lluvioso favorece tipo agua"
  }
]