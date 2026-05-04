export interface SpawnPrediction {
  pokemonId: number;
  pokemonName: string;
  imageUrl: string;
  types: string[];
  probability: number;
  reason: string;
}