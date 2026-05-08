# 🌐 Integraciones externas

PokéHub integra múltiples APIs externas para construir una experiencia completa de exploración, estrategia, simulación e inteligencia artificial.

Cada integración está encapsulada en módulos independientes del backend.

---

## PokéAPI

Fuente principal de datos de Pokémon.

Se utiliza para obtener:

- Listado de Pokémon
- Detalle completo de Pokémon
- Tipos
- Habilidades
- Movimientos
- Estadísticas base
- Evoluciones
- Imágenes oficiales

### Uso dentro del proyecto

```txt
Frontend
   ↓
Backend pokemon
   ↓
PokéAPI
```

La información obtenida se adapta mediante DTOs propios antes de enviarse al frontend.

---

## TCGdex

Fuente de datos para cartas Pokémon TCG.

Se utiliza para obtener:

- Cartas
- Imágenes
- Colecciones
- Rarezas
- Tipos
- Información básica de cartas

### Uso dentro del proyecto

```txt
Frontend
   ↓
Backend tcg
   ↓
TCGdex
```

Se usa principalmente en:

- Vista de cartas TCG
- Cartas relacionadas en detalle de Pokémon
- Deck Builder

---

## Open-Meteo

Fuente de datos meteorológicos.

Se utiliza para obtener:

- Temperatura
- Humedad
- Condición climática
- Viento

### Uso dentro del proyecto

```txt
Frontend
   ↓
Backend weather
   ↓
Open-Meteo
```

Estos datos se combinan con el algoritmo propio de spawn.

---

## OpenStreetMap / Leaflet

Se utiliza en el frontend para mostrar el mapa interactivo.

### Tecnologías relacionadas

- React Leaflet
- Leaflet
- OpenStreetMap tiles

### Uso dentro del proyecto

- Visualización de ciudades
- Selección de ubicación
- Interacción con marcadores

---

## Nominatim

Se utiliza como apoyo para datos geográficos y localización cuando es necesario.

### Uso dentro del proyecto

- Geocodificación
- Soporte de ciudades
- Coordenadas

---

## Gemini API

Gemini API se utiliza como motor de inteligencia artificial.

### Funcionalidades implementadas

- Análisis de equipos Pokémon
- Recomendación de Pokémon
- Análisis de mazos Pokémon TCG
- Recomendación de cartas
- Explicación de spawns por clima

### Uso dentro del proyecto

```txt
Frontend
   ↓
Backend ai
   ↓
Gemini API
```

La API key se configura mediante variable de entorno:

```env
GEMINI_API_KEY
```

No se expone nunca en el frontend.

---

## Seguridad de integraciones

El backend actúa como capa segura para:

- Ocultar claves privadas
- Controlar llamadas externas
- Validar datos
- Normalizar respuestas
- Limitar el tamaño de prompts
- Evitar llamadas directas desde el navegador

---

## Integración entre APIs

PokéHub combina información de múltiples APIs simultáneamente.

### Spawn Map

Combina:

- Open-Meteo
- Lógica propia
- PokéAPI
- Gemini API

### Team Builder

Combina:

- PokéAPI
- Gemini API

### Deck Builder

Combina:

- TCGdex
- Gemini API

---

## Decisión de alcance

El proyecto no implementa autenticación ni sistema de usuarios.

El objetivo principal es demostrar:

- Integración de APIs externas
- Arquitectura full-stack modular
- Lógica de negocio propia
- Simulación climática
- Inteligencia artificial aplicada
- Experiencia visual responsive

---

## Estado

✅ Integraciones finalizadas
