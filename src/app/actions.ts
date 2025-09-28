
'use server'

import { z } from 'zod';
import { getCropAdviceFromImage } from '@/ai/flows/crop-advice-from-image';
import { personalizedSchemeRecommendations } from '@/ai/flows/personalized-scheme-recommendations';
import { getChatbotResponse, type ChatbotMessage } from '@/ai/flows/chatbot-flow';

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

export interface ChatbotState {
  messages: ChatbotMessage[];
  error?: string;
}

const chatbotSchema = z.object({
  message: z.string(),
  history: z.string(),
  photoDataUri: z.string().optional(),
});

export async function getChatbotResponseAction(
  prevState: ChatbotState,
  formData: FormData
): Promise<ChatbotState> {
  try {
    const validatedFields = chatbotSchema.safeParse({
      message: formData.get('message'),
      history: formData.get('history'),
      photoDataUri: formData.get('photoDataUri'),
    });

    if (!validatedFields.success) {
      const history = JSON.parse(formData.get('history') as string) as ChatbotMessage[];
      return {
        messages: history,
        error: validatedFields.error.flatten().fieldErrors.message?.[0] || 'Invalid input.',
      };
    }

    const { message, history: historyJSON, photoDataUri } = validatedFields.data;

    if (!message && !photoDataUri) {
      return {
        messages: JSON.parse(historyJSON),
        error: 'Please enter a message or upload a photo.',
      };
    }


    const history = JSON.parse(historyJSON) as ChatbotMessage[];
    const newMessage: ChatbotMessage = { role: 'user', content: message };
    const newHistory: ChatbotMessage[] = [...history, newMessage];

    const result = await getChatbotResponse({ history: newHistory, photoDataUri });

    const responseMessage: ChatbotMessage = { role: 'model', content: result.response };

    return {
      messages: [...newHistory, responseMessage],
    };
  } catch (error) {
    const history = JSON.parse(formData.get('history') as string) as ChatbotMessage[];
    return {
      messages: history,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
