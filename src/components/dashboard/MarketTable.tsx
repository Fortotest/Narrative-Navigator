'use client';

import { useState, useTransition } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toggleWatchlistAction } from '@/lib/actions';
import type { Coin } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import Image from 'next/image';

interface MarketTableProps {
  initialMarketData: Coin[];
  initialWatchlist: string[];
}

export function MarketTable({ initialMarketData, initialWatchlist }: MarketTableProps) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(initialWatchlist));
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();

  const handleToggleWatchlist = (coinId: string) => {
    if (!user) {
      toast({ title: 'Please log in to use watchlist', variant: 'destructive' });
      return;
    }

    const isWatching = watchlist.has(coinId);
    
    // Optimistic update
    const newWatchlist = new Set(watchlist);
    if (isWatching) {
      newWatchlist.delete(coinId);
    } else {
      newWatchlist.add(coinId);
    }
    setWatchlist(newWatchlist);

    startTransition(async () => {
      const result = await toggleWatchlistAction(user.uid, coinId, isWatching, pathname);
      if (!result.success) {
        toast({ title: 'Error updating watchlist', description: result.error, variant: 'destructive' });
        // Revert optimistic update on failure
        setWatchlist(new Set(watchlist));
      } else {
        toast({
          title: `Successfully ${isWatching ? 'removed from' : 'added to'} watchlist!`,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Top 50 cryptocurrencies by market cap.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-auto max-h-[calc(100vh-20rem)]">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialMarketData.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell>
                     <Image src={coin.image} alt={coin.name} width={24} height={24} className="rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${coin.current_price.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right',
                      coin.price_change_percentage_24h > 0 ? 'text-positive' : 'text-negative'
                    )}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    ${coin.market_cap.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleWatchlist(coin.id)}
                      disabled={isPending}
                    >
                      {isPending && watchlist.has(coin.id) ? (
                        <Spinner size="sm" />
                      ) : (
                        <Star
                          className={cn(
                            'h-4 w-4',
                            watchlist.has(coin.id) && 'fill-yellow-400 text-yellow-400'
                          )}
                        />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
