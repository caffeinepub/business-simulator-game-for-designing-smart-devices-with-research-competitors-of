import { Link, useRouterState } from '@tanstack/react-router';
import { Building2, Cpu, FlaskConical, TrendingUp, Briefcase, Cloud, LayoutDashboard, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import { useGameState } from '@/state/gameState';
import LogoRenderer from '@/features/branding/LogoRenderer';
import MobileNavPanel from './MobileNavPanel';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const companyName = branding?.companyName || 'TechCorp';
  const companyLogo = branding?.companyLogo;

  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center gap-2">
                {companyLogo ? (
                  <LogoRenderer logo={companyLogo} name={companyName} size="sm" />
                ) : (
                  <img src="/assets/generated/logo.dim_512x512.png" alt="Logo" className="h-6 w-6" />
                )}
                <span className="text-lg font-semibold text-foreground">{companyName}</span>
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {identity && userProfile && (
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {userProfile.name}
                </span>
              )}
              <LoginButton />
            </div>
          </div>
        </div>
      </header>
      <MobileNavPanel
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        currentPath={currentPath}
      />
    </>
  );
}
