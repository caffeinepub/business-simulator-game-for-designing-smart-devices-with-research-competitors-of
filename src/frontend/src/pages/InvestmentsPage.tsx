import { Briefcase } from 'lucide-react';
import InvestmentsActionsPanel from '@/features/investments/InvestmentsActionsPanel';
import InvestmentsLog from '@/features/investments/InvestmentsLog';

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Briefcase className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Investments</h1>
          <p className="text-muted-foreground">Grow your business through strategic investments</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <InvestmentsActionsPanel />
        </div>
        <div className="lg:col-span-1">
          <InvestmentsLog />
        </div>
      </div>
    </div>
  );
}
