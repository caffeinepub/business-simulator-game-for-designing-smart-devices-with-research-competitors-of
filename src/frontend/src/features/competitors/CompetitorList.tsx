import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCompetitorStore } from './competitorModel';

export default function CompetitorList() {
  const { competitors } = useCompetitorStore();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {competitors.map((competitor) => (
        <Card key={competitor.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{competitor.name}</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {competitor.strategy}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cash:</span>
                <span className="font-medium">${competitor.cash.toString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Share:</span>
                <span className="font-medium">{competitor.marketShare}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Products:</span>
                <span className="font-medium">{competitor.activeProducts}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Strength</span>
                <span>{competitor.strength}%</span>
              </div>
              <Progress value={competitor.strength} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
