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
import { ChatbotInputSchema, ChatbotOutputSchema } from '@/ai/schemas/chatbot-schemas';
import type { ChatbotInput, ChatbotOutput } from '@/ai/schemas/chatbot-schemas';

export type { ChatbotMessage, ChatbotInput, ChatbotOutput } from '@/ai/schemas/chatbot-schemas';


export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a friendly and helpful chatbot for Krishi Sahayak, an AI-powered advisory system for farmers. Your name is "Krishi Dost".

  Your role is to answer questions from farmers about agriculture, farming techniques, crop management, government schemes, and market prices.

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
    const {output} = await prompt(input);
    return output!;
  }
);
