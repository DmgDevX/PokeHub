# 🧠 PokéHub

Plataforma **full-stack** basada en el universo Pokémon que combina datos de videojuegos, cartas TCG, clima en tiempo real e inteligencia artificial.

El objetivo del proyecto es construir una herramienta completa para exploración, estrategia y simulación, integrando múltiples APIs externas y aplicando lógica de negocio propia.

## 🧩 Funcionalidades principales

### 🔎 Explorador de Pokémon
- Listado completo de Pokémon
- Detalle: stats, tipos, habilidades, evoluciones
- Visualización de movimientos

### 🃏 Cartas Pokémon TCG
- Búsqueda de cartas por Pokémon
- Filtros por tipo, rareza y colección
- Vista detallada de cartas
- Sistema de favoritos

### ⚔️ Team Builder
- Creación de equipos Pokémon
- Configuración de movimientos y habilidades
- Análisis de sinergias y debilidades

### 🧩 Deck Builder
- Creación de mazos TCG virtuales
- Gestión y validación de cartas
- Organización estratégica

### 🌦️ Simulador de spawns por clima
- Obtención de clima en tiempo real
- Estimación de Pokémon probables según:
  - clima
  - localización
  - tipo y características
- Sistema de reglas propio

### 🤖 Asistente con IA
- Recomendación de equipos competitivos
- Generación de mazos
- Explicación de fortalezas/debilidades
- Sugerencias basadas en contexto

## 🏗️ Arquitectura

### 🔧 Backend (Spring Boot)
Arquitectura modular orientada a dominio:

- `pokemon` → datos de Pokémon
- `tcg` → cartas TCG
- `weather` → clima
- `spawn` → lógica de simulación
- `team` → equipos
- `deck` → mazos
- `ai` → recomendaciones inteligentes
- `common` → utilidades

### 🎨 Frontend (React)
Aplicación SPA moderna:

- Interfaz visual con Material UI
- Navegación con React Router
- Gestión de estado (Zustand / Context / React Query)
- Consumo de APIs REST

---

## 🛠️ Stack tecnológico

### Backend
- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- PostgreSQL
- Lombok
- WebClient
- Swagger / OpenAPI

### Frontend
- React + TypeScript
- Vite
- Material UI (MUI)
- Axios
- React Router

---

## 🌐 APIs externas

- PokéAPI → datos de Pokémon
- TCGdex → cartas TCG
- Open-Meteo → datos meteorológicos
- Gemini API → inteligencia artificial

---

## 🎯 Objetivos del proyecto

- Integrar múltiples APIs en una única plataforma
- Diseñar una arquitectura full-stack escalable
- Implementar lógica de negocio propia
- Aplicar IA en recomendaciones
- Crear un proyecto sólido de portfolio

## 📌 Estado del proyecto

🚧 En desarrollo

---

## 🗺️ Roadmap

### Fase 1
- [X] Pokédex básica  
- [X] Integración con PokéAPI  
- [X] UI inicial  

### Fase 2
- [X] Cartas TCG  
- [X] Filtros y búsqueda avanzada  

### Fase 3
- [X] Team Builder  
- [X] Deck Builder  

### Fase 4
- [ ] Simulación por clima  

### Fase 5
- [ ] Integración con IA  

### Fase 6
- [ ] Autenticación y usuarios  

## 📚 Documentación

- [Arquitectura](./docs/architecture.md)
- [API Endpoints](./docs/api-endpoints.md)
- [Modelo de Datos](./docs/data-model.md)
- [Integraciones externas](./docs/integrations.md)
- [Algoritmo de Spawn](./docs/spawn-algorithm.md)
- [Módulo de IA](./docs/ai-module.md)