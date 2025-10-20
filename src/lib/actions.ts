'use server';

import { revalidatePath } from 'next/cache';
import { getPersonalizedNarrativeSuggestions } from '@/ai/flows/personalized-narrative-suggestions';
import { getCoinData } from './coingecko';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from './firebase/firestore';

export async function toggleWatchlistAction(userId: string, coinId: string, isWatching: boolean, path: string) {
  try {
    if (isWatching) {
      await removeFromWatchlist(userId, coinId);
    } else {
      await addToWatchlist(userId, coinId);
    }
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error('Error toggling watchlist:', error);
    return { success: false, error: 'Failed to update watchlist.' };
  }
}

export async function getNarrativeSuggestionsAction(userId: string) {
  try {
    const watchlist = await getWatchlist(userId);
    if (watchlist.length === 0) {
      return { suggestions: [], error: 'Your watchlist is empty. Add some assets to get narrative suggestions.' };
    }
    
    const marketData = await getCoinData(watchlist);
    const marketDataSummary = marketData
      .map(
        (coin) =>
          `${coin.name} (${coin.symbol.toUpperCase()}): Price $${coin.current_price}, 24h Change ${coin.price_change_percentage_24h.toFixed(2)}%`
      )
      .join('\n');

    // In a real application, you would fetch real news here.
    const newsFeedSummary = 'Crypto markets are showing mixed signals. Bitcoin remains stable above $60,000. Ethereum L2 solutions are gaining traction. The meme coin sector is experiencing high volatility.';

    const result = await getPersonalizedNarrativeSuggestions({
      assetList: watchlist,
      marketData: marketDataSummary,
      newsFeed: newsFeedSummary,
    });

    return { suggestions: result.narrativeSuggestions, error: null };
  } catch (error) {
    console.error('Error getting narrative suggestions:', error);
    return { suggestions: [], error: 'Failed to generate narrative suggestions.' };
  }
}
