import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGameState } from '@/state/gameState';
import { toast } from 'sonner';

interface ReleaseProductModalProps {
  blueprint: any;
  onClose: () => void;
}

export default function ReleaseProductModal({ blueprint, onClose }: ReleaseProductModalProps) {
  const [price, setPrice] = useState(blueprint.price.toString());
  const [productionVolume, setProductionVolume] = useState('10000');
  const [marketingBudget, setMarketingBudget] = useState('50000');
  const { addProduct, updateCash, gameState } = useGameState();

  const handleRelease = () => {
    const totalCost = BigInt(parseInt(productionVolume) * 100 + parseInt(marketingBudget));
    if (gameState && gameState.cash < totalCost) {
      toast.error('Insufficient funds for product release');
      return;
    }

    addProduct(blueprint.name);
    if (gameState) {
      updateCash(gameState.cash - totalCost);
    }
    toast.success(`${blueprint.name} released to market!`);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Release Product</DialogTitle>
          <DialogDescription>Configure launch parameters for {blueprint.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="price">Retail Price ($)</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="volume">Production Volume (units)</Label>
            <Input
              id="volume"
              type="number"
              value={productionVolume}
              onChange={(e) => setProductionVolume(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketing">Marketing Budget ($)</Label>
            <Input
              id="marketing"
              type="number"
              value={marketingBudget}
              onChange={(e) => setMarketingBudget(e.target.value)}
            />
          </div>
          <div className="rounded-lg bg-muted p-3 text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Production Cost:</span>
              <span className="font-medium">${(parseInt(productionVolume) * 100).toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Marketing:</span>
              <span className="font-medium">${parseInt(marketingBudget).toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-semibold">Total Cost:</span>
              <span className="font-bold">
                ${(parseInt(productionVolume) * 100 + parseInt(marketingBudget)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleRelease}>Release Product</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
