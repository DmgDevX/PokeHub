export interface TcgCard {
  id: string;
  name: string;
  image: string | null;
  localId: string | null;
  category: string | null;
  rarity: string | null;
  setName: string | null;
}

export interface TcgCardDetail {
  id: string;
  name: string;
  image: string | null;
  localId: string | null;
  category: string | null;
  illustrator: string | null;
  rarity: string | null;
  setName: string | null;
  types: string[];
}

export interface TcgCardPage {
  cards: TcgCard[];
  page: number;
  size: number;
  hasMore: boolean;
}