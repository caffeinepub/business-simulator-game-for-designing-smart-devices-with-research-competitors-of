import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useInvestmentStore } from './investmentStore';
import { Building2, Megaphone, Users, Store } from 'lucide-react';

export default function InvestmentsLog() {
  const { investments } = useInvestmentStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'acquisition':
        return <Building2 className="h-4 w-4" />;
      case 'marketing':
        return <Megaphone className="h-4 w-4" />;
      case 'recruitment':
        return <Users className="h-4 w-4" />;
      case 'store':
        return <Store className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {investments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No investments yet</p>
            ) : (
              investments.map((investment) => (
                <div key={investment.id} className="flex gap-3 p-3 rounded-lg border bg-card">
                  <div className="mt-1">{getIcon(investment.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-sm capitalize">{investment.type}</p>
                      <Badge variant="outline" className="text-xs">
                        ${investment.amount.toString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{investment.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(investment.timestamp).toLocaleDateString()}
                    </p>
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
