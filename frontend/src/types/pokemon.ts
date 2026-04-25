export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface PokemonType {
  key: string;
  name: string;
}

export interface PokemonEvolution {
  id: number;
  name: string;
  image: string;
}

export interface PokemonMove {
  name: string;
  learnMethod: string;
  levelLearnedAt: number | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: string[];
  moves: PokemonMove[];
  evolutions: PokemonEvolution[];
  image: string;
}