export interface AiRecommendation {
  name: string;
  role: string;
  reason: string;
}

export interface AiAnalysisResponse {
  title: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  risks: string[];
  recommendations: AiRecommendation[];
}

export interface AiTextResponse {
  title: string;
  explanation: string;
}

export interface TeamAnalysisRequest {
  teamName: string;
  pokemon: Array<{
    name: string;
    types: string[];
    ability: string;
    moves: string[];
    stats: {
      hp: number;
      attack: number;
      defense: number;
      specialAttack: number;
      specialDefense: number;
      speed: number;
    } | null;
  }>;
}

export interface DeckAnalysisRequest {
  deckName: string;
  cards: Array<{
    cardId: string;
    name: string;
    category: string | null;
    type: string | null;
    rarity: string | null;
    quantity: number;
  }>;
}

export interface SpawnExplanationRequest {
  city: string;
  weather: {
    temperature: number;
    humidity: number;
    condition: string;
  };
  spawns: Array<{
    pokemonName: string;
    probability: number;
    reason: string;
  }>;
}
