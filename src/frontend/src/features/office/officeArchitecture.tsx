import { useMemo } from 'react';
import * as THREE from 'three';
import type { WallFinishMode, WallSolidColor, WallpaperPattern, WoodFloorStyle } from './officeDecorOptions';
import { createWallMaterial, createFloorMaterial } from './officeMaterials';

interface RoomShellProps {
  floorSize: [number, number];
  wallFinishMode: WallFinishMode;
  wallSolidColor: WallSolidColor;
  wallpaperPattern: WallpaperPattern;
  woodFloorStyle: WoodFloorStyle;
}

export function RoomShell({
  floorSize,
  wallFinishMode,
  wallSolidColor,
  wallpaperPattern,
  woodFloorStyle,
}: RoomShellProps) {
  const [floorWidth, floorDepth] = floorSize;
  const wallHeight = 4;

  // Create materials with memoization to avoid recreating on every render
  const wallMaterial = useMemo(
    () => createWallMaterial(wallFinishMode, wallSolidColor, wallpaperPattern),
    [wallFinishMode, wallSolidColor, wallpaperPattern]
  );

  const floorMaterial = useMemo(
    () => createFloorMaterial(woodFloorStyle),
    [woodFloorStyle]
  );

  // Window and door materials
  const windowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6a8a9a',
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const windowFrameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3a3a3a',
        roughness: 0.4,
        metalness: 0.2,
      }),
    []
  );

  const doorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#5a4a3a',
        roughness: 0.5,
        metalness: 0.1,
      }),
    []
  );

  const doorHandleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8a8a8a',
        roughness: 0.2,
        metalness: 0.9,
      }),
    []
  );

  // Calculate positions based on floor size
  const backWallZ = -(floorDepth / 2);
  const leftWallX = -(floorWidth / 2);
  const rightWallX = floorWidth / 2;
  const frontWallZ = floorDepth / 2;

  // Window dimensions (scale with room size)
  const windowWidth = Math.min(2, floorWidth * 0.2);
  const windowHeight = 1.5;
  const windowY = 2;

  // Door dimensions
  const doorWidth = 1.2;
  const doorHeight = 2.4;
  const doorY = doorHeight / 2;

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} receiveShadow material={floorMaterial}>
        <boxGeometry args={[floorWidth, 0.1, floorDepth]} />
      </mesh>

      {/* Back wall */}
      <mesh
        position={[0, wallHeight / 2, backWallZ - 0.05]}
        receiveShadow
        castShadow
        material={wallMaterial}
      >
        <boxGeometry args={[floorWidth, wallHeight, 0.1]} />
      </mesh>

      {/* Left wall */}
      <mesh
        position={[leftWallX - 0.05, wallHeight / 2, 0]}
        receiveShadow
        castShadow
        material={wallMaterial}
      >
        <boxGeometry args={[0.1, wallHeight, floorDepth]} />
      </mesh>

      {/* Right wall with window */}
      <group>
        {/* Right wall main */}
        <mesh
          position={[rightWallX + 0.05, wallHeight / 2, 0]}
          receiveShadow
          castShadow
          material={wallMaterial}
        >
          <boxGeometry args={[0.1, wallHeight, floorDepth]} />
        </mesh>

        {/* Window on right wall */}
        <group position={[rightWallX + 0.1, windowY, 0]}>
          {/* Window glass */}
          <mesh material={windowMaterial} castShadow>
            <boxGeometry args={[0.05, windowHeight, windowWidth]} />
          </mesh>
          {/* Window frame */}
          <mesh position={[0, windowHeight / 2 + 0.05, 0]} material={windowFrameMaterial}>
            <boxGeometry args={[0.08, 0.1, windowWidth + 0.2]} />
          </mesh>
          <mesh position={[0, -(windowHeight / 2 + 0.05), 0]} material={windowFrameMaterial}>
            <boxGeometry args={[0.08, 0.1, windowWidth + 0.2]} />
          </mesh>
          <mesh position={[0, 0, windowWidth / 2 + 0.05]} material={windowFrameMaterial}>
            <boxGeometry args={[0.08, windowHeight + 0.2, 0.1]} />
          </mesh>
          <mesh position={[0, 0, -(windowWidth / 2 + 0.05)]} material={windowFrameMaterial}>
            <boxGeometry args={[0.08, windowHeight + 0.2, 0.1]} />
          </mesh>
        </group>
      </group>

      {/* Front wall (partial, with door opening) */}
      <group>
        {/* Left section of front wall */}
        <mesh
          position={[-(floorWidth / 4 + doorWidth / 4), wallHeight / 2, frontWallZ + 0.05]}
          receiveShadow
          castShadow
          material={wallMaterial}
        >
          <boxGeometry args={[floorWidth / 2 - doorWidth / 2, wallHeight, 0.1]} />
        </mesh>

        {/* Right section of front wall */}
        <mesh
          position={[floorWidth / 4 + doorWidth / 4, wallHeight / 2, frontWallZ + 0.05]}
          receiveShadow
          castShadow
          material={wallMaterial}
        >
          <boxGeometry args={[floorWidth / 2 - doorWidth / 2, wallHeight, 0.1]} />
        </mesh>

        {/* Top section above door */}
        <mesh
          position={[0, doorHeight + (wallHeight - doorHeight) / 2, frontWallZ + 0.05]}
          receiveShadow
          castShadow
          material={wallMaterial}
        >
          <boxGeometry args={[doorWidth, wallHeight - doorHeight, 0.1]} />
        </mesh>

        {/* Door */}
        <group position={[0, doorY, frontWallZ + 0.1]}>
          {/* Door panel */}
          <mesh material={doorMaterial} castShadow>
            <boxGeometry args={[doorWidth, doorHeight, 0.08]} />
          </mesh>
          {/* Door handle */}
          <mesh position={[doorWidth / 3, 0, 0.05]} rotation={[0, 0, Math.PI / 2]} material={doorHandleMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 0.15, 16]} />
          </mesh>
          {/* Door frame */}
          <mesh position={[0, doorHeight / 2 + 0.05, 0]} material={windowFrameMaterial}>
            <boxGeometry args={[doorWidth + 0.2, 0.1, 0.1]} />
          </mesh>
          <mesh position={[doorWidth / 2 + 0.05, 0, 0]} material={windowFrameMaterial}>
            <boxGeometry args={[0.1, doorHeight + 0.1, 0.1]} />
          </mesh>
          <mesh position={[-(doorWidth / 2 + 0.05), 0, 0]} material={windowFrameMaterial}>
            <boxGeometry args={[0.1, doorHeight + 0.1, 0.1]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
