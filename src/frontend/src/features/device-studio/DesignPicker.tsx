import { Card, CardContent } from '@/components/ui/card';
import { designCatalog } from './designCatalog';
import { Badge } from '@/components/ui/badge';

interface DesignPickerProps {
  category: string;
  selectedDesign: string;
  onSelectDesign: (designId: string) => void;
}

export default function DesignPicker({ category, selectedDesign, onSelectDesign }: DesignPickerProps) {
  const designs = designCatalog[category] || [];

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden border">
        <img
          src="/assets/generated/device-design-sheet.dim_1600x900.png"
          alt="Design Preview"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-4">
          <div>
            <h3 className="text-lg font-semibold">Design Preview</h3>
            <p className="text-sm text-muted-foreground">Selected: {selectedDesign}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {designs.map((design) => (
          <Card
            key={design.id}
            className={`cursor-pointer transition-all hover:border-primary ${
              selectedDesign === design.id ? 'border-primary ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelectDesign(design.id)}
          >
            <CardContent className="p-4 space-y-2">
              <div className="aspect-video bg-muted rounded flex items-center justify-center">
                <span className="text-4xl">{design.icon}</span>
              </div>
              <div>
                <p className="font-medium text-sm">{design.name}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {design.style}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
