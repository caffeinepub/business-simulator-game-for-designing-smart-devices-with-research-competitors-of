import { FlaskConical } from 'lucide-react';
import ResearchList from '@/features/research/ResearchList';

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FlaskConical className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Research & Development</h1>
          <p className="text-muted-foreground">Unlock new technologies to enhance your devices</p>
        </div>
      </div>

      <ResearchList />
    </div>
  );
}
