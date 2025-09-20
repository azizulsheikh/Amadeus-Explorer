
import { ArrowRight, Clock, Plane, Briefcase as Luggage, Armchair, GitFork } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';

export type MappedFlight = {
  id: string;
  airline: string;
  departure: { iataCode: string; time: string };
  arrival: { iataCode: string; time: string };
  duration: string;
  price: number;
  currency: string;
  stops: number;
  cabin: string;
  baggage: number;
  aircraft: string;
};

interface FlightCardProps {
  flight: MappedFlight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const formatTime = (dateTime: string) => {
    if (dateTime.includes('T') && dateTime.includes('-')) {
        const date = new Date(dateTime);
        if (!isNaN(date.getTime())) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
    return dateTime;
  };

  const formatDuration = (duration: string) => {
    return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm');
  };

  return (
    <Card>
      <Accordion type="single" collapsible>
        <AccordionItem value={flight.id} className="border-b-0">
          <CardContent className="p-0">
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <div className="flex items-center gap-3 col-span-1">
                <div className="p-2 bg-muted rounded-full">
                  <Plane className="text-primary size-6" />
                </div>
                <div>
                  <p className="font-semibold">{flight.airline}</p>
                  <p className="text-xs text-muted-foreground">{flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}</p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex items-center justify-center gap-4 text-sm">
                <div className="text-center">
                  <p className="font-bold text-lg">{flight.departure.iataCode}</p>
                  <p className="text-muted-foreground">{formatTime(flight.departure.time)}</p>
                </div>
                <div className="flex flex-col items-center text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="size-3" />
                    <span className="text-xs">{formatDuration(flight.duration)}</span>
                  </div>
                  <ArrowRight className="size-8" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{flight.arrival.iataCode}</p>
                  <p className="text-muted-foreground">{formatTime(flight.arrival.time)}</p>
                </div>
              </div>
              
              <div className="col-span-1 text-center md:text-right">
                <p className="text-2xl font-bold font-headline text-primary">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: flight.currency }).format(flight.price)}
                </p>
                <p className="text-xs text-muted-foreground">Total price</p>
              </div>
            </div>
            <AccordionTrigger className="text-xs text-muted-foreground hover:no-underline justify-center py-2 bg-muted/50 hover:bg-muted">
              Show Details
            </AccordionTrigger>
          </CardContent>
          
          <AccordionContent>
            <div className="p-4 border-t bg-muted/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Armchair className="size-4 text-primary" />
                  <div>
                    <p className="font-semibold">Cabin</p>
                    <Badge variant="outline">{flight.cabin}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Luggage className="size-4 text-primary" />
                  <div>
                    <p className="font-semibold">Baggage</p>
                    <Badge variant="outline">{flight.baggage} included</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GitFork className="size-4 text-primary" />
                  <div>
                    <p className="font-semibold">Stops</p>
                    <Badge variant="outline">{flight.stops}</Badge>
                  </div>
                </div>
                 <div className="flex items-center gap-2">
                  <Plane className="size-4 text-primary" />
                  <div>
                    <p className="font-semibold">Aircraft</p>
                    <Badge variant="outline">{flight.aircraft}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
