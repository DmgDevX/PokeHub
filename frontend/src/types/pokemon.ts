export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  moves: string[];
  image: string;
}