import type { User } from 'firebase/auth';

export type FirebaseUser = User;

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

export type WatchlistItem = {
  coinId: string;
  addedAt: {
    seconds: number;
    nanoseconds: number;
  };
};
