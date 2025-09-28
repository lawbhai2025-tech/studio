'use server';
/**
 * @fileOverview A chatbot flow for Krishi Sahayak.
 *
 * - getChatbotResponse - A function that returns a response from the chatbot.
 * - ChatbotInput - The input type for the getChatbotResponse function.
 * - ChatbotOutput - The return type for the getChatbotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  ChatbotInputSchema,
  ChatbotOutputSchema,
} from '@/ai/schemas/chatbot-schemas';
import type {
  ChatbotInput,
  ChatbotOutput,
} from '@/ai/schemas/chatbot-schemas';

export type {
  ChatbotMessage,
  ChatbotInput,
  ChatbotOutput,
} from '@/ai/schemas/chatbot-schemas';

const fixedResponses: Record<string, string> = {
  "what are the key features of this app?": "Krishi Sahayak offers AI-powered crop advice, personalized government scheme recommendations, daily Mandi prices, and weather advisories to help you make informed farming decisions.",
  "how do i get crop advice?": "You can get crop advice by navigating to the 'AI Advisory' section on the dashboard, selecting the 'Crop Advice' tab, and uploading a picture of your crop. Our AI will analyze it and provide recommendations.",
  "can you tell me about government schemes?": "Yes, under the 'AI Advisory' section, go to the 'Scheme Recommendations' tab. Describe your farm and needs, and our AI will suggest relevant government schemes for you.",
  "where can i see the market prices?": "The daily Mandi prices for major crops in your local market are displayed on the main dashboard in the 'Daily Mandi Prices' card."
};

export async function getChatbotResponse(
  input: ChatbotInput
): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a friendly and helpful chatbot for Krishi Sahayak, an AI-powered advisory system for farmers. Your name is "Krishi Dost".

  Your role is to answer questions from farmers about agriculture, farming techniques, crop management, government schemes, and market prices.

  {{#if photoDataUri}}
  The user has provided an image. Analyze the image and use it as the primary context for your response. If the user's message is related to the image, provide a detailed analysis. If the message is not related, you can acknowledge the image and answer the question.
  Image: {{media url=photoDataUri}}
  {{/if}}

  Here is the conversation history:
  {{#each history}}
  {{#if (eq role 'user')}}
  User: {{{content}}}
  {{/if}}
  {{#if (eq role 'model')}}
  Krishi Dost: {{{content}}}
  {{/if}}
  {{/each}}

  Please provide a helpful and concise response to the last user message.`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const lastUserMessage = input.history[input.history.length - 1];

    if (lastUserMessage && lastUserMessage.role === 'user') {
      const userQuestion = lastUserMessage.content.toLowerCase().trim();
      if (fixedResponses[userQuestion]) {
        return { response: fixedResponses[userQuestion] };
      }
    }
    
    const {output} = await prompt(input);
    return output!;
  }
);
