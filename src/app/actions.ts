
'use server'

import { z } from 'zod';
import { getCropAdviceFromImage } from '@/ai/flows/crop-advice-from-image';
import { personalizedSchemeRecommendations } from '@/ai/flows/personalized-scheme-recommendations';

export interface CropAdviceState {
  advice?: string;
  error?: string;
}

const cropAdviceSchema = z.object({
  image: z.instanceof(File).refine((file) => file.size > 0, 'Image is required.'),
  details: z.string().optional(),
});

export async function getCropAdvice(
  prevState: CropAdviceState,
  formData: FormData
): Promise<CropAdviceState> {
  try {
    const validatedFields = cropAdviceSchema.safeParse({
      image: formData.get('image'),
      details: formData.get('details'),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors.image?.[0] || 'Invalid input.',
      };
    }
    
    const { image, details } = validatedFields.data;

    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const photoDataUri = `data:${image.type};base64,${base64}`;

    const result = await getCropAdviceFromImage({
      photoDataUri,
      additionalDetails: details,
    });

    return { advice: result.advice };
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export interface SchemeRecommendationState {
  schemes?: string[];
  error?: string;
}

const schemeSchema = z.object({
  profile: z.string().min(10, 'Please provide more details in your profile.'),
});

export async function getSchemeRecommendations(
  prevState: SchemeRecommendationState,
  formData: FormData
): Promise<SchemeRecommendationState> {
  try {
    const validatedFields = schemeSchema.safeParse({
      profile: formData.get('profile'),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors.profile?.[0] || 'Invalid input.',
      };
    }

    const { profile } = validatedFields.data;

    const result = await personalizedSchemeRecommendations({
      farmerProfile: profile,
    });

    return { schemes: result.recommendedSchemes };
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
