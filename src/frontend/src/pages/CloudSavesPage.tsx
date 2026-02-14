import { Cloud } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import SaveSlotsPanel from '@/features/cloud-saves/SaveSlotsPanel';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import LoginButton from '@/components/auth/LoginButton';

export default function CloudSavesPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Cloud className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Cloud Saves</h1>
          <p className="text-muted-foreground">Sync your progress across devices</p>
        </div>
      </div>

      {!isAuthenticated ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Please sign in to access cloud save features.</span>
            <LoginButton />
          </AlertDescription>
        </Alert>
      ) : (
        <SaveSlotsPanel />
      )}
    </div>
  );
}
