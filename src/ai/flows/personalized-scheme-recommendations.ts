'use server';

/**
 * @fileOverview Personalized scheme recommendations for farmers.
 *
 * - personalizedSchemeRecommendations - A function that provides personalized government scheme recommendations based on user profile and farm details.
 * - PersonalizedSchemeRecommendationsInput - The input type for the personalizedSchemeRecommendations function.
 * - PersonalizedSchemeRecommendationsOutput - The return type for the personalizedSchemeRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { searchSchemes } from '../tools/scheme-search-tool';

const PersonalizedSchemeRecommendationsInputSchema = z.object({
  farmerProfile: z
    .string()
    .describe('Details of the farmer profile, including location, farm size, crops grown, etc.'),
});
export type PersonalizedSchemeRecommendationsInput = z.infer<
  typeof PersonalizedSchemeRecommendationsInputSchema
>;

const PersonalizedSchemeRecommendationsOutputSchema = z.object({
  recommendedSchemes: z
    .array(z.string())
    .describe('A list of government schemes recommended for the farmer.'),
});
export type PersonalizedSchemeRecommendationsOutput = z.infer<
  typeof PersonalizedSchemeRecommendationsOutputSchema
>;

export async function personalizedSchemeRecommendations(
  input: PersonalizedSchemeRecommendationsInput
): Promise<PersonalizedSchemeRecommendationsOutput> {
  return personalizedSchemeRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSchemeRecommendationsPrompt',
  input: {schema: PersonalizedSchemeRecommendationsInputSchema},
  output: {schema: PersonalizedSchemeRecommendationsOutputSchema},
  tools: [searchSchemes],
  prompt: `You are an expert in recommending government schemes to farmers.

  Based on the following farmer profile, recommend a list of relevant government schemes that the farmer can benefit from. Use the provided tool to search for schemes.

  Farmer Profile: {{{farmerProfile}}}

  Provide only a list of scheme names.
  `,
});

const personalizedSchemeRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedSchemeRecommendationsFlow',
    inputSchema: PersonalizedSchemeRecommendationsInputSchema,
    outputSchema: PersonalizedSchemeRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
