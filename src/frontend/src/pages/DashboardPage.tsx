import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Users, Zap, Plus, Calendar, Play, Pause, LayoutDashboard } from 'lucide-react';
import { useGameState } from '@/state/gameState';
import { useSimulationEngine } from '@/features/simulation/simulationEngine';
import { useStoreNetworkStore } from '@/features/stores/storeNetworkStore';
import NewGameModal from '@/features/new-game/NewGameModal';
import { useState } from 'react';
import MetricsPanel from '@/features/dashboard/MetricsPanel';
import BestProductsOfYearPanel from '@/features/dashboard/BestProductsOfYearPanel';
import StoreNetworkSummaryPanel from '@/features/stores/StoreNetworkSummaryPanel';
import { formatDay } from '@/utils/gameCalendar';
import PageHeader from '@/components/layout/PageHeader';
import LogoRenderer from '@/features/branding/LogoRenderer';

export default function DashboardPage() {
  const { gameState, releasedProducts, branding } = useGameState();
  const { isRunning, toggleSimulation, currentDay } = useSimulationEngine();
  const { storeNetwork } = useStoreNetworkStore();
  const [showNewGame, setShowNewGame] = useState(false);

  const formattedDate = formatDay(currentDay);
  const companyName = branding?.companyName || 'TechCorp';
  const companyLogo = branding?.companyLogo;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={LayoutDashboard}
        title={companyName}
        subtitle="Manage your device empire and track performance"
        actions={
          <div className="flex items-center gap-2">
            {companyLogo && (
              <div className="hidden sm:block">
                <LogoRenderer logo={companyLogo} name={companyName} size="md" />
              </div>
            )}
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setShowNewGame(true)} variant="default" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Game
        </Button>
        <Button onClick={toggleSimulation} variant={isRunning ? 'secondary' : 'default'} size="sm">
          {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isRunning ? 'Pause' : 'Resume'}
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-normal">
            Day {currentDay}
          </Badge>
          <Badge variant="secondary" className="text-xs font-normal flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </Badge>
          {gameState && (
            <Badge variant="secondary" className="text-xs font-normal">
              {gameState.difficulty}
            </Badge>
          )}
        </div>
      </div>

      <MetricsPanel />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">${gameState?.cash.toString() || '0'}</div>
            <p className="text-xs text-muted-foreground mt-1">Available funds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{releasedProducts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Released devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Research</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{gameState?.researchedTechs.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Technologies unlocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Store Network</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{storeNetwork.stores.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
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
