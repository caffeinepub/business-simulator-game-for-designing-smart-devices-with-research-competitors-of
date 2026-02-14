import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useGameState } from '@/state/gameState';
import { useSimulationStore } from '@/features/simulation/simulationEngine';
import { useStoreNetworkStore } from '@/features/stores/storeNetworkStore';
import { toast } from 'sonner';
import { createReleasedProduct, getCategoryFromBlueprint } from '@/features/dashboard/releasedProductModel';
import {
  calculateAdjustedProductionCost,
  calculateAdjustedSales,
  calculateAdjustedRating,
} from './releaseModifiers';
import LogoCreator from '@/features/branding/LogoCreator';
import { TrendingUp, Zap } from 'lucide-react';

interface ReleaseProductModalProps {
  blueprint: any;
  onClose: () => void;
}

export default function ReleaseProductModal({ blueprint, onClose }: ReleaseProductModalProps) {
  const [productName, setProductName] = useState(blueprint.name);
  const [productLogo, setProductLogo] = useState('');
  const [price, setPrice] = useState(blueprint.price.toString());
  const [productionVolume, setProductionVolume] = useState('10000');
  const [marketingBudget, setMarketingBudget] = useState('50000');
  const { addProduct, updateCash, gameState, addReleasedProduct } = useGameState();
  const { currentDay } = useSimulationStore();
  const { storeNetwork } = useStoreNetworkStore();

  const productivityBonus = Number(storeNetwork.productivityBonus);
  const attractionBonus = Number(storeNetwork.productAttractionBonus);

  // Calculate costs with modifiers
  const baseProductionCost = parseInt(productionVolume) * 100;
  const adjustedProductionCost = calculateAdjustedProductionCost(
    parseInt(productionVolume),
    100,
    productivityBonus
  );
  const totalCost = BigInt(adjustedProductionCost + parseInt(marketingBudget));

  // Calculate adjusted sales and rating
  const baseSales = parseInt(productionVolume);
  const adjustedSales = calculateAdjustedSales(baseSales, attractionBonus);

  const baseScore = (parseInt(price) * baseSales) / 1000 + parseInt(marketingBudget) / 100;
  const baseRating = Math.min(5.0, baseScore / 10000);
  const adjustedRating = calculateAdjustedRating(baseRating, attractionBonus);

  const handleRelease = () => {
    const trimmedName = productName.trim();
    if (!trimmedName) {
      toast.error('Please enter a product name');
      return;
    }

    if (gameState && gameState.cash < totalCost) {
      toast.error('Insufficient funds for product release');
      return;
    }

    // Add to legacy products list
    addProduct(trimmedName);

    // Create and add released product record with branding and modifiers
    const category = getCategoryFromBlueprint(blueprint);
    const releasedProduct = createReleasedProduct(
      trimmedName,
      category,
      currentDay,
      parseInt(price),
      parseInt(productionVolume),
      parseInt(marketingBudget),
      productLogo,
      adjustedSales,
      adjustedRating
    );
    addReleasedProduct(releasedProduct);

    // Update cash
    if (gameState) {
      updateCash(gameState.cash - totalCost);
    }

    toast.success(`${trimmedName} released to market!`);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Release Product</DialogTitle>
          <DialogDescription>Configure your product branding and launch parameters</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <LogoCreator
              value={productLogo}
              onChange={setProductLogo}
              defaultText={productName}
              label="Product Logo"
            />
          </div>

          <Separator />

          <div className="space-y-4">
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
          </div>

          <Separator />

          {/* Store Network Bonuses Display */}
          {(productivityBonus > 0 || attractionBonus > 0) && (
            <div className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                Store Network Bonuses Active
              </h4>
              <div className="space-y-2 text-sm">
                {productivityBonus > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span>Productivity Bonus ({productivityBonus}%)</span>
                    </div>
                    <Badge variant="secondary">
                      -${(baseProductionCost - adjustedProductionCost).toLocaleString()}
                    </Badge>
                  </div>
                )}
                {attractionBonus > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>Attraction Bonus ({attractionBonus}%)</span>
                    </div>
                    <Badge variant="secondary">
                      +{(adjustedSales - baseSales).toLocaleString()} sales
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cost Summary */}
          <div className="space-y-2 p-4 rounded-lg bg-muted">
            <div className="flex justify-between text-sm">
              <span>Production Cost:</span>
              <span className={productivityBonus > 0 ? 'line-through text-muted-foreground' : ''}>
                ${baseProductionCost.toLocaleString()}
              </span>
            </div>
            {productivityBonus > 0 && (
              <div className="flex justify-between text-sm font-medium text-primary">
                <span>Adjusted Production Cost:</span>
                <span>${adjustedProductionCost.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Marketing Budget:</span>
              <span>${parseInt(marketingBudget).toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total Cost:</span>
              <span>${totalCost.toString()}</span>
            </div>
          </div>

          {/* Expected Results */}
          <div className="space-y-2 p-4 rounded-lg bg-muted">
            <h4 className="text-sm font-semibold mb-2">Expected Results</h4>
            <div className="flex justify-between text-sm">
              <span>Expected Sales:</span>
              <span className="font-medium">{adjustedSales.toLocaleString()} units</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Expected Rating:</span>
              <span className="font-medium">{adjustedRating.toFixed(2)} / 5.0</span>
            </div>
          </div>

          <Button onClick={handleRelease} className="w-full" size="lg">
            Release Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
