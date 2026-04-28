import type { PokemonDetail, PokemonMove } from "./pokemon";

export interface TeamSlot {
  id: string;
  pokemon: PokemonDetail;
  selectedAbility: string;
  selectedMoves: PokemonMove[];
}

export interface PokemonTeamDraft {
  name: string;
  slots: TeamSlot[];
}