"use server";

import { dataMappingWithLLM } from '@/ai/flows/data-mapping-with-llm';
import { AMADEUS_APIS } from '@/lib/amadeus-apis';

export async function executeApiAndMapData(
  apiId: string,
  _params: Record<string, any>
): Promise<{ raw: object; mapped: string } | { error: string }> {
  try {
    const api = AMADEUS_APIS.find((a) => a.id === apiId);

    if (!api) {
      throw new Error('API not found');
    }

    // In a real application, you would use the params to make an actual API call.
    // For this prototype, we just use the mock response.
    const rawApiResponse = api.mockResponse;

    const mappingResult = await dataMappingWithLLM({
      apiResponse: JSON.stringify(rawApiResponse, null, 2),
      uiRequirements: api.uiRequirements,
    });

    return {
      raw: rawApiResponse,
      mapped: mappingResult.mappedData,
    };
  } catch (error) {
    console.error('Error executing API and mapping data:', error);
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred.',
    };
  }
}
