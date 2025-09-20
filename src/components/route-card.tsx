import { ArrowRight, Plane } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export type MappedRoute = {
  id: string;
  departure: string;
  arrival: string;
};

interface RouteCardProps {
  route: MappedRoute;
}

export default function RouteCard({ route }: RouteCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-full">
            <Plane className="text-primary size-6" />
          </div>
          <div>
            <p className="font-semibold">Airline Route</p>
            <p className="text-xs text-muted-foreground">Direct Flight</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-lg font-bold font-headline">
          <span>{route.departure}</span>
          <ArrowRight className="size-5 text-muted-foreground" />
          <span>{route.arrival}</span>
        </div>
      </CardContent>
    </Card>
  );
}
