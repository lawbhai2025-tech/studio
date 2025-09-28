import {z} from 'genkit';

export const ChatbotMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export type ChatbotMessage = z.infer<typeof ChatbotMessageSchema>;

export const ChatbotInputSchema = z.object({
  history: z.array(ChatbotMessageSchema).describe('The chat history.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. This is optional."
    ),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.object({
  response: z.string().describe("The chatbot's response."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;
