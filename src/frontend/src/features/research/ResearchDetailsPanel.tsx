import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { useGameState } from '@/state/gameState';
import { toast } from 'sonner';

interface ResearchDetailsPanelProps {
  technology: any;
  onClose: () => void;
}

export default function ResearchDetailsPanel({ technology, onClose }: ResearchDetailsPanelProps) {
  const { gameState, addResearchedTech, updateCash } = useGameState();

  const isCompleted = technology.isCompleted;
  const hasPrerequisites = technology.requirements?.researchedTechnologies?.length > 0;
  const canAfford = gameState && gameState.cash >= technology.cost;
  const canResearch = !isCompleted && canAfford && !hasPrerequisites;

  const handleStartResearch = () => {
    if (!canResearch) return;

    if (gameState) {
      updateCash(gameState.cash - BigInt(technology.cost));
      addResearchedTech(technology.researchId);
      toast.success(`Research started: ${technology.researchName}`);
      onClose();
    }
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{technology.researchName}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Badge variant="secondary" className="w-fit">
          {technology.category}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{technology.description}</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cost:</span>
            <span className="font-medium">${technology.cost.toString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Research Time:</span>
            <span className="font-medium">{technology.researchTime.toString()} days</span>
          </div>
        </div>

        {technology.effectedTestProps && technology.effectedTestProps.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-semibold mb-2">Effects</h4>
              <div className="space-y-1">
                {technology.effectedTestProps.map((effect: string, index: number) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    • {effect}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {hasPrerequisites && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Prerequisites
              </h4>
              <div className="space-y-1">
                {technology.requirements.researchedTechnologies.map((prereq: string, index: number) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    • {prereq}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {isCompleted ? (
          <div className="flex items-center justify-center gap-2 py-2 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Completed</span>
          </div>
        ) : (
          <Button onClick={handleStartResearch} disabled={!canResearch} className="w-full">
            {hasPrerequisites ? 'Locked' : !canAfford ? 'Insufficient Funds' : 'Start Research'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
