import { Building2 } from 'lucide-react';
import OfficeUpgradePanel from '@/features/office/OfficeUpgradePanel';
import OfficeDecorPanel from '@/features/office/OfficeDecorPanel';
import Office3DViewer from '@/features/office/Office3DViewer';
import PageHeader from '@/components/layout/PageHeader';

export default function OfficePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Building2}
        title="Office Management"
        subtitle="Upgrade your headquarters and customize your workspace"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <OfficeUpgradePanel />
          <OfficeDecorPanel />
        </div>
        <div className="lg:col-span-2">
          <Office3DViewer />
        </div>
      </div>
    </div>
  );
}
