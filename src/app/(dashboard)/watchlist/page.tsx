'use client';

import { getCoinData } from '@/lib/coingecko';
import { getWatchlist } from '@/lib/firebase/firestore';
import { WatchlistClient } from '@/components/watchlist/WatchlistClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import type { Coin } from '@/types';
import { Spinner } from '@/components/ui/spinner';

export default function WatchlistPage() {
  const { user } = useAuth();
  const [watchlistData, setWatchlistData] = useState<Coin[]>([]);
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlist() {
      if (user) {
        setLoading(true);
        try {
          const ids = await getWatchlist(user.uid);
          setWatchlistIds(ids);
          if (ids.length > 0) {
            const data = await getCoinData(ids);
            setWatchlistData(data);
          } else {
            setWatchlistData([]);
          }
        } catch (e) {
          console.error("Failed to fetch watchlist", e)
          setWatchlistData([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setWatchlistData([]);
        setWatchlistIds([]);
      }
    }
    fetchWatchlist();
  }, [user]);

  if (loading) {
    return (
       <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Please Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You need to be logged in to view your watchlist.</p>
        </CardContent>
      </Card>
    );
  }

  if (watchlistData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-[calc(100vh-10rem)]">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">You have no assets in your watchlist</h3>
          <p className="text-sm text-muted-foreground">
            Start adding assets from the dashboard to see them here.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/">
              <Star className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return <WatchlistClient watchlistData={watchlistData} watchlistIds={watchlistIds} />;
}
