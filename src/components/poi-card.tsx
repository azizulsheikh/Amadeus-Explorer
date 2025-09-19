import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export type MappedPoi = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  imageId: string;
};

interface PoiCardProps {
  poi: MappedPoi;
}

export default function PoiCard({ poi }: PoiCardProps) {
  const imageUrl = `https://picsum.photos/seed/${poi.imageId.replace('poi-', 'poi')}/600/400`;

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative aspect-video">
        <Image src={imageUrl} alt={poi.name} fill className="object-cover" data-ai-hint="landmark building" />
      </div>
      <CardHeader>
        <CardTitle className="truncate">{poi.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge variant="outline">{poi.category.replace(/_/g, ' ')}</Badge>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-1">
          {poi.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
