export interface PropDescriptor {
  type: 'desk' | 'chair' | 'monitor' | 'shelf' | 'plant' | 'cabinet' | 'wallArt';
  position: [number, number, number];
  rotation?: [number, number, number];
}

export interface OfficePreset {
  level: string;
  props: PropDescriptor[];
  floorSize: [number, number];
}

export const officeScenePresets: OfficePreset[] = [
  // Levels 1-2: Minimal startup
  {
    level: '1-2',
    floorSize: [8, 8],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
    ],
  },
  // Levels 3-4: Basic office
  {
    level: '3-4',
    floorSize: [8, 8],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-3, 0, -2] },
      { type: 'plant', position: [2.5, 0, 2] },
    ],
  },
  // Levels 5-6: Growing office
  {
    level: '5-6',
    floorSize: [8, 8],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-3, 0, -2] },
      { type: 'plant', position: [2.5, 0, 2] },
      { type: 'cabinet', position: [3, 0, -2] },
      { type: 'plant', position: [-2.5, 0, 2] },
    ],
  },
  // Levels 7-8: Established office
  {
    level: '7-8',
    floorSize: [8, 8],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-3, 0, -2] },
      { type: 'plant', position: [2.5, 0, 2] },
      { type: 'cabinet', position: [3, 0, -2] },
      { type: 'plant', position: [-2.5, 0, 2] },
      { type: 'wallArt', position: [0, 2, -3.85], rotation: [0, 0, 0] },
    ],
  },
  // Levels 9-10: Professional office
  {
    level: '9-10',
    floorSize: [10, 10],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-3.5, 0, -2.5] },
      { type: 'plant', position: [3, 0, 2.5] },
      { type: 'cabinet', position: [3.5, 0, -2.5] },
      { type: 'plant', position: [-3, 0, 2.5] },
      { type: 'wallArt', position: [0, 2, -4.85], rotation: [0, 0, 0] },
      { type: 'plant', position: [0, 0, 3.5] },
    ],
  },
  // Levels 11-12: Expanded office
  {
    level: '11-12',
    floorSize: [10, 10],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-3.5, 0, -2.5] },
      { type: 'plant', position: [3, 0, 2.5] },
      { type: 'cabinet', position: [3.5, 0, -2.5] },
      { type: 'plant', position: [-3, 0, 2.5] },
      { type: 'wallArt', position: [0, 2, -4.85], rotation: [0, 0, 0] },
      { type: 'plant', position: [0, 0, 3.5] },
      { type: 'shelf', position: [3.5, 0, 0] },
      { type: 'cabinet', position: [-3.5, 0, 0] },
    ],
  },
  // Levels 13-14: Executive office
  {
    level: '13-14',
    floorSize: [12, 12],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-4, 0, -3] },
      { type: 'plant', position: [3.5, 0, 3] },
      { type: 'cabinet', position: [4, 0, -3] },
      { type: 'plant', position: [-3.5, 0, 3] },
      { type: 'wallArt', position: [-2, 2, -5.85], rotation: [0, 0, 0] },
      { type: 'wallArt', position: [2, 2, -5.85], rotation: [0, 0, 0] },
      { type: 'plant', position: [0, 0, 4] },
      { type: 'shelf', position: [4, 0, 0] },
      { type: 'cabinet', position: [-4, 0, 0] },
      { type: 'plant', position: [4.5, 0, 3] },
    ],
  },
  // Levels 15-16: Premium office
  {
    level: '15-16',
    floorSize: [12, 12],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-4, 0, -3] },
      { type: 'plant', position: [3.5, 0, 3] },
      { type: 'cabinet', position: [4, 0, -3] },
      { type: 'plant', position: [-3.5, 0, 3] },
      { type: 'wallArt', position: [-2, 2, -5.85], rotation: [0, 0, 0] },
      { type: 'wallArt', position: [2, 2, -5.85], rotation: [0, 0, 0] },
      { type: 'plant', position: [0, 0, 4] },
      { type: 'shelf', position: [4, 0, 0] },
      { type: 'cabinet', position: [-4, 0, 0] },
      { type: 'plant', position: [4.5, 0, 3] },
      { type: 'plant', position: [-4.5, 0, 3] },
      { type: 'shelf', position: [-4, 0, 1.5] },
    ],
  },
  // Levels 17-18: Luxury office
  {
    level: '17-18',
    floorSize: [14, 14],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-4.5, 0, -3.5] },
      { type: 'plant', position: [4, 0, 3.5] },
      { type: 'cabinet', position: [4.5, 0, -3.5] },
      { type: 'plant', position: [-4, 0, 3.5] },
      { type: 'wallArt', position: [-2.5, 2, -6.85], rotation: [0, 0, 0] },
      { type: 'wallArt', position: [2.5, 2, -6.85], rotation: [0, 0, 0] },
      { type: 'plant', position: [0, 0, 4.5] },
      { type: 'shelf', position: [4.5, 0, 0] },
      { type: 'cabinet', position: [-4.5, 0, 0] },
      { type: 'plant', position: [5, 0, 3.5] },
      { type: 'plant', position: [-5, 0, 3.5] },
      { type: 'shelf', position: [-4.5, 0, 1.5] },
      { type: 'cabinet', position: [4.5, 0, 1.5] },
      { type: 'plant', position: [0, 0, -2] },
    ],
  },
  // Levels 19-20: Ultimate office
  {
    level: '19-20',
    floorSize: [14, 14],
    props: [
      { type: 'desk', position: [0, 0, 0] },
      { type: 'chair', position: [0, 0, 0.8] },
      { type: 'monitor', position: [0, 0, -0.3] },
      { type: 'shelf', position: [-4.5, 0, -3.5] },
      { type: 'plant', position: [4, 0, 3.5] },
      { type: 'cabinet', position: [4.5, 0, -3.5] },
      { type: 'plant', position: [-4, 0, 3.5] },
      { type: 'wallArt', position: [-2.5, 2, -6.85], rotation: [0, 0, 0] },
      { type: 'wallArt', position: [2.5, 2, -6.85], rotation: [0, 0, 0] },
      { type: 'wallArt', position: [0, 2.5, -6.85], rotation: [0, 0, 0] },
      { type: 'plant', position: [0, 0, 4.5] },
      { type: 'shelf', position: [4.5, 0, 0] },
      { type: 'cabinet', position: [-4.5, 0, 0] },
      { type: 'plant', position: [5, 0, 3.5] },
      { type: 'plant', position: [-5, 0, 3.5] },
      { type: 'shelf', position: [-4.5, 0, 1.5] },
      { type: 'cabinet', position: [4.5, 0, 1.5] },
      { type: 'plant', position: [0, 0, -2] },
      { type: 'plant', position: [2.5, 0, -2.5] },
      { type: 'plant', position: [-2.5, 0, -2.5] },
    ],
  },
];

export function getOfficeScenePresetForLevel(level: number): OfficePreset {
  // Deterministic preset selection based on level
  const clampedLevel = Math.max(1, Math.min(20, level));
  
  // Map level to preset index (2 levels per preset)
  const presetIndex = Math.min(Math.floor((clampedLevel - 1) / 2), officeScenePresets.length - 1);
  
  return officeScenePresets[presetIndex];
}
