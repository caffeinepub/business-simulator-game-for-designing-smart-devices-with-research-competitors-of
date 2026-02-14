import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useCreateDeviceBlueprint, useGetAllDeviceCategories, useGetPremiumUnlock, useActivatePremiumUnlock } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { Lock, Sparkles } from 'lucide-react';
import type { DeviceBlueprint, FoldableCharacteristics } from '../../backend';
import { createDefaultBlueprint } from './deviceBlueprintAdapters';
import DesignPicker from './DesignPicker';

interface DeviceBlueprintEditorProps {
  blueprintId: number | null;
  onSaved: () => void;
}

export default function DeviceBlueprintEditor({ blueprintId, onSaved }: DeviceBlueprintEditorProps) {
  const [category, setCategory] = useState<string>('smartphones');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('999');
  const [cpuCores, setCpuCores] = useState('8');
  const [ramCapacity, setRamCapacity] = useState('8');
  const [storageCapacity, setStorageCapacity] = useState('256');
  const [batteryCapacity, setBatteryCapacity] = useState('4000');
  const [selectedDesign, setSelectedDesign] = useState('design-1');
  
  // Foldable-specific state
  const [foldType, setFoldType] = useState<string>('book');
  const [hingeType, setHingeType] = useState<string>('standard');
  const [hingeDurability, setHingeDurability] = useState<number>(200000);
  const [creaseVisibility, setCreaseVisibility] = useState<number>(3);
  const [outerDisplay, setOuterDisplay] = useState<boolean>(false);
  const [outerDisplaySize, setOuterDisplaySize] = useState<string>('1.9');
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);

  const createBlueprint = useCreateDeviceBlueprint();
  const { data: categoriesData } = useGetAllDeviceCategories();
  const { data: hasPremium, isLoading: premiumLoading } = useGetPremiumUnlock();
  const activatePremium = useActivatePremiumUnlock();

  const categories = categoriesData?.__kind__ === 'categoryList' ? categoriesData.categoryList : [];
  const isFoldable = category === 'foldables';

  // Free foldable features: book, clamshell, standard fold types
  const freeFoldTypes = ['book', 'clamshell', 'standard'];
  const isPremiumFoldType = isFoldable && !freeFoldTypes.includes(foldType);

  // Premium features: advanced fold types, advanced hinge types, outer display
  const premiumFoldTypes = ['tri-fold', 'rollable', 'dual-fold'];
  const premiumHingeTypes = ['invisible', 'multi-angle', 'self-healing'];

  const handleUnlockPremium = async () => {
    try {
      await activatePremium.mutateAsync();
      toast.success('Premium features unlocked! 🎉');
      setShowUnlockDialog(false);
    } catch (error) {
      toast.error('Failed to unlock premium features');
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a device name');
      return;
    }

    // Check if using premium features without unlock
    if (isFoldable && !hasPremium) {
      if (isPremiumFoldType || premiumHingeTypes.includes(hingeType) || outerDisplay) {
        toast.error('Premium features require unlock. Please unlock for $1.99');
        setShowUnlockDialog(true);
        return;
      }
    }

    const blueprint: DeviceBlueprint = {
      ...createDefaultBlueprint(),
      category: { __kind__: 'singleCategory', singleCategory: category },
      name: name.trim(),
      price: BigInt(parseInt(price) || 999),
      processingUnit: {
        ...createDefaultBlueprint().processingUnit,
        cores: BigInt(parseInt(cpuCores) || 8),
      },
      rams: [
        {
          id: BigInt(1),
          type: 'DDR5',
          capacity: BigInt(parseInt(ramCapacity) || 8),
          modules: BigInt(1),
          clockSpeed: BigInt(3200),
          manufacturer: 'TechCorp',
          description: 'High-performance RAM',
        },
      ],
      storages: [
        {
          id: BigInt(1),
          name: 'Internal Storage',
          type: 'NVMe SSD',
          capacity: BigInt(parseInt(storageCapacity) || 256),
          manufacturer: 'TechCorp',
          description: 'Fast storage',
          energyConsumption: BigInt(5),
        },
      ],
      battery: {
        ...createDefaultBlueprint().battery,
        capacity: BigInt(parseInt(batteryCapacity) || 4000),
      },
      foldableCharacteristics: isFoldable ? {
        foldType,
        hingeType,
        hingeDurability: BigInt(hingeDurability),
        creaseVisibility: BigInt(creaseVisibility),
        outerDisplay,
        outerDisplaySize: outerDisplay ? parseFloat(outerDisplaySize) : undefined,
        price: BigInt(parseInt(price) || 999),
        finalized: true,
        hingeMaterial: 'Titanium Alloy',
        foldAngle: 180.0,
        waterproofRating: 'IPX8',
        shockproofRating: 'MIL-STD-810G',
        wirelessChargingSupport: true,
        multiAngleSupport: premiumHingeTypes.includes(hingeType),
        fingerprintResistance: true,
        facePrintResistance: BigInt(5),
        weight: BigInt(280),
        displayTechnology: 'Ultra Thin Glass',
        thickness: 6.9,
        magneticLock: true,
        coatingType: 'Anti-fingerprint',
        resistanceRating: 'IP68',
      } : undefined,
    };

    try {
      const result = await createBlueprint.mutateAsync(blueprint);
      
      if (result.__kind__ === 'premiumFeatureRequired') {
        toast.error('Premium features require unlock. Please unlock for $1.99');
        setShowUnlockDialog(true);
        return;
      }
      
      toast.success('Blueprint saved successfully!');
      setName('');
      onSaved();
    } catch (error) {
      toast.error('Failed to save blueprint');
      console.error(error);
    }
  };

  const getCategoryIcon = (cat: string, isDark: boolean = false) => {
    if (cat === 'foldables') {
      return (
        <img 
          src={isDark ? '/assets/generated/foldable-icon-dark.dim_128x128.png' : '/assets/generated/foldable-icon.dim_128x128.png'}
          alt="Foldable"
          className="w-5 h-5 inline-block"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const nextSibling = e.currentTarget.nextElementSibling;
            if (nextSibling) {
              nextSibling.textContent = '📱';
            }
          }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create Device Blueprint</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Device Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      <span className="flex items-center gap-2">
                        {cat === 'foldables' && getCategoryIcon(cat)}
                        {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Device Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., TechPhone Pro" />
            </div>
          </div>

          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              {isFoldable && <TabsTrigger value="foldable">Foldable</TabsTrigger>}
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cpu">CPU Cores</Label>
                  <Input
                    id="cpu"
                    type="number"
                    value={cpuCores}
                    onChange={(e) => setCpuCores(e.target.value)}
                    min="1"
                    max="16"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ram">RAM (GB)</Label>
                  <Input
                    id="ram"
                    type="number"
                    value={ramCapacity}
                    onChange={(e) => setRamCapacity(e.target.value)}
                    min="1"
                    max="32"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storage">Storage (GB)</Label>
                  <Input
                    id="storage"
                    type="number"
                    value={storageCapacity}
                    onChange={(e) => setStorageCapacity(e.target.value)}
                    min="32"
                    max="2048"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="battery">Battery (mAh)</Label>
                  <Input
                    id="battery"
                    type="number"
                    value={batteryCapacity}
                    onChange={(e) => setBatteryCapacity(e.target.value)}
                    min="1000"
                    max="10000"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-4">
              <DesignPicker category={category} selectedDesign={selectedDesign} onSelectDesign={setSelectedDesign} />
            </TabsContent>

            {isFoldable && (
              <TabsContent value="foldable" className="space-y-6 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="foldType">Fold Type</Label>
                    <Select value={foldType} onValueChange={setFoldType}>
                      <SelectTrigger id="foldType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="book">Book Fold (Free)</SelectItem>
                        <SelectItem value="clamshell">Clamshell (Free)</SelectItem>
                        <SelectItem value="standard">Standard (Free)</SelectItem>
                        <SelectItem value="tri-fold" disabled={!hasPremium}>
                          <span className="flex items-center gap-2">
                            Tri-Fold (Premium) {!hasPremium && <Lock className="h-3 w-3" />}
                          </span>
                        </SelectItem>
                        <SelectItem value="rollable" disabled={!hasPremium}>
                          <span className="flex items-center gap-2">
                            Rollable (Premium) {!hasPremium && <Lock className="h-3 w-3" />}
                          </span>
                        </SelectItem>
                        <SelectItem value="dual-fold" disabled={!hasPremium}>
                          <span className="flex items-center gap-2">
                            Dual-Fold (Premium) {!hasPremium && <Lock className="h-3 w-3" />}
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Free: Book, Clamshell, Standard | Premium: Tri-Fold, Rollable, Dual-Fold
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hingeType">Hinge Type</Label>
                    <Select value={hingeType} onValueChange={setHingeType}>
                      <SelectTrigger id="hingeType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (Free)</SelectItem>
                        <SelectItem value="floating">Floating (Free)</SelectItem>
                        <SelectItem value="invisible" disabled={!hasPremium}>
                          <span className="flex items-center gap-2">
                            Invisible (Premium) {!hasPremium && <Lock className="h-3 w-3" />}
                          </span>
                        </SelectItem>
                        <SelectItem value="multi-angle" disabled={!hasPremium}>
                          <span className="flex items-center gap-2">
                            Multi-Angle (Premium) {!hasPremium && <Lock className="h-3 w-3" />}
                          </span>
                        </SelectItem>
                        <SelectItem value="self-healing" disabled={!hasPremium}>
                          <span className="flex items-center gap-2">
                            Self-Healing (Premium) {!hasPremium && <Lock className="h-3 w-3" />}
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Free: Standard, Floating | Premium: Invisible, Multi-Angle, Self-Healing
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hingeDurability">Hinge Durability (cycles)</Label>
                    <Input
                      id="hingeDurability"
                      type="number"
                      value={hingeDurability}
                      onChange={(e) => setHingeDurability(parseInt(e.target.value) || 200000)}
                      min="100000"
                      max="500000"
                      step="10000"
                    />
                    <p className="text-xs text-muted-foreground">Number of fold/unfold cycles before wear</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="creaseVisibility">Crease Visibility (1-10)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="creaseVisibility"
                        value={[creaseVisibility]}
                        onValueChange={(val) => setCreaseVisibility(val[0])}
                        min={1}
                        max={10}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8">{creaseVisibility}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Lower is better (less visible crease)</p>
                  </div>

                  <div className="space-y-4 p-4 rounded-lg border bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="outerDisplay" className="flex items-center gap-2">
                          Outer Display
                          {!hasPremium && <Lock className="h-3 w-3 text-muted-foreground" />}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {hasPremium ? 'Secondary display on the outside' : 'Premium feature - Unlock for $1.99'}
                        </p>
                      </div>
                      <Switch
                        id="outerDisplay"
                        checked={outerDisplay}
                        onCheckedChange={setOuterDisplay}
                        disabled={!hasPremium}
                      />
                    </div>

                    {outerDisplay && hasPremium && (
                      <div className="space-y-2">
                        <Label htmlFor="outerDisplaySize">Outer Display Size (inches)</Label>
                        <Input
                          id="outerDisplaySize"
                          type="number"
                          value={outerDisplaySize}
                          onChange={(e) => setOuterDisplaySize(e.target.value)}
                          min="1.0"
                          max="4.0"
                          step="0.1"
                        />
                      </div>
                    )}
                  </div>

                  {!hasPremium && (
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">Unlock Premium Foldable Features</h4>
                          <p className="text-xs text-muted-foreground mb-3">
                            Get access to advanced fold types (Tri-Fold, Rollable, Dual-Fold), premium hinge types (Invisible, Multi-Angle, Self-Healing), and outer display support.
                          </p>
                          <Button size="sm" onClick={() => setShowUnlockDialog(true)}>
                            Unlock for $1.99
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            )}

            <TabsContent value="pricing" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="price">Retail Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="99"
                  max="9999"
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleSave} disabled={createBlueprint.isPending} className="w-full">
            {createBlueprint.isPending ? 'Saving...' : 'Save Blueprint'}
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unlock Premium Foldable Features</AlertDialogTitle>
            <AlertDialogDescription>
              Get access to advanced foldable device features for $1.99:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Advanced fold types: Tri-Fold, Rollable, Dual-Fold</li>
                <li>Premium hinge types: Invisible, Multi-Angle, Self-Healing</li>
                <li>Outer display support with customizable size</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnlockPremium} disabled={activatePremium.isPending}>
              {activatePremium.isPending ? 'Processing...' : 'Unlock for $1.99'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
