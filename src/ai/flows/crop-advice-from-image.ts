'use server';
/**
 * @fileOverview Provides crop advice based on an image of the crops.
 *
 * - getCropAdviceFromImage - A function that takes an image of crops and returns advice.
 * - CropAdviceFromImageInput - The input type for the getCropAdviceFromImage function.
 * - CropAdviceFromImageOutput - The return type for the getCropAdviceFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropAdviceFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the crops, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any additional details about the crops or observed issues.'),
});
export type CropAdviceFromImageInput = z.infer<typeof CropAdviceFromImageInputSchema>;

const CropAdviceFromImageOutputSchema = z.object({
  advice: z.string().describe('Advice on potential issues and solutions for the crops.'),
});
export type CropAdviceFromImageOutput = z.infer<typeof CropAdviceFromImageOutputSchema>;

export async function getCropAdviceFromImage(input: CropAdviceFromImageInput): Promise<CropAdviceFromImageOutput> {
  return cropAdviceFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropAdviceFromImagePrompt',
  input: {schema: CropAdviceFromImageInputSchema},
  output: {schema: CropAdviceFromImageOutputSchema},
  prompt: `You are an expert agricultural advisor. A farmer has provided a photo of their crops and is seeking advice.

{% if additionalDetails %}Additional details provided by the farmer: {{{additionalDetails}}}.{% endif %}

Analyze the image and provide advice on potential issues, solutions, and ways to improve crop yield.

Image: {{media url=photoDataUri}}`,
});

const cropAdviceFromImageFlow = ai.defineFlow(
  {
    name: 'cropAdviceFromImageFlow',
    inputSchema: CropAdviceFromImageInputSchema,
    outputSchema: CropAdviceFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
