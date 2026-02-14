import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useStoreNetworkStore } from './storeNetworkStore';
import { Store, TrendingUp, Zap } from 'lucide-react';

export default function StoreNetworkSummaryPanel() {
  const { storeNetwork } = useStoreNetworkStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Store className="h-5 w-5" />
          Store Network
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Stores</span>
          <Badge variant="secondary">{storeNetwork.stores.length}</Badge>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Productivity Bonus</span>
            </div>
            <span className="text-sm font-bold text-primary">
              {storeNetwork.productivityBonus.toString()}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Attraction Bonus</span>
            </div>
            <span className="text-sm font-bold text-primary">
              {storeNetwork.productAttractionBonus.toString()}%
            </span>
          </div>
        </div>

        {storeNetwork.stores.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <span className="text-sm font-medium">Store Locations</span>
              <div className="flex flex-wrap gap-2">
                {storeNetwork.stores.map((store, index) => (
                  <Badge key={index} variant="outline">
                    {store.country}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
