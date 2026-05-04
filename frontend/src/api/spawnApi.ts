import axios from "axios";
import type { SpawnPrediction } from "../types/spawn";

const API_URL = "http://localhost:8080/api/spawn/predictions";

export async function getSpawnPredictions(
  city: string,
  lat: number,
  lon: number,
  geographicZone: string,
  generations: number[]
): Promise<SpawnPrediction[]> {
  const response = await axios.get<SpawnPrediction[]>(API_URL, {
    params: {
      city,
      lat,
      lon,
      geographicZone,
      generations: generations.join(","),
    },
  });

  return response.data;
}