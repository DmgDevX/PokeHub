# 🌦️ Algoritmo de Spawn

El sistema de spawn de PokéHub es una lógica propia que estima qué Pokémon podrían aparecer en una ciudad según condiciones climáticas y geográficas.

No pretende ser una simulación oficial, sino una aproximación estratégica y temática basada en reglas.

---

## Objetivo

Generar un ranking de Pokémon probables en una ciudad determinada usando:

- clima actual
- temperatura
- humedad
- zona geográfica
- tipo del Pokémon
- generación seleccionada

---

## Variables principales

### Clima

El clima influye directamente en los tipos favorecidos.

Ejemplos:

- lluvia → favorece tipo agua
- calor → favorece tipo fuego
- humedad → favorece planta, bicho y agua
- frío → favorece hielo
- viento → favorece volador

---

### Temperatura

La temperatura ajusta las probabilidades según rangos.

Ejemplos:

- temperaturas altas → fuego, tierra, roca
- temperaturas suaves → normal, planta, bicho
- temperaturas bajas → hielo, agua

---

### Humedad

La humedad modifica la aparición de ciertos tipos.

Ejemplos:

- humedad alta → agua, planta, bicho
- humedad baja → fuego, tierra, roca

---

### Zona geográfica

Cada ciudad tiene asociada una zona geográfica.

Ejemplos:

- costa
- montaña
- interior
- isla
- norte húmedo
- sur cálido
- urbana

Cada zona geográfica favorece tipos concretos.

Ejemplos:

```txt
Costa → agua, volador
Montaña → roca, tierra, hielo, lucha
Interior → tierra, normal, planta
Isla → agua, volador, dragón
Norte húmedo → planta, agua, bicho, hielo
Sur cálido → fuego, tierra, roca
Urbana → eléctrico, normal, veneno
```

---

## Generaciones

El usuario puede filtrar los Pokémon por generación.

Esto permite calcular spawns de forma más controlada:

- Generación I
- Generación II
- Generación III
- Generación IV
- Generación V
- Generación VI
- Generación VII
- Generación VIII
- Generación IX

---

## Reglas de probabilidad

Cada Pokémon recibe una probabilidad estimada a partir de varias reglas.

Factores considerados:

- coincidencia entre tipo y clima
- coincidencia entre tipo y zona geográfica
- adecuación a temperatura
- adecuación a humedad
- generación seleccionada

Ejemplo conceptual:

```txt
probabilidad base
+ bonus por clima
+ bonus por temperatura
+ bonus por humedad
+ bonus por zona geográfica
= probabilidad final
```

---

## Ejemplos de reglas

### Tipo Agua

- aumenta con lluvia
- aumenta en costa
- aumenta con humedad alta

### Tipo Fuego

- aumenta con calor
- aumenta en zonas secas
- aumenta en sur cálido

### Tipo Planta

- aumenta con humedad
- aumenta en norte húmedo
- aumenta con clima suave

### Tipo Hielo

- aumenta con frío
- aumenta en montaña
- aumenta en temperaturas bajas

### Tipo Eléctrico

- aumenta en zonas urbanas
- aumenta con tormentas

---

## Resultado

El sistema devuelve un ranking de Pokémon probables.

Ejemplo:

```json
[
  {
    "pokemonId": 7,
    "pokemonName": "squirtle",
    "probability": 0.75,
    "reason": "El clima lluvioso y la humedad alta favorecen Pokémon de tipo agua"
  },
  {
    "pokemonId": 4,
    "pokemonName": "charmander",
    "probability": 0.32,
    "reason": "La temperatura cálida favorece Pokémon de tipo fuego"
  }
]
```

---

## Explicación con IA

La Fase 5 añade una explicación mediante Gemini API.

El backend envía a Gemini:

- ciudad
- clima
- humedad
- temperatura
- ranking de spawns
- razones calculadas por el sistema

Gemini genera una explicación natural para el usuario.

Ejemplo:

```txt
La aparición de Pokémon de tipo Agua en ciudades costeras tiene sentido debido a la humedad elevada y las condiciones lluviosas actuales.
```

---

## Arquitectura del cálculo

```txt
Open-Meteo
   ↓
WeatherSnapshot
   ↓
SpawnService
   ↓
SpawnAlgorithm
   ↓
SpawnPrediction
   ↓
Gemini API (explicación opcional)
```

---

## Objetivo técnico

El algoritmo se diseñó para:

- combinar datos reales y lógica propia
- crear una experiencia interactiva
- demostrar capacidad de modelado de reglas
- integrar múltiples APIs
- generar resultados dinámicos y visuales

---

## Estado

✅ Algoritmo de spawn finalizado
