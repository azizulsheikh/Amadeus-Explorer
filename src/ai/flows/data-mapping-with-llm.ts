// 'use server'

/**
 * @fileOverview A data mapping AI agent that takes raw API response from Amadeus and
 * maps it to a format suitable for the UI.
 *
 * - dataMappingWithLLM - A function that handles the data mapping process.
 * - DataMappingWithLLMInput - The input type for the dataMappingWithLLM function.
 * - DataMappingWithLLMOutput - The return type for the dataMappingWithLLM function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DataMappingWithLLMInputSchema = z.object({
  apiResponse: z.string().describe('The raw JSON API response from Amadeus.'),
  uiRequirements: z
    .string()
    .describe('The requirements for the UI display format.'),
});
export type DataMappingWithLLMInput = z.infer<typeof DataMappingWithLLMInputSchema>;

const DataMappingWithLLMOutputSchema = z.object({
  mappedData: z
    .string()
    .describe('The API data mapped to the format suitable for the UI.'),
});
export type DataMappingWithLLMOutput = z.infer<typeof DataMappingWithLLMOutputSchema>;

export async function dataMappingWithLLM(input: DataMappingWithLLMInput): Promise<DataMappingWithLLMOutput> {
  return dataMappingWithLLMFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dataMappingWithLLMPrompt',
  input: {
    schema: DataMappingWithLLMInputSchema,
  },
  output: {
    schema: DataMappingWithLLMOutputSchema,
  },
  prompt: `You are a data mapping expert. Your task is to transform the raw API response from Amadeus to a format suitable for the UI, based on the UI requirements.

UI Requirements: {{{uiRequirements}}}

Raw API Response: {{{apiResponse}}}

Please provide the mapped data in JSON format.`,
});

const dataMappingWithLLMFlow = ai.defineFlow(
  {
    name: 'dataMappingWithLLMFlow',
    inputSchema: DataMappingWithLLMInputSchema,
    outputSchema: DataMappingWithLLMOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
