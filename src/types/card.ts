export interface Card {
  suit: string;
  value: string;
  numericValue: number;
}

export interface GameState {
  playerDeck: Card[];
  computerDeck: Card[];
  playerCard: Card | null;
  computerCard: Card | null;
  warPile: Card[];
  gameStatus: string;
  isWar: boolean;
}