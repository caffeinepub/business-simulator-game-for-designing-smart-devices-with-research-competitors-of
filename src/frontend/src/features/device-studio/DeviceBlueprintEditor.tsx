import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateDeviceBlueprint } from '@/hooks/useQueries';
import { toast } from 'sonner';
import type { DeviceBlueprint } from '../../backend';
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

  const createBlueprint = useCreateDeviceBlueprint();

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a device name');
      return;
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
    };

    try {
      await createBlueprint.mutateAsync(blueprint);
      toast.success('Blueprint saved successfully!');
      setName('');
      onSaved();
    } catch (error) {
      toast.error('Failed to save blueprint');
      console.error(error);
    }
  };

  return (
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
                <SelectItem value="smartphones">Smartphone</SelectItem>
                <SelectItem value="tablets">Tablet</SelectItem>
                <SelectItem value="watches">Smartwatch</SelectItem>
                <SelectItem value="smart-glasses">Smart Glasses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Device Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., TechPhone Pro" />
          </div>
        </div>

        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
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
  );
}
