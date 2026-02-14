import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { generateLogoSVG, defaultLogoConfig, type LogoConfig } from './logoGenerator';

interface LogoCreatorProps {
  value: string;
  onChange: (svg: string) => void;
  defaultText?: string;
  label?: string;
}

export default function LogoCreator({ value, onChange, defaultText = '', label = 'Logo' }: LogoCreatorProps) {
  const [config, setConfig] = useState<LogoConfig>(() => {
    if (value) {
      // Try to preserve existing logo
      return { ...defaultLogoConfig, text: defaultText };
    }
    return { ...defaultLogoConfig, text: defaultText };
  });

  useEffect(() => {
    if (config.text) {
      const svg = generateLogoSVG(config);
      onChange(svg);
    }
  }, [config]);

  const handleReset = () => {
    const resetConfig = { ...defaultLogoConfig, text: defaultText };
    setConfig(resetConfig);
  };

  const updateConfig = (updates: Partial<LogoConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const previewSvg = config.text ? generateLogoSVG(config) : value;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logoText">Text</Label>
            <Input
              id="logoText"
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              placeholder="Enter text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoShape">Shape</Label>
            <Select value={config.shape} onValueChange={(v) => updateConfig({ shape: v as LogoConfig['shape'] })}>
              <SelectTrigger id="logoShape">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="hexagon">Hexagon</SelectItem>
                <SelectItem value="triangle">Triangle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={config.primaryColor}
                onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                className="w-16 h-10 p-1"
              />
              <Input
                value={config.primaryColor}
                onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondaryColor"
                type="color"
                value={config.secondaryColor}
                onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                className="w-16 h-10 p-1"
              />
              <Input
                value={config.secondaryColor}
                onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                placeholder="#60a5fa"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={config.textColor}
                onChange={(e) => updateConfig({ textColor: e.target.value })}
                className="w-16 h-10 p-1"
              />
              <Input
                value={config.textColor}
                onChange={(e) => updateConfig({ textColor: e.target.value })}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/30">
            {previewSvg ? (
              <div dangerouslySetInnerHTML={{ __html: previewSvg }} className="w-32 h-32" />
            ) : (
              <p className="text-sm text-muted-foreground">Preview</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
