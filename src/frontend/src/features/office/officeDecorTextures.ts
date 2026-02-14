import * as THREE from 'three';
import type { WallpaperPattern, WoodFloorStyle } from './officeDecorOptions';

// Procedural wallpaper texture generation
export function createWallpaperTexture(pattern: WallpaperPattern): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return new THREE.Texture();
  }

  // Base color
  ctx.fillStyle = '#3a3a3a';
  ctx.fillRect(0, 0, 512, 512);

  // Pattern overlay
  ctx.strokeStyle = '#4a4a4a';
  ctx.lineWidth = 2;

  switch (pattern) {
    case 'geometric':
      // Diamond pattern
      for (let y = 0; y < 512; y += 64) {
        for (let x = 0; x < 512; x += 64) {
          ctx.beginPath();
          ctx.moveTo(x + 32, y);
          ctx.lineTo(x + 64, y + 32);
          ctx.lineTo(x + 32, y + 64);
          ctx.lineTo(x, y + 32);
          ctx.closePath();
          ctx.stroke();
        }
      }
      break;

    case 'subtle-lines':
      // Horizontal lines
      for (let y = 0; y < 512; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      break;

    case 'modern-grid':
      // Grid pattern
      for (let i = 0; i < 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }
      break;

    case 'organic-waves':
      // Wave pattern
      ctx.lineWidth = 3;
      for (let y = 0; y < 512; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < 512; x += 8) {
          const wave = Math.sin(x / 32) * 8;
          ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.anisotropy = 4;
  texture.needsUpdate = true;

  return texture;
}

// Procedural wood floor texture generation
export function createWoodFloorTexture(style: WoodFloorStyle): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return new THREE.Texture();
  }

  // Base wood colors by style
  const baseColors: Record<WoodFloorStyle, string> = {
    'light-oak': '#c9a876',
    'medium-walnut': '#7a5c3e',
    'dark-mahogany': '#4a2f1f',
    'natural-maple': '#d4b896',
    'rustic-pine': '#9a7a5a',
  };

  const grainColors: Record<WoodFloorStyle, string> = {
    'light-oak': '#b89860',
    'medium-walnut': '#5a3c2e',
    'dark-mahogany': '#2a1f1f',
    'natural-maple': '#c4a886',
    'rustic-pine': '#7a5a3a',
  };

  const baseColor = baseColors[style];
  const grainColor = grainColors[style];

  // Fill base
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  // Draw wood planks
  const plankHeight = 64;
  for (let y = 0; y < 512; y += plankHeight) {
    // Plank separator
    ctx.fillStyle = grainColor;
    ctx.fillRect(0, y, 512, 2);

    // Wood grain lines
    ctx.strokeStyle = grainColor;
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const grainY = y + Math.random() * plankHeight;
      const grainOffset = Math.random() * 20 - 10;
      ctx.beginPath();
      ctx.moveTo(0, grainY);
      for (let x = 0; x < 512; x += 32) {
        const wave = Math.sin(x / 64 + i) * 3 + grainOffset;
        ctx.lineTo(x, grainY + wave);
      }
      ctx.stroke();
    }

    // Vertical plank separators (random positions)
    for (let i = 0; i < 2; i++) {
      const x = Math.random() * 512;
      ctx.fillRect(x, y, 2, plankHeight);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}
