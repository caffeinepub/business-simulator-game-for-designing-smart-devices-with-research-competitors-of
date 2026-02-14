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
import { useGetPremiumUnlock } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { createReleasedProduct, getCategoryFromBlueprint, extractFeaturesFromBlueprint } from '@/features/dashboard/releasedProductModel';
import {
  calculateAdjustedProductionCost,
  calculateAdjustedSales,
  calculateAdjustedRating,
} from './releaseModifiers';
import LogoCreator from '@/features/branding/LogoCreator';
import { TrendingUp, Zap } from 'lucide-react';
import type { DeviceBlueprint } from '../../backend';

interface ReleaseProductModalProps {
  blueprint: DeviceBlueprint;
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
  const { data: hasPremium } = useGetPremiumUnlock();

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

  // Extract features from blueprint
  const blueprintFeatures = extractFeaturesFromBlueprint(blueprint, hasPremium || false);

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

    // Check if using premium foldable features without unlock
    const category = getCategoryFromBlueprint(blueprint);
    if (category === 'foldables' && blueprint.foldableCharacteristics && !hasPremium) {
      const fc = blueprint.foldableCharacteristics;
      const premiumFoldTypes = ['tri-fold', 'rollable', 'dual-fold'];
      const premiumHingeTypes = ['invisible', 'multi-angle', 'self-healing'];
      
      if (premiumFoldTypes.includes(fc.foldType) || premiumHingeTypes.includes(fc.hingeType) || fc.outerDisplay) {
        toast.error('This blueprint uses premium features. Please unlock premium features for $1.99');
        return;
      }
    }

    // Add to legacy products list
    addProduct(trimmedName);

    // Create and add released product record with features
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
    
    // Add blueprint features to the released product
    releasedProduct.features = [...releasedProduct.features, ...blueprintFeatures];
    
    addReleasedProduct(releasedProduct);

    // Deduct costs
    updateCash(-totalCost);

    toast.success(`${trimmedName} released successfully!`);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Release Product</DialogTitle>
          <DialogDescription>Configure your product launch parameters</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Branding */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Branding</h3>
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <Label>Product Logo (Optional)</Label>
              <LogoCreator
                value={productLogo}
                onChange={setProductLogo}
                defaultText="Product"
                label=""
              />
            </div>
          </div>

          <Separator />

          {/* Launch Parameters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Launch Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">Production Volume</Label>
                <Input
                  id="volume"
                  type="number"
                  value={productionVolume}
                  onChange={(e) => setProductionVolume(e.target.value)}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketing">Marketing Budget ($)</Label>
                <Input
                  id="marketing"
                  type="number"
                  value={marketingBudget}
                  onChange={(e) => setMarketingBudget(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Store Network Bonuses */}
          {(productivityBonus > 0 || attractionBonus > 0) && (
            <>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Store Network Bonuses
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {productivityBonus > 0 && (
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Productivity Bonus
                      </p>
                      <p className="text-lg font-bold">-{productivityBonus}%</p>
                      <p className="text-xs text-muted-foreground">Production cost reduction</p>
                    </div>
                  )}
                  {attractionBonus > 0 && (
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Attraction Bonus
                      </p>
                      <p className="text-lg font-bold">+{attractionBonus}%</p>
                      <p className="text-xs text-muted-foreground">Sales & rating boost</p>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Cost Summary */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Cost Summary</h3>
            <div className="space-y-2 p-4 rounded-lg bg-muted">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base Production Cost:</span>
                <span>${baseProductionCost.toLocaleString()}</span>
              </div>
              {productivityBonus > 0 && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                  <span>Productivity Savings (-{productivityBonus}%):</span>
                  <span>-${(baseProductionCost - adjustedProductionCost).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Adjusted Production Cost:</span>
                <span>${adjustedProductionCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Marketing Budget:</span>
                <span>${parseInt(marketingBudget).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Cost:</span>
                <span>${totalCost.toString()}</span>
              </div>
            </div>
          </div>

          {/* Projected Performance */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Projected Performance
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Expected Sales</p>
                <p className="text-xl font-bold">{adjustedSales.toLocaleString()}</p>
                {attractionBonus > 0 && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    +{attractionBonus}% from stores
                  </Badge>
                )}
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Expected Rating</p>
                <p className="text-xl font-bold">{adjustedRating.toFixed(2)} / 5.0</p>
                {attractionBonus > 0 && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    +{attractionBonus}% from stores
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Blueprint Features */}
          {blueprintFeatures.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Blueprint Features</h3>
                <div className="flex flex-wrap gap-2">
                  {blueprintFeatures.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleRelease} disabled={!gameState || gameState.cash < totalCost}>
              Release Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
