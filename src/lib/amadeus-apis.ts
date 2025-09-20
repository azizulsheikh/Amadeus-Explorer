
import { Plane, Hotel, MapPin, Search, Route, Percent, Calendar, Briefcase, Star, Map, UserCheck, Shield, BookOpen, Clock, Activity, Car, Users, Ban, Wand2, Building } from 'lucide-react';
import type { ComponentType } from 'react';

export type ApiParam = {
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'string';
  required: boolean;
  placeholder?: string;
  defaultValue?: string;
};

export type AmadeusApi = {
  id: string;
  name:string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  params: ApiParam[];
  mockResponse: object;
  uiRequirements: string;
};

export const AMADEUS_APIS: AmadeusApi[] = [
    {
    id: 'airline-code-lookup',
    name: 'Airline Code Lookup',
    description: 'Find airline codes for a given airline name.',
    icon: Search,
    params: [
        { name: 'airlineName', label: 'Airline Name', type: 'text', required: true, placeholder: 'e.g., British Airways', defaultValue: 'British Airways' },
    ],
    mockResponse: { data: [{ iataCode: 'BA', icaoCode: 'BAW', businessName: 'BRITISH AIRWAYS' }] },
    uiRequirements: 'Display the results as a list of airlines with their IATA and ICAO codes.',
  },
  {
    id: 'airline-routes',
    name: 'Airline Routes',
    description: 'Find all routes served by a specific airline.',
    icon: Route,
    params: [
        { name: 'airlineCode', label: 'Airline IATA Code', type: 'text', required: true, placeholder: 'e.g., BA', defaultValue: 'BA' },
    ],
    mockResponse: { data: [{ departure: { iataCode: 'LHR' }, arrival: { iataCode: 'JFK' } }, { departure: { iataCode: 'JFK' }, arrival: { iataCode: 'LHR' } }] },
    uiRequirements: `
      Map the route data to a list of routes. Each route should contain:
      - id: A unique ID generated from the index.
      - departure: The departure IATA code.
      - arrival: The arrival IATA code.
      Return the data as a JSON object with a "routes" key containing an array of these route objects.
    `,
  },
  {
    id: 'airport-city-search',
    name: 'Airport & City Search',
    description: 'Find airports and cities matching a keyword.',
    icon: Building,
    params: [
        { name: 'keyword', label: 'Keyword', type: 'text', required: true, placeholder: 'e.g., London', defaultValue: 'London' },
    ],
    mockResponse: { data: [{ subType: 'CITY', name: 'LONDON', iataCode: 'LON' }, { subType: 'AIRPORT', name: 'HEATHROW', iataCode: 'LHR' }] },
    uiRequirements: `
      Map the location data to a list of locations. Each location should contain:
      - id: A unique ID generated from the index.
      - name: The location name.
      - subType: The subtype (e.g., 'CITY' or 'AIRPORT').
      - iataCode: The IATA code for the location.
      Return the data as a JSON object with a "locations" key containing an array of these location objects.
    `,
  },
  {
    id: 'airport-nearest-relevant',
    name: 'Airport Nearest Relevant',
    description: 'Find the nearest relevant airport to a location.',
    icon: MapPin,
    params: [
        { name: 'latitude', label: 'Latitude', type: 'text', required: true, placeholder: 'e.g., 51.5074', defaultValue: '51.5074' },
        { name: 'longitude', label: 'Longitude', type: 'text', required: true, placeholder: 'e.g., -0.1278', defaultValue: '-0.1278' },
    ],
    mockResponse: { data: [{ name: 'HEATHROW', iataCode: 'LHR' }] },
    uiRequirements: 'Display the nearest airport with its name and IATA code.',
  },
  {
    id: 'airport-on-time-performance',
    name: 'Airport On-Time Performance',
    description: 'Get the on-time performance for a given airport.',
    icon: Percent,
    params: [
        { name: 'airportCode', label: 'Airport IATA Code', type: 'text', required: true, placeholder: 'e.g., LHR', defaultValue: 'LHR' },
        { name: 'date', label: 'Date', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    ],
    mockResponse: { data: [{ airport: 'LHR', onTimePercentage: '85.5' }] },
    uiRequirements: 'Display the on-time percentage for the specified airport.',
  },
  {
    id: 'airport-routes',
    name: 'Airport Routes',
    description: 'Find all routes served by a specific airport.',
    icon: Route,
    params: [
        { name: 'airportCode', label: 'Airport IATA Code', type: 'text', required: true, placeholder: 'e.g., LHR', defaultValue: 'LHR' },
    ],
    mockResponse: { data: [{ departure: { iataCode: 'LHR' }, arrival: { iataCode: 'JFK' } }, { departure: { iataCode: 'LHR' }, arrival: { iataCode: 'CDG' } }] },
    uiRequirements: 'Display a list of destination airports from the origin airport.',
  },
  {
    id: 'branded-fares-upsell',
    name: 'Branded Fares Upsell',
    description: 'Check for upsell opportunities on branded fares.',
    icon: Star,
    params: [
        { name: 'flightOfferId', label: 'Flight Offer ID', type: 'text', required: true, placeholder: 'e.g., 12345', defaultValue: '12345' },
    ],
    mockResponse: { data: [{ name: 'Business Class', price: { total: '1200.00' } }] },
    uiRequirements: 'Display the upsell fare options with their names and prices.',
  },
  {
    id: 'city-search',
    name: 'City Search',
    description: 'Search for cities matching a keyword.',
    icon: Search,
    params: [
        { name: 'keyword', label: 'Keyword', type: 'text', required: true, placeholder: 'e.g., Paris', defaultValue: 'Paris' },
    ],
    mockResponse: { data: [{ name: 'PARIS', iataCode: 'PAR' }] },
    uiRequirements: 'Display a list of matching cities with their IATA codes.',
  },
  {
    id: 'flight-availabilities-search',
    name: 'Flight Availabilities Search',
    description: 'Search for flight availabilities on a specific route.',
    icon: Calendar,
    params: [
      { name: 'originLocationCode', label: 'Origin IATA Code', type: 'text', required: true, placeholder: 'e.g., LHR', defaultValue: 'LHR' },
      { name: 'destinationLocationCode', label: 'Destination IATA Code', type: 'text', required: true, placeholder: 'e.g., JFK', defaultValue: 'JFK' },
      { name: 'departureDate', label: 'Departure Date', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    ],
    mockResponse: { data: [{ id: '1', departure: '10:00', arrival: '13:00', carrier: 'BA' }] },
    uiRequirements: `
      Map the flight availability data to a list of flights. The API returns a simple list with times, not full date-times.
      The 'departureDate' from the original user request is available in the context.
      Each flight should contain:
      - id: The availability ID.
      - airline: The carrier code.
      - departure: An object with iataCode (from originLocationCode) and time. The time should be a full date-time string constructed by combining the departureDate from the request with the time from the API response (e.g., '2024-10-28T10:00:00').
      - arrival: An object with iataCode (from destinationLocationCode) and time. The time should be a full date-time string constructed by combining the departureDate with the time from the API response.
      - duration: The duration string.
      - price: 0 (as price is not available).
      - currency: "USD" (as currency is not available).
      Return the data as a JSON object with a "flights" key containing an array of these flight objects.
    `,
  },
  {
    id: 'flight-busiest-traveling-period',
    name: 'Flight Busiest Traveling Period',
    description: 'Find the busiest traveling periods for a destination.',
    icon: Briefcase,
    params: [
      { name: 'cityCode', label: 'City Code', type: 'text', required: true, placeholder: 'e.g., NYC', defaultValue: 'NYC' },
      { name: 'period', label: 'Year', type: 'text', required: true, placeholder: 'e.g., 2024', defaultValue: '2024' },
    ],
    mockResponse: { data: [{ period: '2024-08', analytics: { travelers: { score: 95 } } }] },
    uiRequirements: 'Display the busiest month with its traveler score.',
  },
  {
    id: 'flight-cheapest-date-search',
    name: 'Flight Cheapest Date Search',
    description: 'Find the cheapest dates for flights between two cities.',
    icon: Calendar,
    params: [
      { name: 'origin', label: 'Origin IATA Code', type: 'text', required: true, placeholder: 'e.g., LHR', defaultValue: 'LHR' },
      { name: 'destination', label: 'Destination IATA Code', type: 'text', required: true, placeholder: 'e.g., JFK', defaultValue: 'JFK' },
    ],
    mockResponse: { data: [{ departureDate: '2024-11-15', price: { total: '450.00' } }] },
    uiRequirements: 'Display a list of dates with their corresponding cheapest prices.',
  },
  {
    id: 'flight-check-in-links',
    name: 'Flight Check-in Links',
    description: 'Get flight check-in links for a specific airline.',
    icon: UserCheck,
    params: [
        { name: 'airlineCode', label: 'Airline IATA Code', type: 'text', required: true, placeholder: 'e.g., BA', defaultValue: 'BA' },
    ],
    mockResponse: { data: [{ href: 'https://www.britishairways.com/travel/olcilandingpageauth/public/en_gb' }] },
    uiRequirements: 'Display the check-in link for the airline.',
  },
  {
    id: 'flight-choice-prediction',
    name: 'Flight Choice Prediction',
    description: 'Predict flight choices based on a flight offer search.',
    icon: Wand2,
    params: [
        { name: 'flightOffers', label: 'Flight Offers JSON', type: 'text', required: true, placeholder: 'Paste flight offers JSON', defaultValue: '{"data":[]}' },
    ],
    mockResponse: { data: [{ type: 'flight-offer', id: '1', probability: '0.85' }] },
    uiRequirements: 'Display the flight offer with the highest probability.',
  },
  {
    id: 'flight-create-orders',
    name: 'Flight Create Orders',
    description: 'Create a flight order for booking.',
    icon: Plane,
    params: [
        { name: 'flightOfferId', label: 'Flight Offer ID', type: 'text', required: true, placeholder: 'e.g., 12345', defaultValue: '12345' },
    ],
    mockResponse: { data: { id: 'ORDER123', status: 'CONFIRMED' } },
    uiRequirements: 'Display the order confirmation ID and status.',
  },
  {
    id: 'flight-delay-prediction',
    name: 'Flight Delay Prediction',
    description: 'Predict flight delays for a given flight.',
    icon: Clock,
    params: [
      { name: 'carrierCode', label: 'Carrier Code', type: 'text', required: true, placeholder: 'e.g., BA', defaultValue: 'BA' },
      { name: 'flightNumber', label: 'Flight Number', type: 'text', required: true, placeholder: 'e.g., 209', defaultValue: '209' },
      { name: 'date', label: 'Date', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    ],
    mockResponse: { data: [{ probability: '0.75', result: 'DELAYED_30_60_MIN' }] },
    uiRequirements: 'Display the delay probability and the predicted delay time.',
  },
  {
    id: 'flight-inspiration-search',
    name: 'Flight Inspiration Search',
    description: 'Search for flight inspirations from an origin.',
    icon: Search,
    params: [
        { name: 'origin', label: 'Origin IATA Code', type: 'text', required: true, placeholder: 'e.g., LHR', defaultValue: 'LHR' },
    ],
    mockResponse: { data: [{ destination: 'PAR', price: { total: '80.00' } }] },
    uiRequirements: 'Display a list of destination inspirations with their prices.',
  },
  {
    id: 'flight-most-booked-destinations',
    name: 'Flight Most Booked Destinations',
    description: 'Find most booked destinations from an origin.',
    icon: Map,
    params: [
        { name: 'originCityCode', label: 'Origin City Code', type: 'text', required: true, placeholder: 'e.g., LON', defaultValue: 'LON' },
    ],
    mockResponse: { data: [{ destination: 'PAR', analytics: { bookings: { score: 88 } } }] },
    uiRequirements: 'Display a list of the most booked destinations with their booking scores.',
  },
  {
    id: 'flight-most-traveled-destinations',
    name: 'Flight Most Traveled Destinations',
    description: 'Find most traveled destinations from an origin.',
    icon: Map,
    params: [
        { name: 'originCityCode', label: 'Origin City Code', type: 'text', required: true, placeholder: 'e.g., LON', defaultValue: 'LON' },
    ],
    mockResponse: { data: [{ destination: 'NYC', analytics: { travelers: { score: 92 } } }] },
    uiRequirements: 'Display a list of the most traveled destinations with their traveler scores.',
  },
  {
    id: 'flight-offers-price',
    name: 'Flight Offers Price',
    description: 'Get the confirmed price for a flight offer.',
    icon: Plane,
    params: [
        { name: 'flightOfferId', label: 'Flight Offer ID', type: 'text', required: true, placeholder: 'e.g., 12345', defaultValue: '12345' },
    ],
    mockResponse: { data: { price: { grandTotal: '655.50' } } },
    uiRequirements: 'Display the confirmed grand total price of the flight offer.',
  },
  {
    id: 'flight-offers-search',
    name: 'Flight Offers Search',
    description: 'Find the cheapest flights for a given itinerary.',
    icon: Plane,
    params: [
      { name: 'originLocationCode', label: 'Origin IATA Code', type: 'text', required: true, placeholder: 'e.g., LHR', defaultValue: 'LHR' },
      { name: 'destinationLocationCode', label: 'Destination IATA Code', type: 'text', required: true, placeholder: 'e.g., JFK', defaultValue: 'JFK' },
      { name: 'departureDate', label: 'Departure Date', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
      { name: 'adults', label: 'Adults', type: 'number', required: true, placeholder: 'e.g., 1', defaultValue: '1' },
    ],
    mockResponse: {
      data: Array.from({ length: 5 }).map((_, i) => ({
        type: 'flight-offer',
        id: `${i + 1}`,
        source: 'GDS',
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: '2024-12-24',
        numberOfBookableSeats: 9,
        itineraries: [
          {
            duration: `PT${8 + i}H${30 + i * 5}M`,
            segments: [
              {
                departure: { iataCode: 'LHR', terminal: '5', at: `2024-12-25T10:00:00` },
                arrival: { iataCode: 'JFK', terminal: '8', at: `2024-12-25T18:30:00` },
                carrierCode: ['BA', 'AA', 'IB', 'AY', 'QR'][i],
                number: `150${i}`,
                aircraft: { code: '77W' },
                operating: { carrierCode: ['BA', 'AA', 'IB', 'AY', 'QR'][i] },
                duration: `PT${8 + i}H${30 + i * 5}M`,
                id: `1-${i}`,
                numberOfStops: 0,
                blacklistedInEU: false,
              },
            ],
          },
        ],
        price: {
          currency: 'USD',
          total: `${650.50 + i * 20}`,
          base: `${500.00 + i * 15}`,
          fees: [{ amount: '50.50', type: 'TICKETING' }],
          grandTotal: `${650.50 + i * 20}`,
        },
        pricingOptions: {
          fareType: ['PUBLISHED'],
          includedCheckedBags: { quantity: 1 },
        },
        validatingAirlineCodes: [['BA', 'AA', 'IB', 'AY', 'QR'][i]],
        travelerPricings: [
          {
            travelerId: '1',
            fareOption: 'STANDARD',
            travelerType: 'ADULT',
            price: { currency: 'USD', total: `${650.50 + i * 20}`, base: `${500.00 + i * 15}` },
            fareDetailsBySegment: [
              { segmentId: `1-${i}`, cabin: 'ECONOMY', fareBasis: 'YNUK12', class: 'Y', includedCheckedBags: { quantity: 1 } },
            ],
          },
        ],
      })),
    },
    uiRequirements: `
      Map the flight offer data to a list of flights. Each flight should contain:
      - id: The flight offer ID.
      - airline: The validating airline code.
      - departure: An object with iataCode and time.
      - arrival: An object with iataCode and time.
      - duration: The total itinerary duration.
      - price: The grand total price as a number.
      - currency: The currency code.
      Return the data as a JSON object with a "flights" key containing an array of these flight objects.
    `,
  },
  {
    id: 'flight-order-management',
    name: 'Flight Order Management',
    description: 'Manage a specific flight order.',
    icon: BookOpen,
    params: [
        { name: 'orderId', label: 'Order ID', type: 'text', required: true, placeholder: 'e.g., ORDER123', defaultValue: 'ORDER123' },
    ],
    mockResponse: { data: { id: 'ORDER123', status: 'CONFIRMED' } },
    uiRequirements: 'Display the flight order details, including status and passenger information.',
  },
  {
    id: 'flight-price-analysis',
    name: 'Flight Price Analysis',
    description: 'Analyze flight prices for a given route.',
    icon: Percent,
    params: [
      { name: 'origin', label: 'Origin IATA Code', type: 'text', required: true, placeholder: 'e.g., LHR', defaultValue: 'LHR' },
      { name: 'destination', label: 'Destination IATA Code', type: 'text', required: true, placeholder: 'e.g., JFK', defaultValue: 'JFK' },
    ],
    mockResponse: { data: [{ flightProduct: 'ECONOMY', min: '450.00', max: '1200.00' }] },
    uiRequirements: 'Display the price range (min/max) for different fare products.',
  },
  {
    id: 'hotel-booking',
    name: 'Hotel Booking',
    description: 'Book a hotel based on an offer.',
    icon: Hotel,
    params: [
        { name: 'offerId', label: 'Hotel Offer ID', type: 'text', required: true, placeholder: 'e.g., OFFER123', defaultValue: 'OFFER123' },
    ],
    mockResponse: { data: { id: 'BOOKING123', providerConfirmationId: 'XYZ987' } },
    uiRequirements: 'Display the booking confirmation ID.',
  },
  {
    id: 'hotel-list',
    name: 'Hotel List',
    description: 'Get a list of hotels in a city.',
    icon: Hotel,
    params: [
        { name: 'cityCode', label: 'City Code', type: 'text', required: true, placeholder: 'e.g., PAR', defaultValue: 'PAR' },
    ],
    mockResponse: { data: [{ hotelId: 'BCPAR1T1', name: 'Le Grand Hotel' }, { hotelId: 'BCPAR2T2', name: 'Chic Boutique Hotel' }] },
    uiRequirements: 'Display a simple list of hotel names and their IDs.',
  },
  {
    id: 'hotel-name-autocomplete',
    name: 'Hotel Name Autocomplete',
    description: 'Autocomplete hotel names based on a keyword.',
    icon: Search,
    params: [
        { name: 'keyword', label: 'Keyword', type: 'text', required: true, placeholder: 'e.g., Grand', defaultValue: 'Grand' },
    ],
    mockResponse: { data: [{ name: 'Le Grand Hotel', hotelId: 'BCPAR1T1' }] },
    uiRequirements: 'Display a list of suggested hotel names.',
  },
  {
    id: 'hotel-ratings',
    name: 'Hotel Ratings',
    description: 'Get hotel ratings based on hotel IDs.',
    icon: Star,
    params: [
        { name: 'hotelIds', label: 'Hotel IDs (comma-separated)', type: 'text', required: true, placeholder: 'e.g., BCPAR1T1', defaultValue: 'BCPAR1T1' },
    ],
    mockResponse: { data: [{ hotelId: 'BCPAR1T1', overallRating: 95 }] },
    uiRequirements: 'Display the overall rating for each hotel.',
  },
  {
    id: 'hotel-search',
    name: 'Hotel Search',
    description: 'Search for hotels in a specific city.',
    icon: Hotel,
    params: [
      { name: 'cityCode', label: 'City Code', type: 'text', required: true, placeholder: 'e.g., PAR', defaultValue: 'PAR' },
      { name: 'checkInDate', label: 'Check-in Date', type: 'date', required: true, defaultValue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
      { name: 'checkOutDate', label: 'Check-out Date', type: 'date', required: true, defaultValue: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    ],
    mockResponse: {
      data: Array.from({ length: 3 }).map((_, i) => ({
        type: 'hotel-offers',
        hotel: {
          type: 'hotel',
          hotelId: `BCPAR${i}T${i}`,
          chainCode: 'BC',
          dupeId: `7000${i}5`,
          name: ['Le Grand Hotel', 'Chic Boutique Hotel', 'Eiffel View Inn'][i],
          rating: `${5 - i}`,
          cityCode: 'PAR',
          latitude: 48.8566 + i * 0.01,
          longitude: 2.3522 + i * 0.01,
          hotelDistance: { distance: 1.2 + i, distanceUnit: 'KM' },
          address: {
            lines: [`${i + 1} Rue de la Paix`],
            postalCode: `7500${i + 1}`,
            cityName: 'Paris',
            countryCode: 'FR',
          },
          amenities: ['SWIMMING_POOL', 'SPA', 'FITNESS_CENTER', 'RESTAURANT', 'WIFI'].slice(i, i + 3),
        },
        offers: [
          {
            id: `OFFER${i}ABC`,
            checkInDate: '2024-12-20',
            checkOutDate: '2024-12-22',
            rateCode: 'BAR',
            price: {
              currency: 'EUR',
              total: `${250 + i * 50}`,
            },
          },
        ],
      })),
    },
    uiRequirements: `
      Map the hotel data to a list of hotels. Each hotel should contain:
      - id: The hotelId.
      - name: The hotel name.
      - rating: The hotel rating as a number.
      - price: The total price from the first offer as a number.
      - currency: The currency code.
      - amenities: A list of amenities.
      - imageId: 'hotel-1', 'hotel-2', or 'hotel-3' based on index.
      Return the data as a JSON object with a "hotels" key containing an array of these hotel objects.
    `,
  },
  {
    id: 'location-score',
    name: 'Location Score',
    description: 'Get a location score for sightseeing, shopping, etc.',
    icon: MapPin,
    params: [
      { name: 'latitude', label: 'Latitude', type: 'text', required: true, placeholder: 'e.g., 48.8582', defaultValue: '48.8582' },
      { name: 'longitude', label: 'Longitude', type: 'text', required: true, placeholder: 'e.g., 2.2945', defaultValue: '2.2945' },
    ],
    mockResponse: { data: { scores: { sight: 98, shopping: 85 } } },
    uiRequirements: 'Display the scores for different categories like sight and shopping.',
  },
  {
    id: 'on-demand-flight-status',
    name: 'On Demand Flight Status',
    description: 'Get on-demand flight status.',
    icon: Plane,
    params: [
      { name: 'carrierCode', label: 'Carrier Code', type: 'text', required: true, placeholder: 'e.g., BA', defaultValue: 'BA' },
      { name: 'flightNumber', label: 'Flight Number', type: 'text', required: true, placeholder: 'e.g., 209', defaultValue: '209' },
      { name: 'date', label: 'Date', type: 'date', required: true, defaultValue: new Date().toISOString().split('T')[0] },
    ],
    mockResponse: { data: { status: 'LANDED', departure: { iataCode: 'LHR' }, arrival: { iataCode: 'JFK' } } },
    uiRequirements: 'Display the flight status, departure, and arrival airports.',
  },
  {
    id: 'points-of-interest',
    name: 'Points of Interest',
    description: 'Find points of interest near a location.',
    icon: MapPin,
    params: [
      { name: 'latitude', label: 'Latitude', type: 'text', required: true, placeholder: 'e.g., 48.8582', defaultValue: '48.8582' },
      { name: 'longitude', label: 'Longitude', type: 'text', required: true, placeholder: 'e.g., 2.2945', defaultValue: '2.2945' },
      { name: 'radius', label: 'Radius (km)', type: 'number', required: false, placeholder: 'e.g., 2', defaultValue: '2' },
    ],
    mockResponse: {
      data: Array.from({ length: 3 }).map((_, i) => ({
        type: 'location',
        subType: 'POINT_OF_INTEREST',
        name: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral'][i],
        geoCode: {
          latitude: 48.8582 - i * 0.01,
          longitude: 2.2945 + i * 0.05,
        },
        category: ['SIGHTS', 'MUSEUM', 'RELIGIOUS_SITE'][i],
        tags: ['landmark', 'art', 'history', 'architecture'].slice(i, i + 2)
      })),
    },
    uiRequirements: `
      Map the points of interest data to a list of POIs. Each POI should contain:
      - id: A generated unique ID from the index.
      - name: The POI name.
      - category: The POI category.
      - tags: A list of tags.
      - imageId: 'poi-1', 'poi-2', or 'poi-3' based on index.
      Return the data as a JSON object with a "pois" key containing an array of these POI objects.
    `,
  },
  {
    id: 'seatmap-display',
    name: 'SeatMap Display',
    description: 'Display a seat map for a flight.',
    icon: Map,
    params: [
        { name: 'flightOfferId', label: 'Flight Offer ID', type: 'text', required: true, placeholder: 'e.g., 12345', defaultValue: '12345' },
    ],
    mockResponse: { data: [{ number: '1A', travelerPricing: [{ price: { total: '50.00' } }] }] },
    uiRequirements: 'Display available seats with their numbers and extra charges.',
  },
  {
    id: 'tours-and-activities',
    name: 'Tours and Activities',
    description: 'Find tours and activities near a location.',
    icon: Activity,
    params: [
      { name: 'latitude', label: 'Latitude', type: 'text', required: true, placeholder: 'e.g., 48.8582', defaultValue: '48.8582' },
      { name: 'longitude', label: 'Longitude', type: 'text', required: true, placeholder: 'e.g., 2.2945', defaultValue: '2.2945' },
    ],
    mockResponse: { data: [{ name: 'Eiffel Tower Tour', price: { amount: '75.00' } }] },
    uiRequirements: 'Display a list of tours with their names and prices.',
  },
  {
    id: 'transfer-booking',
    name: 'Transfer Booking',
    description: 'Book a transfer.',
    icon: Car,
    params: [
        { name: 'offerId', label: 'Transfer Offer ID', type: 'text', required: true, placeholder: 'e.g., TRANSFER123', defaultValue: 'TRANSFER123' },
    ],
    mockResponse: { data: { confirmationId: 'CONFIRM456' } },
    uiRequirements: 'Display the transfer booking confirmation ID.',
  },
  {
    id: 'transfer-management',
    name: 'Transfer Management',
    description: 'Manage a transfer booking.',
    icon: BookOpen,
    params: [
        { name: 'confirmationId', label: 'Confirmation ID', type: 'text', required: true, placeholder: 'e.g., CONFIRM456', defaultValue: 'CONFIRM456' },
    ],
    mockResponse: { data: { status: 'CONFIRMED' } },
    uiRequirements: 'Display the status of the transfer booking.',
  },
  {
    id: 'transfer-search',
    name: 'Transfer Search',
    description: 'Search for transfers (e.g., airport to hotel).',
    icon: Car,
    params: [
        { name: 'startLocation', label: 'Start Location', type: 'text', required: true, placeholder: 'e.g., Airport LHR', defaultValue: 'LHR' },
        { name: 'endLocation', label: 'End Location', type: 'text', required: true, placeholder: 'e.g., Downtown London', defaultValue: 'LON' },
    ],
    mockResponse: { data: [{ vehicle: 'SEDAN', price: { total: '55.00' } }] },
    uiRequirements: 'Display available transfer options with vehicle type and price.',
  },
  {
    id: 'travel-recommendations',
    name: 'Travel Recommendations',
    description: 'Get travel recommendations based on interests.',
    icon: Users,
    params: [
        { name: 'cityCodes', label: 'City Codes (comma-separated)', type: 'text', required: true, placeholder: 'e.g., PAR,NYC', defaultValue: 'PAR' },
    ],
    mockResponse: { data: [{ name: 'Paris', type: 'location' }] },
    uiRequirements: 'Display a list of recommended locations.',
  },
  {
    id: 'travel-restrictions',
    name: 'Travel Restrictions',
    description: 'Check travel restrictions for a route.',
    icon: Ban,
    params: [
        { name: 'originCountryCode', label: 'Origin Country Code', type: 'text', required: true, placeholder: 'e.g., US', defaultValue: 'US' },
        { name: 'destinationCountryCode', label: 'Destination Country Code', type: 'text', required: true, placeholder: 'e.g., FR', defaultValue: 'FR' },
    ],
    mockResponse: { data: [{ summary: 'Entry permitted for vaccinated travelers.' }] },
    uiRequirements: 'Display the travel restriction summary.',
  },
  {
    id: 'trip-parser',
    name: 'Trip Parser',
    description: 'Parse a trip confirmation email.',
    icon: Route,
    params: [
        { name: 'document', label: 'Confirmation Email Text', type: 'text', required: true, placeholder: 'Paste email content here', defaultValue: 'Your flight to JFK is confirmed.' },
    ],
    mockResponse: { data: { flights: [{ flightNumber: 'BA123' }] } },
    uiRequirements: 'Display the parsed trip segments, like flight numbers.',
  },
  {
    id: 'trip-purpose-prediction',
    name: 'Trip Purpose Prediction',
    description: 'Predict the purpose of a trip (business/leisure).',
    icon: Wand2,
    params: [
      { name: 'origin', label: 'Origin IATA Code', type: 'text', required: true, placeholder: 'e.g., LHR', defaultValue: 'LHR' },
      { name: 'destination', label: 'Destination IATA Code', type: 'text', required: true, placeholder: 'e.g., SFO', defaultValue: 'SFO' },
      { name: 'departureDate', label: 'Departure Date', type: 'date', required: true, defaultValue: '2024-11-25' },
    ],
    mockResponse: { data: { prediction: 'BUSINESS' } },
    uiRequirements: 'Display the predicted trip purpose.',
  },
];
