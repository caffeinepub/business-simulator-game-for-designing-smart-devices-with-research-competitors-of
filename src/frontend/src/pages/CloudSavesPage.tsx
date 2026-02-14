import { Cloud } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import SaveSlotsPanel from '@/features/cloud-saves/SaveSlotsPanel';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import LoginButton from '@/components/auth/LoginButton';
import PageHeader from '@/components/layout/PageHeader';

export default function CloudSavesPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Cloud}
        title="Cloud Saves"
        subtitle="Sync your progress across devices"
      />

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
