
"use server";

import Amadeus from 'amadeus';
import { dataMappingWithLLM } from '@/ai/flows/data-mapping-with-llm';
import { AMADEUS_APIS } from '@/lib/amadeus-apis';

const getAmadeusClient = (apiKey?: string, apiSecret?: string) => {
  if (!apiKey || !apiSecret || apiKey === 'YOUR_API_KEY' || apiSecret === 'YOUR_API_SECRET') {
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
  useMock: boolean
): Promise<{ raw: object; mapped: string } | { error: string }> {
  try {
    const api = AMADEUS_APIS.find((a) => a.id === apiId);

    if (!api) {
      throw new Error('API not found');
    }
    
    let rawApiResponse: object;
    
    const apiKey = process.env.AMADEUS_API_KEY;
    const apiSecret = process.env.AMADEUS_API_SECRET;
    const amadeus = getAmadeusClient(apiKey, apiSecret);

    if (useMock) {
      rawApiResponse = api.mockResponse;
    } else {
      if (!amadeus) {
        return { error: 'Amadeus API credentials are not configured. Please add AMADEUS_API_KEY and AMADEUS_API_SECRET to your .env file.' };
      }
      
      let apiPromise;

      // This is a basic router. More complex APIs might need a more sophisticated approach.
      switch (api.id) {
        case 'airline-code-lookup':
            apiPromise = amadeus.referenceData.airlines.get({ airlineCodes: params.airlineName });
            break;
        case 'airline-routes':
            // The SDK might not have a direct mapping for this. Assuming a generic call pattern.
            // This is a placeholder, actual implementation depends on the exact SDK method.
            apiPromise = amadeus.airline.destinations.get({ airlineCode: params.airlineCode });
            break;
        case 'airport-city-search':
            apiPromise = amadeus.referenceData.locations.get({
                keyword: params.keyword,
                subType: Amadeus.location.any,
            });
            break;
        case 'airport-nearest-relevant':
            apiPromise = amadeus.referenceData.locations.airports.get(params);
            break;
        case 'airport-on-time-performance':
            apiPromise = amadeus.airport.predictions.onTime.get({ airportCode: params.airportCode, date: params.date });
            break;
        case 'airport-routes':
            apiPromise = amadeus.airport.directDestinations.get({ departureAirportCode: params.airportCode });
            break;
        case 'branded-fares-upsell':
            // Requires a flight offers search response body, which is too complex for this form.
            console.warn(`No direct SDK mapping for ${api.id}, using mock data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'city-search':
            apiPromise = amadeus.referenceData.locations.cities.get({ keyword: params.keyword });
            break;
        case 'flight-availabilities-search':
             // This is a placeholder, the actual SDK call is more complex.
            console.warn(`No direct SDK mapping for ${api.id}, using mock data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'flight-busiest-traveling-period':
            apiPromise = amadeus.travel.analytics.airTraffic.busiestPeriod.get({
                cityCode: params.cityCode,
                period: params.period,
                direction: Amadeus.direction.arriving
            });
            break;
        case 'flight-cheapest-date-search':
            apiPromise = amadeus.shopping.flightDates.get(params);
            break;
        case 'flight-check-in-links':
            apiPromise = amadeus.referenceData.urls.checkinLinks.get({ airlineCode: params.airlineCode });
            break;
        case 'flight-choice-prediction':
            // Requires flight offers JSON as input, which is complex for this form.
            console.warn(`No direct SDK mapping for ${api.id}, using mock data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'flight-create-orders':
            // Requires a full flight offer object, which is complex for this form.
             console.warn(`No direct SDK mapping for ${api.id}, using mock data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'flight-delay-prediction':
            apiPromise = amadeus.travel.predictions.flightDelay.get(params);
            break;
        case 'flight-inspiration-search':
            apiPromise = amadeus.shopping.flightDestinations.get(params);
            break;
        case 'flight-most-booked-destinations':
            apiPromise = amadeus.travel.analytics.airTraffic.booked.get(params);
            break;
        case 'flight-most-traveled-destinations':
            apiPromise = amadeus.travel.analytics.airTraffic.traveled.get(params);
            break;
        case 'flight-offers-price':
            // Requires a full flight offer object, which is complex for this form.
            console.warn(`No direct SDK mapping for ${api.id}, using mock data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'flight-offers-search':
          apiPromise = amadeus.shopping.flightOffersSearch.get(params);
          break;
        case 'flight-order-management':
            apiPromise = amadeus.booking.flightOrder(params.orderId).get();
            break;
        case 'flight-price-analysis':
            apiPromise = amadeus.analytics.itineraryPriceMetrics.get({
                ...params,
                originIataCode: params.origin,
                destinationIataCode: params.destination,
            });
            break;
        case 'hotel-booking':
            // Requires a full hotel offer and guest info, which is complex.
            console.warn(`No direct SDK mapping for ${api.id}, using mock data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'hotel-list':
            apiPromise = amadeus.referenceData.locations.hotels.byCity.get({ cityCode: params.cityCode });
            break;
        case 'hotel-name-autocomplete':
             // The SDK might not have a direct mapping for this specific autocomplete.
            apiPromise = amadeus.referenceData.locations.hotels.byKeyword.get({ keyword: params.keyword });
            break;
        case 'hotel-ratings':
            apiPromise = amadeus.eReputation.hotelSentiments.get({ hotelIds: params.hotelIds });
            break;
        case 'hotel-search':
          apiPromise = amadeus.shopping.hotelOffersSearch.get(params);
          break;
        case 'location-score':
            apiPromise = amadeus.location.analytics.categoryRatedAreas.get(params);
            break;
        case 'on-demand-flight-status':
            apiPromise = amadeus.schedule.flights.get(params);
            break;
        case 'points-of-interest':
           const poiParams = { latitude: params.latitude, longitude: params.longitude, radius: params.radius };
           apiPromise = amadeus.referenceData.locations.pointsOfInterest.get(poiParams);
          break;
        case 'seatmap-display':
            // Requires a flight-order ID from a booking.
            console.warn(`No direct SDK mapping for ${api.id}, using mock data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'tours-and-activities':
            apiPromise = amadeus.shopping.activities.get(params);
            break;
        case 'transfer-booking':
        case 'transfer-management':
        case 'transfer-search':
            console.warn(`Transfer APIs (${api.id}) are not yet implemented for live data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'travel-recommendations':
            apiPromise = amadeus.recommendation.locations.get({
                cityCodes: params.cityCodes,
                travelerCountryCode: 'US' // Example static value
            });
            break;
        case 'travel-restrictions':
             apiPromise = amadeus.dutyOfCare.diseases.travelRestriction.get(params);
             break;
        case 'trip-parser':
            // This API requires a file upload, which is not supported in this form.
            console.warn(`No direct SDK mapping for ${api.id}, using mock data.`);
            rawApiResponse = api.mockResponse;
            break;
        case 'trip-purpose-prediction':
            apiPromise = amadeus.travel.predictions.tripPurpose.get(params);
            break;
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
