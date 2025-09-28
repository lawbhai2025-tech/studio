'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { schemes } from '@/lib/schemes-data';

export const searchSchemes = ai.defineTool(
  {
    name: 'searchSchemes',
    description: 'Searches for relevant government schemes for farmers based on a query.',
    inputSchema: z.object({
      query: z.string().describe('A query describing the farmer\'s needs.'),
    }),
    outputSchema: z.object({
      schemes: z.array(z.object({
          name: z.string().describe('The name of the scheme.'),
          purpose: z.string().describe('The purpose of the scheme.'),
      })).describe('A list of relevant schemes.'),
    }),
  },
  async (input) => {
    const prompt = `You are a search expert. Find the most relevant government schemes for farmers from the following text based on the user's query.

    QUERY:
    ${input.query}
    
    AVAILABLE SCHEMES:
    ${schemes}
    
    Return a list of the names and purposes of the most relevant schemes.`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: z.object({
          schemes: z.array(z.object({
              name: z.string(),
              purpose: z.string(),
          })),
        }),
      },
    });

    return llmResponse.output || { schemes: [] };
  }
);
