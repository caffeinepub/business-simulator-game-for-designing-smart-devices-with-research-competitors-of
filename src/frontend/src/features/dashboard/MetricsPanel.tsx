import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGameState } from '@/state/gameState';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricsPanel() {
  const { gameState } = useGameState();

  const metrics = [
    { label: 'Revenue (Monthly)', value: '$45,231', change: '+12.5%', trend: 'up' },
    { label: 'Market Share', value: '12.5%', change: '+2.3%', trend: 'up' },
    { label: 'R&D Progress', value: '67%', change: '+5%', trend: 'up' },
    { label: 'Customer Satisfaction', value: '4.2/5', change: '-0.1', trend: 'down' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{metric.value}</span>
              <span
                className={`flex items-center text-xs font-medium ${
                  metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {metric.change}
              </span>
            </div>
            {metric.label === 'R&D Progress' && <Progress value={67} className="mt-2" />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
