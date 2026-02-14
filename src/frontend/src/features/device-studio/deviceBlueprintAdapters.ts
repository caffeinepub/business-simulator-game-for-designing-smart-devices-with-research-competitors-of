import type { DeviceBlueprint } from '../../backend';

export function createDefaultBlueprint(): DeviceBlueprint {
  return {
    category: { __kind__: 'singleCategory', singleCategory: 'smartphones' },
    name: 'New Device',
    price: BigInt(999),
    finalized: false,
    weight: BigInt(180),
    impedance: BigInt(32),
    comfortRating: 'Good',
    coating: 'Premium Glass',
    resistanceRating: 'IP68',
    technologyRatingSystem: 'TechCorp Standard',
    certifications: ['CE', 'FCC'],
    ports: ['USB-C'],
    wirelessPowerTransfer: ['Qi'],
    processingUnit: {
      name: 'TechCorp A15',
      cores: BigInt(8),
      coreType: 'Performance',
      clockSpeed: BigInt(3000),
      manufacturingYear: BigInt(2024),
      manufacturer: 'TechCorp',
      energyConsumption: BigInt(5),
      standards: ['ARM'],
      architecture: 'ARM64',
    },
    display: {
      displayType: 'OLED',
      details: 'High Resolution Display',
      manufacturer: 'TechCorp',
      width: BigInt(1080),
      height: BigInt(2400),
      frameRate: BigInt(120),
      brightness: BigInt(1000),
      energyConsumption: BigInt(3),
    },
    storages: [],
    rams: [],
    cameras: [
      {
        id: BigInt(1),
        type: 'Main',
        pixelResolution: '48MP',
        lensType: 'Wide',
        hasZoom: true,
        hasAutofocus: true,
      },
    ],
    motherboard: {
      sockets: ['CPU', 'RAM'],
      interfaces: ['PCIe', 'USB'],
    },
    battery: {
      type: 'Li-Ion',
      capacity: BigInt(4000),
      voltage: 3.7,
      connector: 'Internal',
      model: 'TechCorp Battery',
    },
    audioDevices: [
      {
        deviceType: 'Speaker',
        output: 'Stereo',
        isStereo: true,
        isWireless: false,
        manufacturer: 'TechCorp',
        description: 'High-quality audio',
      },
    ],
    connections: {
      wirelessConnections: [
        {
          connectionName: 'WiFi 6',
          maxUploadSpeed: BigInt(1200),
          maxDownloadSpeed: BigInt(1200),
          supportedStandards: ['802.11ax'],
        },
      ],
      smartConnections: [
        {
          manufacturer: 'TechCorp',
          standard: 'Bluetooth 5.2',
          transportProtocol: 'BLE',
          encryptionType: 'AES-256',
          interfaceType: 'Wireless',
          frequencyBand: '2.4GHz',
          rangeInMeters: BigInt(10),
          smartFeatures: ['Auto-connect'],
        },
      ],
      portConnections: [
        {
          portType: 'USB-C',
          count: BigInt(1),
          version: '3.2',
          manufacturer: 'TechCorp',
          physicalFormFactor: 'Type-C',
          supportedProtocols: ['USB', 'DisplayPort'],
          supportedStandards: ['USB 3.2'],
          compatibilityRequirements: [],
          features: ['Fast Charging', 'Data Transfer'],
          compatibility: ['Universal'],
        },
      ],
    },
    deviceSlots: [
      {
        slotType: 'SIM',
        version: 'Nano',
        maxCapacity: BigInt(2),
      },
    ],
    protection: {
      mechanisms: [
        {
          mechanismType: 'Screen Protection',
          material: 'Gorilla Glass',
          layerCount: BigInt(1),
          structuralFeatures: ['Scratch Resistant'],
          additionalFeatures: ['Oleophobic Coating'],
          fingerprintResistance: true,
          waterproofCertification: 'IP68',
        },
      ],
      protectionRating: 'IP68',
    },
    foldableCharacteristics: undefined,
  };
}
