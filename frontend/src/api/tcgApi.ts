import axios from "axios";
import type { TcgCardDetail, TcgCardPage } from "../types/tcg";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getTcgCards = async (params?: {
  search?: string;
  pokemon?: string;
  rarity?: string;
  category?: string;
  page?: number;
}): Promise<TcgCardPage> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params || {}).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );

  const response = await api.get("/tcg/cards", { params: cleanParams });
  return response.data;
};

export const getTcgCardById = async (id: string): Promise<TcgCardDetail> => {
  const response = await api.get(`/tcg/cards/${id}`);
  return response.data;
};

export const getTcgCategories = async (): Promise<string[]> => {
  const response = await api.get("/tcg/cards/categories");
  return response.data;
};

export const getTcgRarities = async (): Promise<string[]> => {
  const response = await api.get("/tcg/cards/rarities");
  return response.data;
};