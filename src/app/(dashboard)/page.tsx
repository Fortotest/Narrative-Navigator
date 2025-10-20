'use client';

import { getMarketData } from '@/lib/coingecko';
import { getWatchlist } from '@/lib/firebase/firestore';
import { MarketTable } from '@/components/dashboard/MarketTable';
import { NarrativeSuggestions } from '@/components/dashboard/NarrativeSuggestions';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import type { Coin } from '@/types';
import { Spinner } from '@/components/ui/spinner';

export default function DashboardPage() {
  const { user } = useAuth();
  const [marketData, setMarketData] = useState<Coin[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [market, watch] = await Promise.all([
          getMarketData(),
          user ? getWatchlist(user.uid) : Promise.resolve([]),
        ]);
        setMarketData(market);
        setWatchlist(watch);
      } catch (e) {
        console.error("Failed to fetch dashboard data", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <MarketTable initialMarketData={marketData} initialWatchlist={watchlist} />
      </div>
      <div className="lg:col-span-1">
        <NarrativeSuggestions />
      </div>
    </div>
  );
}
