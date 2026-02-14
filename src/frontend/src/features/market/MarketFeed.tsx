import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMarketFeedStore } from './marketFeedStore';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function MarketFeed() {
  const { events } = useMarketFeedStore();

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'release':
        return <TrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'price-change':
        return <TrendingDown className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {events.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No market activity yet</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="flex gap-3 p-3 rounded-lg border bg-card">
                  <div className="mt-1">{getEventIcon(event.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-sm">{event.title}</p>
                      <Badge variant="outline" className="text-xs">
                        Day {event.day}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    {event.impact && (
                      <p className="text-xs text-muted-foreground mt-1">Impact: {event.impact}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
