import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Users, Zap, Plus } from 'lucide-react';
import { useGameState } from '@/state/gameState';
import { useSimulationEngine } from '@/features/simulation/simulationEngine';
import { useStoreNetworkStore } from '@/features/stores/storeNetworkStore';
import NewGameModal from '@/features/new-game/NewGameModal';
import { useState } from 'react';
import MetricsPanel from '@/features/dashboard/MetricsPanel';
import BestProductsOfYearPanel from '@/features/dashboard/BestProductsOfYearPanel';
import StoreNetworkSummaryPanel from '@/features/stores/StoreNetworkSummaryPanel';

export default function DashboardPage() {
  const { gameState, releasedProducts } = useGameState();
  const { isRunning, toggleSimulation, currentDay } = useSimulationEngine();
  const { storeNetwork } = useStoreNetworkStore();
  const [showNewGame, setShowNewGame] = useState(false);

  return (
    <div className="space-y-6">
      <div className="relative h-48 rounded-lg overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1600x600.png"
          alt="Dashboard Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-foreground mb-2">TechCorp Dashboard</h1>
            <p className="text-muted-foreground">Build your device empire and dominate the market</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowNewGame(true)} variant="default">
            <Plus className="h-4 w-4 mr-2" />
            New Game
          </Button>
          <Button onClick={toggleSimulation} variant={isRunning ? 'destructive' : 'secondary'}>
            {isRunning ? 'Pause' : 'Resume'} Simulation
          </Button>
          <Badge variant="outline" className="text-sm">
            Day {currentDay}
          </Badge>
        </div>
        {gameState && (
          <Badge variant="secondary" className="text-sm">
            Difficulty: {gameState.difficulty}
          </Badge>
        )}
      </div>

      <MetricsPanel />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${gameState?.cash.toString() || '0'}</div>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{releasedProducts.length}</div>
            <p className="text-xs text-muted-foreground">Released devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Research</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gameState?.researchedTechs.length || 0}</div>
            <p className="text-xs text-muted-foreground">Technologies unlocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Store Network</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storeNetwork.stores.length}</div>
            <p className="text-xs text-muted-foreground">
              {storeNetwork.stores.length === 0 ? 'No stores yet' : 'Global stores'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BestProductsOfYearPanel releasedProducts={releasedProducts} currentDay={currentDay} />
        </div>
        <div className="lg:col-span-1">
          <StoreNetworkSummaryPanel />
        </div>
      </div>

      {showNewGame && <NewGameModal onClose={() => setShowNewGame(false)} />}
    </div>
  );
}
