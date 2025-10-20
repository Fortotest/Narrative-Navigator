'use server';

/**
 * @fileOverview A personalized narrative suggestion AI agent.
 *
 * - getPersonalizedNarrativeSuggestions - A function that suggests relevant insights related to assets in the user's watchlist.
 * - PersonalizedNarrativeSuggestionsInput - The input type for the getPersonalizedNarrativeSuggestions function.
 * - PersonalizedNarrativeSuggestionsOutput - The return type for the getPersonalizedNarrativeSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedNarrativeSuggestionsInputSchema = z.object({
  assetList: z
    .array(z.string())
    .describe('A list of crypto asset symbols in the user\'s watchlist.'),
  marketData: z.string().describe('Current market data for the crypto assets.'),
  newsFeed: z.string().describe('Recent news feed related to the crypto assets.'),
});
export type PersonalizedNarrativeSuggestionsInput = z.infer<typeof PersonalizedNarrativeSuggestionsInputSchema>;

const PersonalizedNarrativeSuggestionsOutputSchema = z.object({
  narrativeSuggestions:
    z.array(z.string())
      .describe('A list of narrative suggestions based on the asset list, market data, and news feed.'),
});
export type PersonalizedNarrativeSuggestionsOutput = z.infer<typeof PersonalizedNarrativeSuggestionsOutputSchema>;

export async function getPersonalizedNarrativeSuggestions(
  input: PersonalizedNarrativeSuggestionsInput
): Promise<PersonalizedNarrativeSuggestionsOutput> {
  return personalizedNarrativeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedNarrativeSuggestionsPrompt',
  input: {schema: PersonalizedNarrativeSuggestionsInputSchema},
  output: {schema: PersonalizedNarrativeSuggestionsOutputSchema},
  prompt: `You are an AI assistant that specializes in providing narrative suggestions for crypto assets.

  Based on the user's watchlist, current market data, and recent news, generate short summaries of relevant narratives and insights.

  Here is the user's watchlist: {{{assetList}}}
  Here is the current market data: {{{marketData}}}
  Here is the recent news feed: {{{newsFeed}}}

  Provide narrative suggestions that are concise and informative.
  Narrative Suggestions:`,
});

const personalizedNarrativeSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedNarrativeSuggestionsFlow',
    inputSchema: PersonalizedNarrativeSuggestionsInputSchema,
    outputSchema: PersonalizedNarrativeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
