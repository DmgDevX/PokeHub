# 🤖 Módulo de IA

El módulo de IA de PokéHub integra **Gemini API** para generar análisis, recomendaciones y explicaciones inteligentes basadas en datos reales del sistema.

La IA no se usa de forma aislada: siempre recibe contexto estructurado procedente del equipo, mazo o simulación de spawns.

---

# 🎯 Objetivo

Añadir una capa estratégica al proyecto mediante IA generativa.

## Funcionalidades implementadas

- Análisis de equipos Pokémon
- Recomendación de Pokémon para completar o mejorar equipos
- Análisis de mazos Pokémon TCG
- Recomendación de cartas para mejorar mazos
- Explicación inteligente de spawns por clima y zona geográfica

---

# 🏗️ Arquitectura

```txt
Frontend React
   ↓
aiApi.ts
   ↓
AiController
   ↓
AiService
   ↓
AiPromptBuilder
   ↓
GeminiClient
   ↓
Gemini API
```

El frontend nunca llama directamente a Gemini. Todas las peticiones pasan por el backend para mantener la API key protegida y controlar el formato de las respuestas.

---

# 🔐 Seguridad

La API key de Gemini se configura mediante variable de entorno:

```env
GEMINI_API_KEY
```

## Configuración usada en el backend

```yaml
gemini:
  api-key: ${GEMINI_API_KEY:}
  model: gemini-2.5-flash
  base-url: https://generativelanguage.googleapis.com/v1beta
  enabled: true
  max-input-length: 12000
```

## Medidas aplicadas

- La API key no se expone en React
- Validación de existencia de la API key
- Posibilidad de desactivar Gemini con `enabled: false`
- Límite de tamaño del prompt
- Uso de respuestas estructuradas en JSON
- Limpieza de respuestas antes de parsearlas

---

# 🔌 Endpoints

## Analizar equipo Pokémon

```http
POST /api/ai/team-analysis
```

Analiza el equipo actual y devuelve:

- Resumen general
- Puntos fuertes
- Debilidades
- Riesgos
- Recomendaciones de mejora

---

## Recomendar Pokémon

```http
POST /api/ai/team-recommendation
```

Recomienda Pokémon para completar o mejorar un equipo.

### Tiene en cuenta

- Tipos del equipo
- Habilidades seleccionadas
- Movimientos disponibles
- Stats
- Roles faltantes
- Debilidades acumuladas
- Cobertura ofensiva y defensiva

---

## Analizar deck TCG

```http
POST /api/ai/deck-analysis
```

Analiza un mazo Pokémon TCG y devuelve:

- Resumen del deck
- Puntos fuertes
- Debilidades
- Riesgos
- Recomendaciones estratégicas

---

## Recomendar cartas

```http
POST /api/ai/deck-recommendation
```

Recomienda cartas o tipos de carta para mejorar el mazo.

### Prioriza

- Consistencia
- Robo
- Búsqueda
- Energía
- Soporte
- Sinergia entre cartas

---

## Explicar spawns

```http
POST /api/ai/spawn-explanation
```

Genera una explicación natural sobre por qué aparecen ciertos Pokémon en una ciudad según:

- Clima actual
- Temperatura
- Humedad
- Zona geográfica
- Ranking de Pokémon generado por el sistema

---

# 🧠 Prompts estructurados

Los prompts se construyen desde el backend mediante `AiPromptBuilder`.

## Ejemplo conceptual

```txt
Eres un asistente estratégico especializado en Pokémon.

Analiza el siguiente equipo usando únicamente los datos proporcionados.
Responde siempre en español.
Devuelve únicamente JSON válido.
```

El objetivo es evitar respuestas libres difíciles de procesar y asegurar que el frontend reciba datos consistentes.

---

# 📦 Respuestas JSON

Gemini devuelve respuestas estructuradas para poder representarlas visualmente en el frontend.

## Ejemplo

```json
{
  "title": "Recomendación de Pokémon",
  "summary": "El equipo necesita cubrir debilidades frente a Agua y Roca.",
  "strengths": [
    "Buena presión ofensiva",
    "Velocidad aceptable"
  ],
  "weaknesses": [
    "Debilidad acumulada a Roca",
    "Poca cobertura defensiva"
  ],
  "risks": [
    "El equipo puede sufrir contra Pokémon de Agua"
  ],
  "recommendations": [
    {
      "name": "Venusaur",
      "role": "Soporte defensivo",
      "reason": "Cubre amenazas de Agua y aporta resistencia."
    }
  ]
}
```

---

# 🎨 Integración en frontend

El frontend incluye:

- `aiApi.ts`
- Tipos de IA
- `AiAnalysisPanel`
- `AiTextPanel`
- Columna lateral derecha dedicada al asistente IA

## La IA está integrada en

- Team Builder
- Deck Builder
- Spawn Map

---

# 🖥️ Diseño visual

El contenido de IA se muestra en una columna lateral derecha para separar claramente:

- Contenido editable del usuario
- Información principal de la vista
- Análisis generado por IA

Además, el panel de IA incluye scroll interno cuando el contenido es largo.

---

# ⚠️ Control de errores

El módulo contempla:

- Errores por API key no configurada
- Errores de conexión con Gemini
- Respuestas vacías
- Respuestas JSON incompletas
- Limpieza de bloques Markdown
- Parseo seguro de la respuesta
- Mensajes de error en frontend

---

# ✅ Estado

✅ Módulo de IA finalizado
