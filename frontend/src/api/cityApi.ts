import axios from "axios";
import type { CityMarker } from "../types/city";

const API_URL = "http://localhost:8080/api/map/cities";

export async function getSpanishCities(): Promise<CityMarker[]> {
  const response = await axios.get<CityMarker[]>(API_URL);
  return response.data;
}