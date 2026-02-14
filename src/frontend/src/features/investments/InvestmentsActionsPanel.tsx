import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useGameState } from '@/state/gameState';
import { useInvestmentStore } from './investmentStore';
import { toast } from 'sonner';
import { Building2, Megaphone, Users } from 'lucide-react';

export default function InvestmentsActionsPanel() {
  const [marketingAmount, setMarketingAmount] = useState('10000');
  const [recruitmentAmount, setRecruitmentAmount] = useState('5000');
  const { gameState, updateCash } = useGameState();
  const { addInvestment } = useInvestmentStore();

  const handleInvestment = (type: string, amount: bigint, description: string) => {
    if (!gameState || gameState.cash < amount) {
      toast.error('Insufficient funds');
      return;
    }

    updateCash(gameState.cash - amount);
    addInvestment({ type, amount, description });
    toast.success('Investment completed successfully!');
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Buy Company</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Acquire a competitor to expand your market presence</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cost:</span>
              <span className="font-medium">$500,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Market Share Gain:</span>
              <span className="font-medium">+5%</span>
            </div>
          </div>
          <Button
            onClick={() =>
              handleInvestment('acquisition', BigInt(500000), 'Acquired competitor company for market expansion')
            }
            className="w-full"
          >
            Acquire Company
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Marketing Campaign</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Launch a marketing campaign to boost product sales</p>
          <div className="space-y-2">
            <Label htmlFor="marketing">Campaign Budget ($)</Label>
            <Input
              id="marketing"
              type="number"
              value={marketingAmount}
              onChange={(e) => setMarketingAmount(e.target.value)}
              min="1000"
            />
          </div>
          <Button
            onClick={() =>
              handleInvestment(
                'marketing',
                BigInt(parseInt(marketingAmount)),
                `Marketing campaign with $${marketingAmount} budget`
              )
            }
            className="w-full"
          >
            Launch Campaign
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Recruit Talent</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Hire skilled employees to improve productivity</p>
          <div className="space-y-2">
            <Label htmlFor="recruitment">Recruitment Budget ($)</Label>
            <Input
              id="recruitment"
              type="number"
              value={recruitmentAmount}
              onChange={(e) => setRecruitmentAmount(e.target.value)}
              min="1000"
            />
          </div>
          <Button
            onClick={() =>
              handleInvestment(
                'recruitment',
                BigInt(parseInt(recruitmentAmount)),
                `Recruited talent with $${recruitmentAmount} budget`
              )
            }
            className="w-full"
          >
            Recruit Employees
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
