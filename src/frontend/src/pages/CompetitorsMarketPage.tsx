import { TrendingUp } from 'lucide-react';
import CompetitorList from '@/features/competitors/CompetitorList';
import MarketFeed from '@/features/market/MarketFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/layout/PageHeader';

export default function CompetitorsMarketPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={TrendingUp}
        title="Market & Competitors"
        subtitle="Monitor the competition and market trends"
      />

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
