import { FlaskConical } from 'lucide-react';
import ResearchList from '@/features/research/ResearchList';
import PageHeader from '@/components/layout/PageHeader';

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={FlaskConical}
        title="Research & Development"
        subtitle="Unlock new technologies to enhance your devices"
      />

      <ResearchList />
    </div>
  );
}
