import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  WallFinishMode,
  WallSolidColor,
  WallpaperPattern,
  WoodFloorStyle,
} from './officeDecorOptions';
import {
  defaultWallFinishMode,
  defaultWallSolidColor,
  defaultWallpaperPattern,
  defaultWoodFloorStyle,
} from './officeDecorOptions';

interface OfficeDecor {
  wallFinishMode: WallFinishMode;
  wallSolidColor: WallSolidColor;
  wallpaperPattern: WallpaperPattern;
  woodFloorStyle: WoodFloorStyle;
}

interface OfficeStore {
  level: number;
  upgradeCost: bigint;
  decor: OfficeDecor;
  upgrade: () => void;
  setWallFinishMode: (mode: WallFinishMode) => void;
  setWallSolidColor: (color: WallSolidColor) => void;
  setWallpaperPattern: (pattern: WallpaperPattern) => void;
  setWoodFloorStyle: (style: WoodFloorStyle) => void;
}

export const useOfficeStore = create<OfficeStore>()(
  persist(
    (set) => ({
      level: 1,
      upgradeCost: BigInt(10000),
      decor: {
        wallFinishMode: defaultWallFinishMode,
        wallSolidColor: defaultWallSolidColor,
        wallpaperPattern: defaultWallpaperPattern,
        woodFloorStyle: defaultWoodFloorStyle,
      },
      upgrade: () =>
        set((state) => ({
          level: Math.min(state.level + 1, 20),
          upgradeCost: BigInt(10000 * (state.level + 1) * (state.level + 1)),
        })),
      setWallFinishMode: (mode) =>
        set((state) => ({
          decor: { ...state.decor, wallFinishMode: mode },
        })),
      setWallSolidColor: (color) =>
        set((state) => ({
          decor: { ...state.decor, wallSolidColor: color },
        })),
      setWallpaperPattern: (pattern) =>
        set((state) => ({
          decor: { ...state.decor, wallpaperPattern: pattern },
        })),
      setWoodFloorStyle: (style) =>
        set((state) => ({
          decor: { ...state.decor, woodFloorStyle: style },
        })),
    }),
    {
      name: 'office-storage',
    }
  )
);
