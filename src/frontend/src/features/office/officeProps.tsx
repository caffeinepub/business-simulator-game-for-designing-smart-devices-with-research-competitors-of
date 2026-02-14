import { useRef } from 'react';
import { Mesh } from 'three';

interface PropStyle {
  woodColor?: string;
  metalColor?: string;
  fabricColor?: string;
  screenColor?: string;
  accentColor?: string;
}

interface DeskProps {
  position: [number, number, number];
  style?: PropStyle;
}

export function Desk({ position, style = {} }: DeskProps) {
  const {
    woodColor = '#8b7355',
    metalColor = '#505050',
  } = style;

  return (
    <group position={position}>
      {/* Desktop surface */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[2.4, 0.08, 1.2]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Left leg */}
      <mesh position={[-1, 0.375, -0.5]} castShadow>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Right leg */}
      <mesh position={[1, 0.375, -0.5]} castShadow>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Front left leg */}
      <mesh position={[-1, 0.375, 0.5]} castShadow>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Front right leg */}
      <mesh position={[1, 0.375, 0.5]} castShadow>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Drawer */}
      <mesh position={[0.8, 0.5, -0.5]} castShadow>
        <boxGeometry args={[0.6, 0.2, 0.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.5} metalness={0.1} />
      </mesh>
      
      {/* Drawer handle */}
      <mesh position={[0.8, 0.5, -0.3]} castShadow>
        <boxGeometry args={[0.15, 0.03, 0.03]} />
        <meshStandardMaterial color={metalColor} roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

interface ChairProps {
  position: [number, number, number];
  style?: PropStyle;
}

export function Chair({ position, style = {} }: ChairProps) {
  const {
    fabricColor = '#2a2a3a',
    metalColor = '#404040',
  } = style;

  return (
    <group position={position}>
      {/* Seat */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color={fabricColor} roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Backrest */}
      <mesh position={[0, 0.8, -0.2]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.08]} />
        <meshStandardMaterial color={fabricColor} roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Center pole */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Base star - 5 legs */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.25;
        const z = Math.sin(rad) * 0.25;
        return (
          <mesh key={i} position={[x, 0.02, z]} rotation={[0, rad, 0]} castShadow>
            <boxGeometry args={[0.3, 0.04, 0.06]} />
            <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

interface MonitorProps {
  position: [number, number, number];
  style?: PropStyle;
  emissiveIntensity?: number;
}

export function Monitor({ position, style = {}, emissiveIntensity = 0.3 }: MonitorProps) {
  const {
    metalColor = '#1a1a1a',
    screenColor = '#0a4a6a',
  } = style;

  return (
    <group position={position}>
      {/* Monitor stand base */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 16]} />
        <meshStandardMaterial color={metalColor} roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Monitor stand pole */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.24, 8]} />
        <meshStandardMaterial color={metalColor} roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Monitor frame */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.04]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Monitor screen */}
      <mesh position={[0, 1.15, 0.021]}>
        <boxGeometry args={[0.55, 0.35, 0.01]} />
        <meshStandardMaterial 
          color={screenColor} 
          emissive={screenColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.2} 
          metalness={0.1} 
        />
      </mesh>
    </group>
  );
}

interface ShelfProps {
  position: [number, number, number];
  style?: PropStyle;
}

export function Shelf({ position, style = {} }: ShelfProps) {
  const {
    woodColor = '#6b5d4f',
  } = style;

  return (
    <group position={position}>
      {/* Bottom shelf */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Middle shelf */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Top shelf */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Left side */}
      <mesh position={[-0.575, 0.8, 0]} castShadow>
        <boxGeometry args={[0.05, 1.6, 0.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Right side */}
      <mesh position={[0.575, 0.8, 0]} castShadow>
        <boxGeometry args={[0.05, 1.6, 0.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Back panel */}
      <mesh position={[0, 0.8, -0.175]} castShadow>
        <boxGeometry args={[1.2, 1.6, 0.05]} />
        <meshStandardMaterial color={woodColor} roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  );
}

interface PlantProps {
  position: [number, number, number];
  style?: PropStyle;
}

export function Plant({ position, style = {} }: PlantProps) {
  const {
    accentColor = '#2d5a2d',
  } = style;

  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.3, 12]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Soil */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.02, 12]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} metalness={0.0} />
      </mesh>
      
      {/* Plant leaves - multiple spheres */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} metalness={0.0} />
      </mesh>
      
      <mesh position={[0.08, 0.5, 0.05]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} metalness={0.0} />
      </mesh>
      
      <mesh position={[-0.08, 0.48, -0.05]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} metalness={0.0} />
      </mesh>
    </group>
  );
}

interface FilingCabinetProps {
  position: [number, number, number];
  style?: PropStyle;
}

export function FilingCabinet({ position, style = {} }: FilingCabinetProps) {
  const {
    metalColor = '#5a5a5a',
  } = style;

  return (
    <group position={position}>
      {/* Cabinet body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, 1.0, 0.6]} />
        <meshStandardMaterial color={metalColor} roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Top drawer */}
      <mesh position={[0, 0.75, 0.31]} castShadow>
        <boxGeometry args={[0.45, 0.22, 0.02]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Middle drawer */}
      <mesh position={[0, 0.5, 0.31]} castShadow>
        <boxGeometry args={[0.45, 0.22, 0.02]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Bottom drawer */}
      <mesh position={[0, 0.25, 0.31]} castShadow>
        <boxGeometry args={[0.45, 0.22, 0.02]} />
        <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Drawer handles */}
      {[0.75, 0.5, 0.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0.32]} castShadow>
          <boxGeometry args={[0.12, 0.03, 0.03]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

interface WallArtProps {
  position: [number, number, number];
  style?: PropStyle;
}

export function WallArt({ position, style = {} }: WallArtProps) {
  const {
    accentColor = '#4a6a8a',
  } = style;

  return (
    <group position={position}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Art canvas */}
      <mesh position={[0, 0, 0.026]}>
        <boxGeometry args={[1.1, 0.7, 0.01]} />
        <meshStandardMaterial color={accentColor} roughness={0.6} metalness={0.0} />
      </mesh>
      
      {/* Abstract art elements */}
      <mesh position={[-0.2, 0.1, 0.032]}>
        <boxGeometry args={[0.3, 0.3, 0.01]} />
        <meshStandardMaterial color="#6a8aaa" roughness={0.5} metalness={0.0} />
      </mesh>
      
      <mesh position={[0.25, -0.15, 0.032]}>
        <boxGeometry args={[0.4, 0.2, 0.01]} />
        <meshStandardMaterial color="#3a5a7a" roughness={0.5} metalness={0.0} />
      </mesh>
    </group>
  );
}
