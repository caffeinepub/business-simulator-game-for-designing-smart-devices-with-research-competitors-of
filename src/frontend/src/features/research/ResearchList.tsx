import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Lock, CheckCircle2 } from 'lucide-react';
import { useGetAllTechnologies } from '@/hooks/useQueries';
import { techDataset } from './techDataset';
import ResearchDetailsPanel from './ResearchDetailsPanel';

export default function ResearchList() {
  const { data: backendTechs } = useGetAllTechnologies();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTech, setSelectedTech] = useState<any>(null);

  const technologies = backendTechs && backendTechs.length > 0 ? backendTechs : techDataset;

  const categories = useMemo(() => {
    const cats = new Set(technologies.map((t) => t.category));
    return ['all', ...Array.from(cats)];
  }, [technologies]);

  const filteredTechs = useMemo(() => {
    return technologies.filter((tech) => {
      const matchesSearch = tech.researchName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || tech.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [technologies, searchQuery, categoryFilter]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-3">
          {filteredTechs.slice(0, 50).map((tech) => {
            const isCompleted = tech.isCompleted;
            const isLocked = tech.requirements?.researchedTechnologies && tech.requirements.researchedTechnologies.length > 0;

            return (
              <Card
                key={tech.researchId}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => setSelectedTech(tech)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{tech.researchName}</h3>
                        {isCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                        {isLocked && !isCompleted && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{tech.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {tech.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">${tech.cost.toString()}</span>
                        <span className="text-xs text-muted-foreground">{tech.researchTime.toString()} days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTechs.length > 50 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            Showing 50 of {filteredTechs.length} technologies
          </p>
        )}
      </div>

      <div className="lg:col-span-1">
        {selectedTech ? (
          <ResearchDetailsPanel technology={selectedTech} onClose={() => setSelectedTech(null)} />
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Select a technology to view details</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
