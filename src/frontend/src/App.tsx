import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import GameLayout from './components/layout/GameLayout';
import DashboardPage from './pages/DashboardPage';
import DeviceStudioPage from './pages/DeviceStudioPage';
import ResearchPage from './pages/ResearchPage';
import CompetitorsMarketPage from './pages/CompetitorsMarketPage';
import OfficePage from './pages/OfficePage';
import InvestmentsPage from './pages/InvestmentsPage';
import CloudSavesPage from './pages/CloudSavesPage';

const rootRoute = createRootRoute({
  component: () => (
    <GameLayout>
      <Outlet />
    </GameLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const deviceStudioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/device-studio',
  component: DeviceStudioPage,
});

const researchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/research',
  component: ResearchPage,
});

const competitorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/competitors',
  component: CompetitorsMarketPage,
});

const officeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/office',
  component: OfficePage,
});

const investmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/investments',
  component: InvestmentsPage,
});

const cloudSavesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cloud-saves',
  component: CloudSavesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  deviceStudioRoute,
  researchRoute,
  competitorsRoute,
  officeRoute,
  investmentsRoute,
  cloudSavesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
