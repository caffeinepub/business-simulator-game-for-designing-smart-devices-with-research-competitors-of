import { Building2 } from 'lucide-react';
import OfficeUpgradePanel from '@/features/office/OfficeUpgradePanel';
import Office3DViewer from '@/features/office/Office3DViewer';

export default function OfficePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Office Management</h1>
          <p className="text-muted-foreground">Upgrade your headquarters to boost productivity</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <OfficeUpgradePanel />
        </div>
        <div className="lg:col-span-2">
          <Office3DViewer />
        </div>
      </div>
    </div>
  );
}
