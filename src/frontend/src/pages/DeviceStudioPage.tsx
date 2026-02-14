import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeviceBlueprintEditor from '@/features/device-studio/DeviceBlueprintEditor';
import BlueprintList from '@/features/device-studio/BlueprintList';
import { Cpu } from 'lucide-react';

export default function DeviceStudioPage() {
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Cpu className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Device Studio</h1>
          <p className="text-muted-foreground">Design and create your next breakthrough device</p>
        </div>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="editor">Blueprint Editor</TabsTrigger>
          <TabsTrigger value="list">My Blueprints</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="mt-6">
          <DeviceBlueprintEditor blueprintId={selectedBlueprintId} onSaved={() => setSelectedBlueprintId(null)} />
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <BlueprintList onEdit={(id) => setSelectedBlueprintId(id)} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
