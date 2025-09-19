'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Eye, ServerCrash } from 'lucide-react';
import FlightCard, { type MappedFlight } from './flight-card';
import HotelCard, { type MappedHotel } from './hotel-card';
import PoiCard, { type MappedPoi } from './poi-card';

interface UiPreviewProps {
  data: string | undefined;
  apiId: string;
  isLoading: boolean;
}

export default function UiPreview({ data, apiId, isLoading }: UiPreviewProps) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      );
    }

    if (!data) {
      return (
        <div className="text-center text-muted-foreground py-12">
          <Eye className="mx-auto size-12" />
          <p className="mt-4">A preview of the UI generated from the API data will appear here.</p>
        </div>
      );
    }

    try {
      const parsedData = JSON.parse(data);

      switch (apiId) {
        case 'flight-offers-search':
          return (
            <div className="space-y-4">
              {parsedData.flights?.map((flight: MappedFlight) => <FlightCard key={flight.id} flight={flight} />)}
            </div>
          );
        case 'hotel-search':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parsedData.hotels?.map((hotel: MappedHotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
          );
        case 'points-of-interest':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parsedData.pois?.map((poi: MappedPoi) => <PoiCard key={poi.id} poi={poi} />)}
            </div>
          );
        default:
          return <p>No UI preview available for this API type.</p>;
      }
    } catch (error) {
      return (
        <div className="text-center text-destructive py-12">
          <ServerCrash className="mx-auto size-12" />
          <p className="mt-4">Failed to parse UI data from the AI model.</p>
          <pre className="mt-2 text-xs bg-destructive/10 p-2 rounded-md text-left">{data}</pre>
        </div>
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>UI Preview</CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
