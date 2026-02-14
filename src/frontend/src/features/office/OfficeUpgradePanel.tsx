import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useOfficeStore } from './officeStore';
import { useGameState } from '@/state/gameState';
import { toast } from 'sonner';
import { ArrowUp } from 'lucide-react';

export default function OfficeUpgradePanel() {
  const { level, upgradeCost, upgrade } = useOfficeStore();
  const { gameState, updateCash } = useGameState();

  const canAfford = gameState && gameState.cash >= upgradeCost;
  const isMaxLevel = level >= 20;

  const handleUpgrade = () => {
    if (!canAfford || isMaxLevel) return;

    if (gameState) {
      updateCash(gameState.cash - upgradeCost);
      upgrade();
      toast.success(`Office upgraded to level ${level + 1}!`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Office Level</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-5xl font-bold text-primary mb-2">{level}</div>
          <Badge variant="secondary">Level {level} of 20</Badge>
        </div>

        <Progress value={(level / 20) * 100} className="h-2" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Productivity Bonus:</span>
            <span className="font-medium">+{level * 5}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Employee Capacity:</span>
            <span className="font-medium">{level * 10}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Research Speed:</span>
            <span className="font-medium">+{level * 2}%</span>
          </div>
        </div>

        {!isMaxLevel && (
          <>
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Upgrade Cost:</span>
                <span className="font-bold">${upgradeCost.toString()}</span>
              </div>
              <Button onClick={handleUpgrade} disabled={!canAfford} className="w-full">
                <ArrowUp className="h-4 w-4 mr-2" />
                {canAfford ? 'Upgrade Office' : 'Insufficient Funds'}
              </Button>
            </div>
          </>
        )}

        {isMaxLevel && (
          <div className="text-center py-4 text-emerald-600 font-medium">Maximum Level Reached!</div>
        )}
      </CardContent>
    </Card>
  );
}
