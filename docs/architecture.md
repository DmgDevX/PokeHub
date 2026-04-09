# 🏗️ Arquitectura

El proyecto sigue una arquitectura **full-stack modular**, separando claramente frontend y backend.

## Backend

Desarrollado con Spring Boot bajo un enfoque modular por dominios:

- pokemon
- tcg
- weather
- spawn
- team
- deck
- ai
- common

Cada módulo contiene:
- controller
- service
- dto
- client (para APIs externas)
- repository (si aplica)

## Frontend

Aplicación SPA desarrollada con React + TypeScript:

- Material UI para la interfaz
- React Router para navegación
- Axios para consumo de APIs

## Comunicación

Frontend → Backend → APIs externas

El backend actúa como:
- agregador de datos
- capa de lógica de negocio
- normalizador de respuestas