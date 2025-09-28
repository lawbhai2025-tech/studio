import {z} from 'genkit';

export const ChatbotMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export type ChatbotMessage = z.infer<typeof ChatbotMessageSchema>;

export const ChatbotInputSchema = z.object({
  history: z.array(ChatbotMessageSchema).describe('The chat history.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.object({
  response: z.string().describe("The chatbot's response."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;
