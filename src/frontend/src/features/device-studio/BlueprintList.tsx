import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetAllDeviceBlueprints } from '@/hooks/useQueries';
import { Rocket } from 'lucide-react';
import { useState } from 'react';
import ReleaseProductModal from '../products/ReleaseProductModal';

interface BlueprintListProps {
  onEdit: (id: number) => void;
}

export default function BlueprintList({ onEdit }: BlueprintListProps) {
  const { data: blueprints, isLoading } = useGetAllDeviceBlueprints();
  const [releaseBlueprint, setReleaseBlueprint] = useState<any>(null);

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading blueprints...</div>;
  }

  if (!blueprints || blueprints.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No blueprints yet. Create your first device!</p>
        </CardContent>
      </Card>
    );
  }

  const getCategoryIcon = (category: string) => {
    if (category === 'foldables') {
      return (
        <img 
          src="/assets/generated/foldable-icon.dim_128x128.png"
          alt="Foldable"
          className="w-4 h-4 inline-block mr-1"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blueprints.map((blueprint, index) => {
          const category =
            blueprint.category.__kind__ === 'singleCategory'
              ? blueprint.category.singleCategory
              : blueprint.category.categoryList[0];

          const isFoldable = category === 'foldables';

          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{blueprint.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      {getCategoryIcon(category)}
                      {category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU Cores:</span>
                    <span className="font-medium">{blueprint.processingUnit.cores.toString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span className="font-medium">{blueprint.rams[0]?.capacity.toString() || '0'} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium">{blueprint.storages[0]?.capacity.toString() || '0'} GB</span>
                  </div>
                  {isFoldable && blueprint.foldableCharacteristics && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fold Type:</span>
                        <span className="font-medium capitalize">{blueprint.foldableCharacteristics.foldType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hinge:</span>
                        <span className="font-medium capitalize">{blueprint.foldableCharacteristics.hingeType}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">${blueprint.price.toString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setReleaseBlueprint(blueprint)}>
                    <Rocket className="h-4 w-4 mr-1" />
                    Release
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {releaseBlueprint && (
        <ReleaseProductModal blueprint={releaseBlueprint} onClose={() => setReleaseBlueprint(null)} />
      )}
    </>
  );
}
