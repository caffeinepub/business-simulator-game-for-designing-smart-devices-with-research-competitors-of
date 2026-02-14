import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useGameState } from '@/state/gameState';
import { toast } from 'sonner';
import { difficultyPresets } from './difficultyPresets';

interface NewGameModalProps {
  onClose: () => void;
}

export default function NewGameModal({ onClose }: NewGameModalProps) {
  const [difficulty, setDifficulty] = useState<'normal' | 'challenging'>('normal');
  const { setGameState } = useGameState();

  const handleStartGame = () => {
    const preset = difficultyPresets[difficulty];
    setGameState({
      cash: preset.startingCash,
      researchedTechs: [],
      products: [],
      difficulty,
    });
    toast.success(`New game started on ${difficulty} difficulty!`);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Start New Game</DialogTitle>
          <DialogDescription>Choose your difficulty level to begin your journey</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <RadioGroup value={difficulty} onValueChange={(v) => setDifficulty(v as 'normal' | 'challenging')}>
            <div className="space-y-4">
              {Object.entries(difficultyPresets).map(([key, preset]) => (
                <div key={key} className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent/50">
                  <RadioGroupItem value={key} id={key} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={key} className="text-base font-semibold cursor-pointer">
                      {preset.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{preset.description}</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Starting Cash:</span>
                        <span className="font-medium">${preset.startingCash.toString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Competitor Strength:</span>
                        <span className="font-medium">{preset.competitorStrength}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">R&D Cost Multiplier:</span>
                        <span className="font-medium">{preset.rdCostMultiplier}x</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleStartGame}>Start Game</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
