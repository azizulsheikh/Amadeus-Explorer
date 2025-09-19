"use server";

import Amadeus from 'amadeus';
import { dataMappingWithLLM } from '@/ai/flows/data-mapping-with-llm';
import { AMADEUS_APIS } from '@/lib/amadeus-apis';

const getAmadeusClient = (apiKey: string, apiSecret: string) => {
  if (!apiKey || !apiSecret) {
    return null;
  }
  return new Amadeus({
    clientId: apiKey,
    clientSecret: apiSecret,
  });
};

export async function executeApiAndMapData(
  apiId: string,
  params: Record<string, any>,
  apiKey: string,
  apiSecret: string,
  useMock: boolean
): Promise<{ raw: object; mapped: string } | { error: string }> {
  try {
    const api = AMADEUS_APIS.find((a) => a.id === apiId);

    if (!api) {
      throw new Error('API not found');
    }
    
    let rawApiResponse: object;

    if (useMock || !apiKey || !apiSecret) {
      rawApiResponse = api.mockResponse;
    } else {
      const amadeus = getAmadeusClient(apiKey, apiSecret);
      if (!amadeus) {
        throw new Error('Amadeus client could not be initialized. Check your API key and secret.');
      }
      
      // This is a simplified dispatcher. A real implementation would need more robust mapping.
      const [namespace, resource, action] = api.id.split('-');
      
      let apiPromise;

      // This is a very basic router. More complex APIs might need a more sophisticated approach.
      switch (api.id) {
        case 'flight-offers-search':
          apiPromise = amadeus.shopping.flightOffersSearch.get(params);
          break;
        case 'hotel-search':
          apiPromise = amadeus.shopping.hotelOffersSearch.get(params);
          break;
        case 'points-of-interest':
           const poiParams = { latitude: params.latitude, longitude: params.longitude, radius: params.radius };
           apiPromise = amadeus.referenceData.locations.pointsOfInterest.get(poiParams);
          break;
        case 'flight-cheapest-date-search':
          apiPromise = amadeus.shopping.flightDates.get(params);
          break;
        case 'flight-inspiration-search':
          apiPromise = amadeus.shopping.flightDestinations.get(params);
          break;
        case 'airport-nearest-relevant':
            apiPromise = amadeus.referenceData.locations.airports.get(params);
            break;
        // Add other API cases here as needed...
        default:
          console.warn(`No live API mapping for ${api.id}, using mock data.`);
          rawApiResponse = api.mockResponse;
      }

      if (apiPromise) {
        const response = await apiPromise;
        rawApiResponse = response.data;
      } else if (!rawApiResponse) {
        rawApiResponse = api.mockResponse;
      }
    }

    const mappingResult = await dataMappingWithLLM({
      apiResponse: JSON.stringify(rawApiResponse, null, 2),
      uiRequirements: api.uiRequirements,
    });

    return {
      raw: rawApiResponse,
      mapped: mappingResult.mappedData,
    };
  } catch (error: any) {
    console.error('Error executing API and mapping data:', error);
    // Amadeus SDK often wraps errors in a response object
    const errorMessage = error.response?.description?.detail || error.message || 'An unknown error occurred.';
    return {
      error: errorMessage,
    };
  }
}
