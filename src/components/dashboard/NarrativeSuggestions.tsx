'use client';

import { useState, useTransition } from 'react';
import { Bot } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/useAuth';
import { getNarrativeSuggestionsAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function NarrativeSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!user) {
      toast({ title: 'Please login to get suggestions', variant: 'destructive' });
      return;
    }
    startTransition(async () => {
      const result = await getNarrativeSuggestionsAction(user.uid);
      if (result.error) {
        toast({ title: 'Could not generate suggestions', description: result.error, variant: 'destructive' });
        setSuggestions([]);
      } else {
        setSuggestions(result.suggestions);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <span>AI Narrative Insights</span>
        </CardTitle>
        <CardDescription>
          Generate personalized narrative suggestions based on your watchlist.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[10rem]">
        {isPending ? (
          <div className="flex h-full min-h-[10rem] items-center justify-center">
            <Spinner />
          </div>
        ) : suggestions.length > 0 ? (
          <div className="space-y-4 animate-in fade-in-50 duration-500">
            {suggestions.map((suggestion, index) => (
              <Alert key={index}>
                <Bot className="h-4 w-4" />
                <AlertTitle>Narrative Suggestion</AlertTitle>
                <AlertDescription>{suggestion}</AlertDescription>
              </Alert>
            ))}
          </div>
        ) : (
          <div className="flex h-full min-h-[10rem] flex-col items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">
              Click &quot;Generate&quot; to discover new crypto narratives.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Generating...
            </>
          ) : (
            'Generate Suggestions'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
