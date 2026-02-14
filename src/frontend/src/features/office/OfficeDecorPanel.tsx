import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOfficeStore } from './officeStore';
import {
  wallSolidColors,
  wallpaperPatterns,
  woodFloorStyles,
  type WallFinishMode,
  type WallSolidColor,
  type WallpaperPattern,
  type WoodFloorStyle,
} from './officeDecorOptions';
import { Paintbrush, Wallpaper, Layers } from 'lucide-react';

export default function OfficeDecorPanel() {
  const {
    decor,
    setWallFinishMode,
    setWallSolidColor,
    setWallpaperPattern,
    setWoodFloorStyle,
  } = useOfficeStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paintbrush className="h-5 w-5" />
          Office Decor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wall Finish Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Wall Finish</Label>
          <Tabs
            value={decor.wallFinishMode}
            onValueChange={(value) => setWallFinishMode(value as WallFinishMode)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="solid" className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4" />
                Solid Color
              </TabsTrigger>
              <TabsTrigger value="wallpaper" className="flex items-center gap-2">
                <Wallpaper className="h-4 w-4" />
                Wallpaper
              </TabsTrigger>
            </TabsList>

            <TabsContent value="solid" className="space-y-3 mt-4">
              <Label className="text-sm text-muted-foreground">Select Wall Color</Label>
              <RadioGroup
                value={decor.wallSolidColor}
                onValueChange={(value) => setWallSolidColor(value as WallSolidColor)}
              >
                {wallSolidColors.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={`color-${option.id}`} />
                    <Label
                      htmlFor={`color-${option.id}`}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div
                        className="w-8 h-8 rounded border-2 border-border"
                        style={{ backgroundColor: option.color }}
                      />
                      <span>{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </TabsContent>

            <TabsContent value="wallpaper" className="space-y-3 mt-4">
              <Label className="text-sm text-muted-foreground">Select Wallpaper Pattern</Label>
              <RadioGroup
                value={decor.wallpaperPattern}
                onValueChange={(value) => setWallpaperPattern(value as WallpaperPattern)}
              >
                {wallpaperPatterns.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={`wallpaper-${option.id}`} />
                    <Label
                      htmlFor={`wallpaper-${option.id}`}
                      className="cursor-pointer flex-1"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </TabsContent>
          </Tabs>
        </div>

        {/* Floor Style Selection */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Wood Floor Style
          </Label>
          <RadioGroup
            value={decor.woodFloorStyle}
            onValueChange={(value) => setWoodFloorStyle(value as WoodFloorStyle)}
          >
            {woodFloorStyles.map((option) => (
              <div key={option.id} className="flex items-center space-x-3">
                <RadioGroupItem value={option.id} id={`floor-${option.id}`} />
                <Label htmlFor={`floor-${option.id}`} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
