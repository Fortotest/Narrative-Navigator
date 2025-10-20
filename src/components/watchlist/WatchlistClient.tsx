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
import { Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import Image from 'next/image';

interface WatchlistClientProps {
  watchlistData: Coin[];
  watchlistIds: string[];
}

export function WatchlistClient({ watchlistData, watchlistIds }: WatchlistClientProps) {
  const { user } = useAuth();
  const [data, setData] = useState(watchlistData);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = (coinId: string) => {
    if (!user) return;
    setRemovingId(coinId);
    startTransition(async () => {
      const result = await toggleWatchlistAction(user.uid, coinId, true, pathname);
      if (result.success) {
        setData(data.filter((coin) => coin.id !== coinId));
        toast({ title: 'Removed from watchlist' });
      } else {
        toast({ title: 'Error removing from watchlist', description: result.error, variant: 'destructive' });
      }
      setRemovingId(null);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Watchlist</CardTitle>
        <CardDescription>Assets you are currently tracking.</CardDescription>
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
              {data.map((coin) => (
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
                      onClick={() => handleRemove(coin.id)}
                      disabled={isPending && removingId === coin.id}
                    >
                      {isPending && removingId === coin.id ? (
                        <Spinner size="sm" />
                      ) : (
                        <Trash className="h-4 w-4 text-destructive" />
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
