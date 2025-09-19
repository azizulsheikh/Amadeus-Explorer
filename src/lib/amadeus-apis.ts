import { Plane, Hotel, MapPin, Search, Route, Percent, Calendar, Briefcase, Star, Map, UserCheck, Shield, BookOpen, Clock, Activity, Car, Users, Ban, Wand2 } from 'lucide-react';
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
  name: string;
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
    description: 'Find airline codes.',
    icon: Search,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'airline-routes',
    name: 'Airline Routes',
    description: 'Find airline routes.',
    icon: Route,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'airport-city-search',
    name: 'Airport & City Search',
    description: 'Find airports and cities.',
    icon: Search,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'airport-nearest-relevant',
    name: 'Airport Nearest Relevant',
    description: 'Find the nearest relevant airport.',
    icon: MapPin,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'airport-on-time-performance',
    name: 'Airport On-Time Performance',
    description: 'Check airport on-time performance.',
    icon: Percent,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'airport-routes',
    name: 'Airport Routes',
    description: 'Find airport routes.',
    icon: Route,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'branded-fares-upsell',
    name: 'Branded Fares Upsell',
    description: 'Upsell branded fares.',
    icon: Star,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'city-search',
    name: 'City Search',
    description: 'Search for cities.',
    icon: Search,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-availabilities-search',
    name: 'Flight Availabilities Search',
    description: 'Search for flight availabilities.',
    icon: Calendar,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-busiest-traveling-period',
    name: 'Flight Busiest Traveling Period',
    description: 'Find the busiest traveling periods.',
    icon: Briefcase,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-cheapest-date-search',
    name: 'Flight Cheapest Date Search',
    description: 'Find the cheapest dates for flights.',
    icon: Calendar,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-check-in-links',
    name: 'Flight Check-in Links',
    description: 'Get flight check-in links.',
    icon: UserCheck,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-choice-prediction',
    name: 'Flight Choice Prediction',
    description: 'Predict flight choices.',
    icon: Wand2,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-create-orders',
    name: 'Flight Create Orders',
    description: 'Create flight orders.',
    icon: Plane,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-delay-prediction',
    name: 'Flight Delay Prediction',
    description: 'Predict flight delays.',
    icon: Clock,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-inspiration-search',
    name: 'Flight Inspiration Search',
    description: 'Search for flight inspirations.',
    icon: Search,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-most-booked-destinations',
    name: 'Flight Most Booked Destinations',
    description: 'Find most booked destinations.',
    icon: Map,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-most-traveled-destinations',
    name: 'Flight Most Traveled Destinations',
    description: 'Find most traveled destinations.',
    icon: Map,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-offers-price',
    name: 'Flight Offers Price',
    description: 'Get flight offer prices.',
    icon: Plane,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
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
    description: 'Manage flight orders.',
    icon: BookOpen,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'flight-price-analysis',
    name: 'Flight Price Analysis',
    description: 'Analyze flight prices.',
    icon: Percent,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'hotel-booking',
    name: 'Hotel Booking',
    description: 'Book a hotel.',
    icon: Hotel,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'hotel-list',
    name: 'Hotel List',
    description: 'Get a list of hotels.',
    icon: Hotel,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'hotel-name-autocomplete',
    name: 'Hotel Name Autocomplete',
    description: 'Autocomplete hotel names.',
    icon: Search,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'hotel-ratings',
    name: 'Hotel Ratings',
    description: 'Get hotel ratings.',
    icon: Star,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
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
    description: 'Get a location score.',
    icon: MapPin,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'on-demand-flight-status',
    name: 'On Demand Flight Status',
    description: 'Get on-demand flight status.',
    icon: Plane,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
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
    description: 'Display a seat map.',
    icon: Map,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'tours-and-activities',
    name: 'Tours and Activities',
    description: 'Find tours and activities.',
    icon: Activity,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'transfer-booking',
    name: 'Transfer Booking',
    description: 'Book a transfer.',
    icon: Car,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'transfer-management',
    name: 'Transfer Management',
    description: 'Manage transfers.',
    icon: BookOpen,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'transfer-search',
    name: 'Transfer Search',
    description: 'Search for transfers.',
    icon: Car,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'travel-recommendations',
    name: 'Travel Recommendations',
    description: 'Get travel recommendations.',
    icon: Users,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'travel-restrictions',
    name: 'Travel Restrictions',
    description: 'Check travel restrictions.',
    icon: Ban,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'trip-parser',
    name: 'Trip Parser',
    description: 'Parse a trip.',
    icon: Route,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
  {
    id: 'trip-purpose-prediction',
    name: 'Trip Purpose Prediction',
    description: 'Predict the purpose of a trip.',
    icon: Wand2,
    params: [],
    mockResponse: {},
    uiRequirements: 'Display the results.',
  },
];
