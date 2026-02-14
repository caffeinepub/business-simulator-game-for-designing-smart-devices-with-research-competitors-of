import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOfficeStore } from './officeStore';
import { officeScenePresets } from './officeScenePresets';

function OfficeScene() {
  const { level } = useOfficeStore();
  const preset = officeScenePresets[Math.min(Math.floor((level - 1) / 4), 4)];

  return (
    <>
      <ambientLight intensity={preset.ambientLight} />
      <directionalLight position={[10, 10, 5]} intensity={preset.directionalLight} />
      <pointLight position={[-10, 10, -10]} intensity={0.3} />

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.1, 8]} />
        <meshStandardMaterial color={preset.floorColor} />
      </mesh>

      {preset.furniture.map((item, index) => (
        <mesh key={index} position={item.position}>
          <boxGeometry args={item.size} />
          <meshStandardMaterial color={item.color} />
        </mesh>
      ))}

      <mesh position={[0, 2, -3.9]}>
        <boxGeometry args={[7.8, 4, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </>
  );
}

export default function Office3DViewer() {
  const { level } = useOfficeStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Office View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <Canvas>
            <PerspectiveCamera makeDefault position={[8, 6, 8]} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
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
