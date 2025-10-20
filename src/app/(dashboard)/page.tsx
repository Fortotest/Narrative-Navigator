import { getMarketData } from '@/lib/coingecko';
import { getWatchlist } from '@/lib/firebase/firestore';
import { MarketTable } from '@/components/dashboard/MarketTable';
import { NarrativeSuggestions } from '@/components/dashboard/NarrativeSuggestions';
import { auth } from '@/lib/firebase/client';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // This is a server component, but auth() from next-auth would be better here.
  // With firebase, we have to rely on the client-side check in the layout for now.
  // A server-side session management would be needed for a fully secure server component data fetch based on user.
  // For this example, we'll assume the client-side auth guard is sufficient.
  // We can get the user from a server session if we implement it.
  // For now, let's get it on the client in the components that need it.
  
  const marketData = await getMarketData();
  const user = auth.currentUser;
  const watchlist = user ? await getWatchlist(user.uid) : [];

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
