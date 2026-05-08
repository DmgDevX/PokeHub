# 🧠 PokéHub

Plataforma **full-stack** basada en el universo Pokémon que combina datos de videojuegos, cartas TCG, clima en tiempo real e inteligencia artificial.

El objetivo del proyecto es construir una herramienta completa para exploración, estrategia y simulación, integrando múltiples APIs externas y aplicando lógica de negocio propia.

## 🧩 Funcionalidades principales

### 🔎 Explorador de Pokémon

- Listado completo de Pokémon
- Búsqueda por nombre
- Detalle completo de cada Pokémon:
  - stats
  - tipos
  - habilidades
  - evoluciones
  - movimientos
- Modal de carga personalizado con temática Pokémon
- Diseño responsive adaptado a distintos tamaños de pantalla

### 🃏 Cartas Pokémon TCG

- Búsqueda de cartas Pokémon
- Filtros por colección, tipo y rareza
- Vista de cartas asociadas a cada Pokémon
- Integración con datos reales de TCG
- Carga optimizada y caché de resultados

### ⚔️ Team Builder

- Creación de equipos Pokémon de hasta 6 miembros
- Selección de habilidad por Pokémon
- Configuración de hasta 4 movimientos por Pokémon
- Visualización de tipos y composición del equipo
- Persistencia local del equipo en construcción
- Análisis estratégico con IA:
  - puntos fuertes
  - debilidades
  - riesgos
  - recomendaciones de mejora
  - Pokémon recomendados

### 🧩 Deck Builder

- Creación de mazos Pokémon TCG virtuales
- Búsqueda y añadido de cartas al mazo
- Control de cantidad de copias
- Gestión visual del mazo
- Análisis estratégico con IA:
  - consistencia del mazo
  - balance del deck
  - puntos débiles
  - riesgos
  - cartas recomendadas

### 🌦️ Simulador de spawns por clima

- Mapa interactivo con ciudades españolas
- Obtención de clima en tiempo real
- Estimación de Pokémon probables según:
  - ciudad
  - clima
  - temperatura
  - humedad
  - zona geográfica
  - generación seleccionada
- Sistema de reglas propio para calcular probabilidades
- Explicación inteligente de los resultados mediante IA

### 🤖 Asistente con IA

- Integración con Gemini API
- Análisis de equipos Pokémon
- Recomendación de Pokémon para completar equipos
- Análisis de mazos Pokémon TCG
- Recomendación de cartas para mejorar mazos
- Explicación contextual de spawns por clima
- Uso de prompts estructurados y respuestas JSON
- Panel lateral dedicado para mostrar resultados de IA

---

## 🏗️ Arquitectura

### 🔧 Backend

Backend desarrollado con **Java 21** y **Spring Boot 4**, siguiendo una arquitectura modular orientada a dominio.

Módulos principales:

- `pokemon` → datos de Pokémon
- `tcg` → cartas Pokémon TCG
- `weather` → clima
- `spawn` → lógica de simulación de apariciones
- `team` → construcción de equipos
- `deck` → construcción de mazos
- `ai` → integración con Gemini y recomendaciones inteligentes
- `common` → configuración y utilidades comunes

El backend actúa como:

- capa intermedia entre frontend y APIs externas
- agregador de datos
- normalizador de respuestas
- capa de lógica de negocio
- punto seguro para consumir la API key de Gemini

### 🎨 Frontend

Aplicación SPA desarrollada con **React + TypeScript + Vite**.

Tecnologías principales:

- React
- TypeScript
- Material UI
- React Router
- Axios
- React Leaflet

El frontend consume exclusivamente el backend propio mediante endpoints REST.

---

## 🛠️ Stack tecnológico

### Backend

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Cache
- Spring Validation
- Lombok
- RestClient
- Gemini API
- Maven

### Frontend

- React
- TypeScript
- Vite
- Material UI
- Axios
- React Router
- React Leaflet
- Leaflet

---

## 🌐 APIs externas

- **PokéAPI** → datos principales de Pokémon
- **TCGdex** → cartas Pokémon TCG
- **Open-Meteo** → datos meteorológicos
- **Nominatim / OpenStreetMap** → soporte para mapa y localización
- **Gemini API** → análisis, recomendaciones y explicaciones inteligentes

---

## 🎯 Objetivos del proyecto

- Integrar múltiples APIs externas en una única plataforma
- Diseñar una arquitectura full-stack modular
- Implementar lógica de negocio propia
- Aplicar inteligencia artificial de forma útil y contextualizada
- Crear una experiencia visual completa y responsive
- Construir un proyecto sólido para portfolio

---

## 📌 Estado del proyecto

✅ Proyecto finalizado

El proyecto se da por completado tras la integración de la Fase 5 con IA mediante Gemini.

No se implementará una fase de autenticación y usuarios, ya que el objetivo principal del proyecto es demostrar integración de APIs, lógica de negocio, simulación, construcción de equipos/mazos e inteligencia artificial aplicada.

---

## 🗺️ Roadmap

### Fase 1

- [x] Pokédex básica
- [x] Integración con PokéAPI
- [x] UI inicial
- [x] Vista detalle de Pokémon
- [x] Modal de carga personalizado

### Fase 2

- [x] Cartas Pokémon TCG
- [x] Filtros y búsqueda avanzada
- [x] Cartas relacionadas en detalle de Pokémon
- [x] Integración con TCGdex

### Fase 3

- [x] Team Builder
- [x] Deck Builder
- [x] Gestión visual de equipos
- [x] Gestión visual de mazos

### Fase 4

- [x] Simulación por clima
- [x] Mapa interactivo
- [x] Integración con Open-Meteo
- [x] Algoritmo propio de spawns
- [x] Influencia de zona geográfica

### Fase 5

- [x] Integración con Gemini API
- [x] Análisis de equipos Pokémon
- [x] Recomendación de Pokémon
- [x] Análisis de mazos TCG
- [x] Recomendación de cartas
- [x] Explicación inteligente de spawns
- [x] Panel lateral de asistente IA

---

## 📚 Documentación

- [Arquitectura](./docs/architecture.md)
- [API Endpoints](./docs/api-endpoints.md)
- [Modelo de Datos](./docs/data-model.md)
- [Integraciones externas](./docs/integrations.md)
- [Algoritmo de Spawn](./docs/spawn-algorithm.md)
- [Módulo de IA](./docs/ai-module.md)

---

## ✅ Resultado final

PokéHub es una aplicación full-stack completa que combina exploración Pokémon, cartas TCG, simulación climática e inteligencia artificial.

El proyecto demuestra:

- consumo de APIs externas
- arquitectura modular
- integración frontend-backend
- diseño responsive
- lógica de negocio propia
- uso práctico de IA generativa
- construcción de funcionalidades visuales e interactivas