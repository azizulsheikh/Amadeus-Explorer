import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export type MappedHotel = {
  id: string;
  name: string;
  rating: number;
  price: number;
  currency: string;
  amenities: string[];
  imageId: string;
};

interface HotelCardProps {
  hotel: MappedHotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const imageUrl = `https://picsum.photos/seed/${hotel.imageId.replace('hotel-', 'hotel')}/600/400`;

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative aspect-video">
        <Image src={imageUrl} alt={hotel.name} fill className="object-cover" data-ai-hint="hotel exterior" />
      </div>
      <CardHeader>
        <CardTitle className="truncate">{hotel.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-4 ${i < hotel.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted stroke-muted-foreground'}`} />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({hotel.rating} stars)</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity.replace(/_/g, ' ').toLowerCase()}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-lg font-bold font-headline text-primary">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: hotel.currency }).format(hotel.price)}
          <span className="text-sm font-normal text-muted-foreground">/night</span>
        </div>
      </CardFooter>
    </Card>
  );
}
