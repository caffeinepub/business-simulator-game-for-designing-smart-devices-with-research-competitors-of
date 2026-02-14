import { Link } from '@tanstack/react-router';
import { LucideIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ path: string; label: string; icon: LucideIcon }>;
  currentPath: string;
}

export default function MobileNavPanel({ isOpen, onClose, navItems, currentPath }: MobileNavPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-50 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
    </>
  );
}
