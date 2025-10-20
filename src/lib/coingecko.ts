import { Coin } from '@/types';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export async function getMarketData(): Promise<Coin[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
      {
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch market data from CoinGecko');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('CoinGecko API Error:', error);
    return [];
  }
}

export async function getCoinData(coinIds: string[]): Promise<Coin[]> {
    if (coinIds.length === 0) return [];
    try {
      const response = await fetch(
        `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        {
          next: { revalidate: 300 }, // Revalidate every 5 minutes
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch coin data from CoinGecko');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('CoinGecko API Error:', error);
      return [];
    }
  }
