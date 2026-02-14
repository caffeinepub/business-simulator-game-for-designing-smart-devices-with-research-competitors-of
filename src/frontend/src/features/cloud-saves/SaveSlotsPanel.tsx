import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  useGetSaveSlotInfos,
  useSaveGameToSlot,
  useLoadSaveSlot,
  useRenameSaveSlot,
} from '@/hooks/useQueries';
import { useGameState, defaultBranding } from '@/state/gameState';
import { useStoreNetworkStore } from '@/features/stores/storeNetworkStore';
import { createEmptyStoreNetwork } from '@/features/stores/storeNetworkModel';
import { toast } from 'sonner';
import { Plus, Download, Edit2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { Branding } from '@/backend';

export default function SaveSlotsPanel() {
  const { data: slots, isLoading } = useGetSaveSlotInfos();
  const saveGame = useSaveGameToSlot();
  const loadGame = useLoadSaveSlot();
  const renameSlot = useRenameSaveSlot();
  const { gameState, setGameState, releasedProducts, setReleasedProducts, branding, setBranding, triggeredEraEvents, setTriggeredEraEvents } = useGameState();
  const { storeNetwork, initializeFromSave } = useStoreNetworkStore();

  const [showNewSave, setShowNewSave] = useState(false);
  const [showRename, setShowRename] = useState<string | null>(null);
  const [saveName, setSaveName] = useState('');

  const handleCreateSave = async () => {
    if (!saveName.trim() || !gameState) {
      toast.error('Please enter a save name');
      return;
    }

    const saveBranding: Branding = branding || defaultBranding;

    try {
      await saveGame.mutateAsync({
        saveId: `save-${Date.now()}`,
        name: saveName.trim(),
        lastModified: BigInt(Date.now()),
        branding: saveBranding,
        gameState,
        releasedProducts: releasedProducts || [],
        storeNetwork,
        triggeredEvents: triggeredEraEvents || [],
      });
      toast.success('Game saved successfully!');
      setShowNewSave(false);
      setSaveName('');
    } catch (error) {
      toast.error('Failed to save game');
      console.error(error);
    }
  };

  const handleLoadSave = async (slotId: string) => {
    try {
      const save = await loadGame.mutateAsync(slotId);
      if (save) {
        setGameState(save.gameState);
        setReleasedProducts(save.releasedProducts || []);
        setBranding(save.branding || defaultBranding);
        
        // Load store network with safe defaults for older saves
        const loadedStoreNetwork = save.storeNetwork || createEmptyStoreNetwork();
        initializeFromSave(loadedStoreNetwork);
        
        // Load triggered era events with safe default for older saves
        setTriggeredEraEvents(save.triggeredEvents || []);
        
        toast.success('Game loaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to load game');
      console.error(error);
    }
  };

  const handleRenameSave = async () => {
    if (!showRename || !saveName.trim()) return;

    try {
      await renameSlot.mutateAsync({ slotId: showRename, newName: saveName.trim() });
      toast.success('Save renamed successfully!');
      setShowRename(null);
      setSaveName('');
    } catch (error) {
      toast.error('Failed to rename save');
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading saves...</div>;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Save Slots</h2>
          <Button onClick={() => setShowNewSave(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Save
          </Button>
        </div>

        {!slots || slots.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No saves yet. Create your first save!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {slots.map((slot) => (
              <Card key={slot.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{slot.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {new Date(Number(slot.lastModified)).toLocaleDateString()}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleLoadSave(slot.id)}>
                      <Download className="h-4 w-4 mr-1" />
                      Load
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowRename(slot.id);
                        setSaveName(slot.name);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showNewSave} onOpenChange={setShowNewSave}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Save</DialogTitle>
            <DialogDescription>Enter a name for your save slot</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="saveName">Save Name</Label>
              <Input
                id="saveName"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="My Game Save"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSave(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSave} disabled={saveGame.isPending}>
              {saveGame.isPending ? 'Saving...' : 'Create Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showRename} onOpenChange={() => setShowRename(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Save</DialogTitle>
            <DialogDescription>Enter a new name for your save slot</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="renameSave">Save Name</Label>
              <Input
                id="renameSave"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="New name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRename(null)}>
              Cancel
            </Button>
            <Button onClick={handleRenameSave} disabled={renameSlot.isPending}>
              {renameSlot.isPending ? 'Renaming...' : 'Rename'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
