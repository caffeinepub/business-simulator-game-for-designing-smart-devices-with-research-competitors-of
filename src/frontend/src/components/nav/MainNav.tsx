import { Link, useRouterState } from '@tanstack/react-router';
import { Building2, Cpu, FlaskConical, TrendingUp, Briefcase, Cloud, LayoutDashboard } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import { useGameState } from '@/state/gameState';
import LogoRenderer from '@/features/branding/LogoRenderer';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/device-studio', label: 'Device Studio', icon: Cpu },
  { path: '/research', label: 'Research', icon: FlaskConical },
  { path: '/competitors', label: 'Market', icon: TrendingUp },
  { path: '/office', label: 'Office', icon: Building2 },
  { path: '/investments', label: 'Investments', icon: Briefcase },
  { path: '/cloud-saves', label: 'Cloud Saves', icon: Cloud },
];

export default function MainNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { branding } = useGameState();

  const companyName = branding?.companyName || 'TechCorp';
  const companyLogo = branding?.companyLogo;

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              {companyLogo ? (
                <LogoRenderer logo={companyLogo} name={companyName} size="md" />
              ) : (
                <img src="/assets/generated/logo.dim_512x512.png" alt="Logo" className="h-8 w-8" />
              )}
              <span className="text-xl font-bold text-foreground">{companyName}</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {identity && userProfile && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, <span className="text-foreground font-medium">{userProfile.name}</span>
              </span>
            )}
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  );
}
