import axios from "axios";
import type {
  AiAnalysisResponse,
  AiTextResponse,
  DeckAnalysisRequest,
  SpawnExplanationRequest,
  TeamAnalysisRequest,
} from "../types/ai";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export async function analyzeTeam(
  request: TeamAnalysisRequest
): Promise<AiAnalysisResponse> {
  const response = await api.post<AiAnalysisResponse>(
    "/ai/team-analysis",
    request
  );

  return response.data;
}

export async function recommendPokemon(
  request: TeamAnalysisRequest
): Promise<AiAnalysisResponse> {
  const response = await api.post<AiAnalysisResponse>(
    "/ai/team-recommendation",
    request
  );

  return response.data;
}

export async function analyzeDeck(
  request: DeckAnalysisRequest
): Promise<AiAnalysisResponse> {
  const response = await api.post<AiAnalysisResponse>(
    "/ai/deck-analysis",
    request
  );

  return response.data;
}

export async function recommendCards(
  request: DeckAnalysisRequest
): Promise<AiAnalysisResponse> {
  const response = await api.post<AiAnalysisResponse>(
    "/ai/deck-recommendation",
    request
  );

  return response.data;
}

export async function explainSpawns(
  request: SpawnExplanationRequest
): Promise<AiTextResponse> {
  const response = await api.post<AiTextResponse>(
    "/ai/spawn-explanation",
    request
  );

  return response.data;
}
