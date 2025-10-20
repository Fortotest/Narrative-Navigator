'use server';

/**
 * @fileOverview A crypto narrative generation AI agent.
 *
 * - generateCryptoNarrative - A function that generates a personalized narrative for a cryptocurrency.
 * - GenerateCryptoNarrativeInput - The input type for the generateCryptoNarrative function.
 * - GenerateCryptoNarrativeOutput - The return type for the generateCryptoNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCryptoNarrativeInputSchema = z.object({
  assetSymbol: z.string().describe('The symbol of the crypto asset.'),
  marketData: z.string().describe('Current market data for the crypto asset.'),
  newsFeed: z.string().describe('Recent news feed related to the crypto asset.'),
});
export type GenerateCryptoNarrativeInput = z.infer<typeof GenerateCryptoNarrativeInputSchema>;

const GenerateCryptoNarrativeOutputSchema = z.object({
  narrative: z.string().describe('A personalized narrative for the crypto asset.'),
});
export type GenerateCryptoNarrativeOutput = z.infer<typeof GenerateCryptoNarrativeOutputSchema>;

export async function generateCryptoNarrative(
  input: GenerateCryptoNarrativeInput
): Promise<GenerateCryptoNarrativeOutput> {
  return generateCryptoNarrativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCryptoNarrativePrompt',
  input: {schema: GenerateCryptoNarrativeInputSchema},
  output: {schema: GenerateCryptoNarrativeOutputSchema},
  prompt: `You are an AI assistant that specializes in generating personalized narratives for crypto assets.

  Based on the asset symbol, current market data, and recent news, generate a concise narrative.

  Asset Symbol: {{{assetSymbol}}}
  Current Market Data: {{{marketData}}}
  Recent News Feed: {{{newsFeed}}}

  Generate a personalized narrative for the crypto asset.
  Narrative:`,
});

const generateCryptoNarrativeFlow = ai.defineFlow(
  {
    name: 'generateCryptoNarrativeFlow',
    inputSchema: GenerateCryptoNarrativeInputSchema,
    outputSchema: GenerateCryptoNarrativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
