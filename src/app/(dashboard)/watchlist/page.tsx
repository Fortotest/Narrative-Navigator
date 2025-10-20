import { getCoinData } from '@/lib/coingecko';
import { getWatchlist } from '@/lib/firebase/firestore';
import { auth } from '@/lib/firebase/client';
import { WatchlistClient } from '@/components/watchlist/WatchlistClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function WatchlistPage() {
  const user = auth.currentUser;

  if (!user) {
    // This should technically not be reached due to layout protection, but as a safeguard:
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

  const watchlistIds = await getWatchlist(user.uid);
  const watchlistData = await getCoinData(watchlistIds);

  if (watchlistData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
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
