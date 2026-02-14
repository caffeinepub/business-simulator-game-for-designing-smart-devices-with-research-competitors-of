import { TrendingUp } from 'lucide-react';
import CompetitorList from '@/features/competitors/CompetitorList';
import MarketFeed from '@/features/market/MarketFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CompetitorsMarketPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Market & Competitors</h1>
          <p className="text-muted-foreground">Monitor the competition and market trends</p>
        </div>
      </div>

      <Tabs defaultValue="competitors" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
          <TabsTrigger value="market">Market Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="competitors" className="mt-6">
          <CompetitorList />
        </TabsContent>
        <TabsContent value="market" className="mt-6">
          <MarketFeed />
        </TabsContent>
      </Tabs>
    </div>
  );
}
