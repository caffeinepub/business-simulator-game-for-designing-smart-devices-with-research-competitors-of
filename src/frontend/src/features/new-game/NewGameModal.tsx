import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useGameState } from '@/state/gameState';
import { toast } from 'sonner';
import { difficultyPresets } from './difficultyPresets';
import LogoCreator from '@/features/branding/LogoCreator';

interface NewGameModalProps {
  onClose: () => void;
}

export default function NewGameModal({ onClose }: NewGameModalProps) {
  const [difficulty, setDifficulty] = useState<'normal' | 'challenging'>('normal');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const { setGameState, setReleasedProducts, setBranding, setTriggeredEraEvents } = useGameState();

  const handleStartGame = () => {
    const trimmedName = companyName.trim();
    if (!trimmedName) {
      toast.error('Please enter a company name');
      return;
    }

    const preset = difficultyPresets[difficulty];
    setGameState({
      cash: preset.startingCash,
      researchedTechs: [],
      products: [],
      difficulty,
    });
    setReleasedProducts([]);
    setBranding({
      companyName: trimmedName,
      companyLogo: companyLogo,
      productName: '',
      productLogo: '',
    });
    setTriggeredEraEvents([]);
    toast.success(`New game started on ${difficulty} difficulty!`);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Start New Game</DialogTitle>
          <DialogDescription>Set up your company and choose your difficulty level</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
              />
            </div>

            <LogoCreator
              value={companyLogo}
              onChange={setCompanyLogo}
              defaultText={companyName}
              label="Company Logo"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Difficulty Level</Label>
            <RadioGroup value={difficulty} onValueChange={(v) => setDifficulty(v as 'normal' | 'challenging')}>
              <div className="space-y-3">
                {Object.entries(difficultyPresets).map(([key, preset]) => (
                  <div key={key} className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent/50">
                    <RadioGroupItem value={key} id={key} className="mt-1" />
                    <Label htmlFor={key} className="flex-1 cursor-pointer">
                      <div className="font-semibold capitalize mb-1">{key}</div>
                      <div className="text-sm text-muted-foreground">{preset.description}</div>
                      <div className="text-sm font-medium mt-2">Starting Cash: ${preset.startingCash.toString()}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
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
