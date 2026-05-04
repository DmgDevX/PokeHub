import axios from "axios";
import type { WeatherSnapshot } from "../types/weather";

const API_URL = "http://localhost:8080/api/map/weather";

export async function getWeatherByCityLocation(
  city: string,
  lat: number,
  lon: number
): Promise<WeatherSnapshot> {
  const response = await axios.get<WeatherSnapshot>(API_URL, {
    params: { city, lat, lon },
  });

  return response.data;
}