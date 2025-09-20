import { Building, Plane } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export type MappedLocation = {
  id: string;
  name: string;
  subType: 'AIRPORT' | 'CITY';
  iataCode: string;
};

interface LocationCardProps {
  location: MappedLocation;
}

export default function LocationCard({ location }: LocationCardProps) {
  const Icon = location.subType === 'AIRPORT' ? Plane : Building;
  
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-muted rounded-full">
            <Icon className="text-primary size-6" />
          </div>
          <div>
            <p className="font-semibold text-lg">{location.name}</p>
            <p className="text-sm text-muted-foreground">{location.subType.charAt(0) + location.subType.slice(1).toLowerCase()}</p>
          </div>
        </div>
        
        <Badge variant="outline" className="text-base font-mono">
          {location.iataCode}
        </Badge>
      </CardContent>
    </Card>
  );
}
