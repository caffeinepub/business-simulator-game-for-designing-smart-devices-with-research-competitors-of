// Office decor option definitions with curated selections

export type WallFinishMode = 'solid' | 'wallpaper';

export type WallSolidColor = 'warm-gray' | 'cool-gray' | 'beige' | 'light-blue' | 'sage-green';

export type WallpaperPattern = 'geometric' | 'subtle-lines' | 'modern-grid' | 'organic-waves';

export type WoodFloorStyle = 'light-oak' | 'medium-walnut' | 'dark-mahogany' | 'natural-maple' | 'rustic-pine';

export interface WallFinishOption {
  id: WallSolidColor;
  label: string;
  color: string;
}

export interface WallpaperOption {
  id: WallpaperPattern;
  label: string;
}

export interface WoodFloorOption {
  id: WoodFloorStyle;
  label: string;
}

export const wallSolidColors: WallFinishOption[] = [
  { id: 'warm-gray', label: 'Warm Gray', color: '#4a4540' },
  { id: 'cool-gray', label: 'Cool Gray', color: '#3a3f45' },
  { id: 'beige', label: 'Beige', color: '#5a5248' },
  { id: 'light-blue', label: 'Light Blue', color: '#3a4550' },
  { id: 'sage-green', label: 'Sage Green', color: '#3f4a40' },
];

export const wallpaperPatterns: WallpaperOption[] = [
  { id: 'geometric', label: 'Geometric' },
  { id: 'subtle-lines', label: 'Subtle Lines' },
  { id: 'modern-grid', label: 'Modern Grid' },
  { id: 'organic-waves', label: 'Organic Waves' },
];

export const woodFloorStyles: WoodFloorOption[] = [
  { id: 'light-oak', label: 'Light Oak' },
  { id: 'medium-walnut', label: 'Medium Walnut' },
  { id: 'dark-mahogany', label: 'Dark Mahogany' },
  { id: 'natural-maple', label: 'Natural Maple' },
  { id: 'rustic-pine', label: 'Rustic Pine' },
];

// Safe defaults
export const defaultWallFinishMode: WallFinishMode = 'solid';
export const defaultWallSolidColor: WallSolidColor = 'warm-gray';
export const defaultWallpaperPattern: WallpaperPattern = 'geometric';
export const defaultWoodFloorStyle: WoodFloorStyle = 'medium-walnut';
