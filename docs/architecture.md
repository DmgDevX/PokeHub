# 🏗️ Arquitectura

PokéHub sigue una arquitectura **full-stack modular**, separando claramente frontend, backend, lógica de negocio e integraciones externas.

El proyecto está diseñado para centralizar múltiples APIs relacionadas con Pokémon en una única plataforma, añadiendo además simulación climática e inteligencia artificial.

---

## Visión general

```txt
Frontend React
   ↓
Backend Spring Boot
   ↓
APIs externas
```

El frontend nunca consume directamente las APIs externas. Todas las peticiones pasan por el backend, que actúa como capa intermedia, agregador de datos y normalizador de respuestas.

---

## Backend

El backend está desarrollado con **Java 21** y **Spring Boot 4**.

Sigue una arquitectura modular orientada a dominio:

```txt
com.dmgdev.pokehub
 ├── pokemon
 ├── tcg
 ├── weather
 ├── spawn
 ├── team
 ├── deck
 ├── ai
 └── common
```

Cada módulo puede contener:

- `controller`
- `service`
- `dto`
- `client`
- `repository`, si aplica
- `config`, si aplica

---

## Módulos principales

### pokemon

Responsable de consumir y adaptar datos de PokéAPI.

Incluye:

- Listado de Pokémon
- Detalle por nombre
- Tipos
- Stats
- Habilidades
- Movimientos
- Evoluciones

---

### tcg

Responsable de consumir datos de cartas Pokémon TCG.

Incluye:

- Búsqueda de cartas
- Filtros
- Cartas relacionadas con Pokémon
- Datos de colección, rareza y tipo

---

### weather

Responsable de obtener información meteorológica.

Incluye:

- Temperatura
- Humedad
- Condición climática
- Viento
- Consulta por ciudad y coordenadas

---

### spawn

Contiene la lógica propia de simulación de apariciones Pokémon.

Tiene en cuenta:

- Clima
- Temperatura
- Humedad
- Zona geográfica
- Generación seleccionada
- Tipo del Pokémon

---

### team

Contiene la lógica relacionada con la construcción de equipos Pokémon.

Incluye:

- Equipo de hasta 6 Pokémon
- Habilidad seleccionada
- Movimientos seleccionados
- Estructura del equipo

---

### deck

Contiene la lógica relacionada con la construcción de mazos Pokémon TCG.

Incluye:

- Cartas añadidas
- Cantidad de copias
- Control visual del mazo
- Estructura base del deck

---

### ai

Módulo encargado de integrar Gemini API.

Incluye:

- Cliente Gemini
- Construcción de prompts
- Análisis de equipos
- Recomendaciones de Pokémon
- Análisis de mazos
- Recomendaciones de cartas
- Explicación de spawns

---

### common

Módulo para configuración y utilidades compartidas.

Incluye:

- Configuración de clientes HTTP
- Configuración común
- Utilidades generales

---

## Frontend

El frontend está desarrollado con:

- React
- TypeScript
- Vite
- Material UI
- Axios
- React Router
- React Leaflet

Estructura aproximada:

```txt
src
 ├── api
 ├── components
 ├── pages
 ├── types
 └── router
```

---

## Comunicación

La comunicación sigue este patrón:

```txt
React Page
   ↓
api/*.ts
   ↓
Spring Controller
   ↓
Service
   ↓
Client externo / lógica propia
   ↓
DTO de respuesta
```

Ejemplo:

```txt
TeamBuilderPage
   ↓
aiApi.ts
   ↓
AiController
   ↓
AiService
   ↓
GeminiClient
   ↓
Gemini API
```

---

## APIs externas integradas

PokéHub integra varias APIs externas:

- PokéAPI
- TCGdex
- Open-Meteo
- OpenStreetMap
- Nominatim
- Gemini API

Cada integración se encapsula en módulos independientes del backend.

---

## Integración con IA

Gemini no se consume desde React.

La API key se mantiene protegida en el backend mediante variable de entorno:

```env
GEMINI_API_KEY
```

El backend construye prompts estructurados y solicita respuestas JSON para poder representar los resultados visualmente en el frontend.

---

## Diseño visual

Las vistas principales utilizan una distribución en múltiples columnas:

- Panel de búsqueda o mapa
- Contenido principal
- Panel lateral de IA

El panel de IA permanece separado visualmente para mantener el contexto del usuario mientras consulta recomendaciones y análisis.

Todas las vistas son responsive y adaptables a distintos tamaños de pantalla.

---

## Decisión de alcance

El proyecto no incluye autenticación ni sistema de usuarios.

Se ha decidido cerrar el alcance tras la integración de IA, ya que el objetivo principal es demostrar:

- Integración de APIs externas
- Arquitectura full-stack modular
- Simulación con lógica propia
- Construcción de equipos y mazos
- Integración de IA generativa
- Experiencia visual responsive

---

## Estado

✅ Arquitectura finalizada
