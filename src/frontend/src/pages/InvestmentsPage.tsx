import { Briefcase } from 'lucide-react';
import InvestmentsActionsPanel from '@/features/investments/InvestmentsActionsPanel';
import InvestmentsLog from '@/features/investments/InvestmentsLog';
import StoreNetworkSummaryPanel from '@/features/stores/StoreNetworkSummaryPanel';
import PageHeader from '@/components/layout/PageHeader';

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Briefcase}
        title="Investments"
        subtitle="Grow your business through strategic investments"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <InvestmentsActionsPanel />
          <StoreNetworkSummaryPanel />
        </div>
        <div className="lg:col-span-1">
          <InvestmentsLog />
        </div>
      </div>
    </div>
  );
}
