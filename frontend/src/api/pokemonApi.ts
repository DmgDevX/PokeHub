import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getPokemonList = async (limit = 27, offset = 0, search = "") => {
  const params = new URLSearchParams();

  params.append("limit", String(limit));
  params.append("offset", String(offset));

  if (search.trim()) {
    params.append("search", search.trim());
  }

  const response = await api.get(`/pokemon?${params.toString()}`);
  return response.data;
};

export const getPokemonByName = async (name: string) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};