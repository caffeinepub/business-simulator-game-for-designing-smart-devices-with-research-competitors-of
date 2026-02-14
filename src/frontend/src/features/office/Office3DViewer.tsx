import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOfficeStore } from './officeStore';
import { getOfficeScenePresetForLevel } from './officeScenePresets';
import { getLightingForLevel, getColorPaletteForLevel } from './officeMaterials';
import { getMonitorFlickerIntensity, getLightPulseIntensity } from './officeAnimations';
import { Desk, Chair, Monitor, Shelf, Plant, FilingCabinet, WallArt } from './officeProps';
import { RoomShell } from './officeArchitecture';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function OfficeScene() {
  const { level, decor } = useOfficeStore();
  const preset = getOfficeScenePresetForLevel(level);
  const lighting = getLightingForLevel(level);
  const colors = getColorPaletteForLevel(level);
  
  const [monitorIntensity, setMonitorIntensity] = useState(0.3);
  const [keyLightIntensity, setKeyLightIntensity] = useState(lighting.keyLightIntensity);
  
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  
  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate monitor screen flicker
    setMonitorIntensity(getMonitorFlickerIntensity(time));
    
    // Animate key light pulse
    setKeyLightIntensity(getLightPulseIntensity(time, lighting.keyLightIntensity));
  });

  return (
    <>
      {/* Lighting setup with shadows */}
      <ambientLight intensity={lighting.ambientIntensity} />
      
      {/* Key light (main directional) */}
      <directionalLight
        ref={keyLightRef}
        position={[10, 12, 8]}
        intensity={keyLightIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light (softer, opposite side) */}
      <directionalLight
        position={[-8, 8, -6]}
        intensity={lighting.fillLightIntensity}
        color="#b0c4de"
      />
      
      {/* Rim light (back highlight) */}
      <pointLight
        position={[0, 10, -8]}
        intensity={lighting.rimLightIntensity}
        color="#ffeedd"
      />
      
      {/* Subtle ambient fill from below */}
      <hemisphereLight
        args={['#ffffff', '#444444', 0.2]}
      />

      {/* Room shell with floor, walls, windows, and door */}
      <RoomShell
        floorSize={preset.floorSize}
        wallFinishMode={decor.wallFinishMode}
        wallSolidColor={decor.wallSolidColor}
        wallpaperPattern={decor.wallpaperPattern}
        woodFloorStyle={decor.woodFloorStyle}
      />

      {/* Render all props from preset */}
      {preset.props.map((prop, index) => {
        const style = {
          woodColor: colors.wood,
          metalColor: colors.metal,
          fabricColor: colors.fabric,
          screenColor: colors.screen,
          accentColor: colors.accent,
        };

        switch (prop.type) {
          case 'desk':
            return <Desk key={index} position={prop.position} style={style} />;
          case 'chair':
            return <Chair key={index} position={prop.position} style={style} />;
          case 'monitor':
            return (
              <Monitor
                key={index}
                position={prop.position}
                style={style}
                emissiveIntensity={monitorIntensity}
              />
            );
          case 'shelf':
            return <Shelf key={index} position={prop.position} style={style} />;
          case 'plant':
            return <Plant key={index} position={prop.position} style={style} />;
          case 'cabinet':
            return <FilingCabinet key={index} position={prop.position} style={style} />;
          case 'wallArt':
            return <WallArt key={index} position={prop.position} style={style} />;
          default:
            return null;
        }
      })}
    </>
  );
}

export default function Office3DViewer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Office View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[10, 8, 10]} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={25}
              maxPolarAngle={Math.PI / 2.1}
            />
            <OfficeScene />
          </Canvas>
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          Use mouse to rotate, zoom, and pan the office view
        </p>
      </CardContent>
    </Card>
  );
}
