import * as THREE from 'three';
import type { WallFinishMode, WallSolidColor, WoodFloorStyle } from './officeDecorOptions';
import { wallSolidColors } from './officeDecorOptions';
import { createWallpaperTexture, createWoodFloorTexture } from './officeDecorTextures';

export interface MaterialPreset {
  roughness: number;
  metalness: number;
  emissive?: string;
  emissiveIntensity?: number;
}

export const materialPresets = {
  wood: {
    roughness: 0.6,
    metalness: 0.1,
  },
  metal: {
    roughness: 0.3,
    metalness: 0.8,
  },
  fabric: {
    roughness: 0.8,
    metalness: 0.0,
  },
  screen: {
    roughness: 0.2,
    metalness: 0.1,
  },
  floor: {
    roughness: 0.7,
    metalness: 0.0,
  },
  wall: {
    roughness: 0.8,
    metalness: 0.0,
  },
};

export interface LightingConfig {
  ambientIntensity: number;
  keyLightIntensity: number;
  fillLightIntensity: number;
  rimLightIntensity: number;
}

export function getLightingForLevel(level: number): LightingConfig {
  // Progressive lighting improvement with office level
  const baseAmbient = 0.3;
  const baseKey = 0.6;
  const baseFill = 0.3;
  const baseRim = 0.2;
  
  const progression = Math.min(level / 20, 1);
  
  return {
    ambientIntensity: baseAmbient + progression * 0.3,
    keyLightIntensity: baseKey + progression * 0.4,
    fillLightIntensity: baseFill + progression * 0.2,
    rimLightIntensity: baseRim + progression * 0.3,
  };
}

export interface ColorPalette {
  wood: string;
  metal: string;
  fabric: string;
  screen: string;
  accent: string;
  floor: string;
  wall: string;
}

export function getColorPaletteForLevel(level: number): ColorPalette {
  // Color palettes evolve with office level
  const palettes: ColorPalette[] = [
    // Levels 1-4: Basic office
    {
      wood: '#7a6a5a',
      metal: '#4a4a4a',
      fabric: '#2a2a3a',
      screen: '#0a3a5a',
      accent: '#2d4a2d',
      floor: '#3a3a3a',
      wall: '#2a2a2a',
    },
    // Levels 5-8: Improved office
    {
      wood: '#8b7355',
      metal: '#505050',
      fabric: '#2a2a4a',
      screen: '#0a4a6a',
      accent: '#2d5a2d',
      floor: '#4a4a4a',
      wall: '#2a2a2a',
    },
    // Levels 9-12: Professional office
    {
      wood: '#9b8365',
      metal: '#5a5a5a',
      fabric: '#2a3a5a',
      screen: '#0a5a7a',
      accent: '#3d6a3d',
      floor: '#5a5a5a',
      wall: '#2a2a2a',
    },
    // Levels 13-16: Executive office
    {
      wood: '#ab9375',
      metal: '#6a6a6a',
      fabric: '#3a4a6a',
      screen: '#0a6a8a',
      accent: '#4d7a4d',
      floor: '#6a6a6a',
      wall: '#2a2a2a',
    },
    // Levels 17-20: Luxury office
    {
      wood: '#bba385',
      metal: '#7a7a7a',
      fabric: '#4a5a7a',
      screen: '#0a7a9a',
      accent: '#5d8a5d',
      floor: '#7a7a7a',
      wall: '#2a2a2a',
    },
  ];
  
  const index = Math.min(Math.floor((level - 1) / 4), 4);
  return palettes[index];
}

// Create wall material based on decor settings
export function createWallMaterial(
  mode: WallFinishMode,
  solidColor: WallSolidColor,
  wallpaperPattern: string
): THREE.MeshStandardMaterial {
  if (mode === 'solid') {
    const colorOption = wallSolidColors.find((c) => c.id === solidColor);
    const color = colorOption ? colorOption.color : '#4a4540';
    return new THREE.MeshStandardMaterial({
      color,
      roughness: 0.8,
      metalness: 0.0,
    });
  } else {
    const texture = createWallpaperTexture(wallpaperPattern as any);
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.0,
    });
  }
}

// Create floor material based on wood style
export function createFloorMaterial(style: WoodFloorStyle): THREE.MeshStandardMaterial {
  const texture = createWoodFloorTexture(style);
  return new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.7,
    metalness: 0.0,
  });
}
