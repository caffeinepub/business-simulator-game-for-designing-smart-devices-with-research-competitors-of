import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SavedGame {
    saveId: string;
    name: string;
    lastModified: bigint;
    gameState: GameState;
}
export type DeviceCategory = {
    __kind__: "singleCategory";
    singleCategory: string;
} | {
    __kind__: "categoryList";
    categoryList: Array<string>;
};
export interface Requirements {
    cash?: bigint;
    researchedTechnologies?: Array<string>;
}
export interface Protection {
    mechanisms: Array<ProtectionMechanism>;
    protectionRating: string;
}
export interface DisplayUnit {
    height: bigint;
    manufacturer: string;
    displayType: string;
    frameRate: bigint;
    brightness: bigint;
    details: string;
    energyConsumption?: bigint;
    width: bigint;
}
export interface Motherboard {
    sockets: Array<string>;
    interfaces: Array<string>;
}
export interface DeviceBlueprint {
    weight: bigint;
    impedance: bigint;
    name: string;
    rams: Array<RAM>;
    protection: Protection;
    deviceSlots: Array<DeviceSlot>;
    resistanceRating: string;
    processingUnit: ProcessingUnit;
    connections: DeviceConnections;
    wirelessPowerTransfer: Array<string>;
    coating: string;
    finalized: boolean;
    category: DeviceCategory;
    comfortRating: string;
    display: DisplayUnit;
    motherboard: Motherboard;
    ports: Array<string>;
    certifications: Array<string>;
    price: bigint;
    battery: Battery;
    technologyRatingSystem: string;
    storages: Array<Storage>;
    audioDevices: Array<AudioDevice>;
    cameras: Array<Camera>;
}
export interface WirelessConnection {
    connectionName: string;
    supportedStandards: Array<string>;
    maxUploadSpeed: bigint;
    maxDownloadSpeed: bigint;
}
export interface SaveSlot {
    id: string;
    name: string;
    lastModified: bigint;
}
export type ResearchStatus = {
    __kind__: "notStarted";
    notStarted: null;
} | {
    __kind__: "completed";
    completed: null;
} | {
    __kind__: "inProgress";
    inProgress: bigint;
};
export interface GameState {
    cash: bigint;
    difficulty: string;
    researchedTechs: Array<string>;
    products: Array<string>;
}
export interface RAM {
    id: bigint;
    manufacturer: string;
    clockSpeed: bigint;
    type: string;
    description: string;
    capacity: bigint;
    modules: bigint;
}
export interface ProcessingUnit {
    manufacturer: string;
    clockSpeed?: bigint;
    coreType: string;
    standards: Array<string>;
    name: string;
    cores: bigint;
    manufacturingYear?: bigint;
    architecture: string;
    energyConsumption?: bigint;
}
export interface SmartConnection {
    frequencyBand: string;
    manufacturer: string;
    transportProtocol: string;
    smartFeatures: Array<string>;
    rangeInMeters: bigint;
    interfaceType: string;
    encryptionType: string;
    standard: string;
}
export interface PlayerResearch {
    daysActive: bigint;
    totalSpent: bigint;
    researchId: string;
    researchLevel: bigint;
    researchState: bigint;
}
export interface DeviceSlot {
    maxCapacity: bigint;
    version: string;
    slotType: string;
}
export interface Battery {
    voltage: number;
    model: string;
    type: string;
    connector: string;
    capacity: bigint;
}
export interface Technology {
    status: ResearchStatus;
    effectedTestProps: Array<string>;
    isCompleted: boolean;
    cost: bigint;
    description: string;
    researchDate?: bigint;
    researchName: string;
    researchTime: bigint;
    researchId: string;
    category: string;
    price: bigint;
    requirements?: Requirements;
}
export interface Storage {
    id: bigint;
    manufacturer: string;
    writeSpeed?: bigint;
    cacheSize?: bigint;
    name: string;
    type: string;
    readSpeed?: bigint;
    description: string;
    energyConsumption: bigint;
    endurance?: bigint;
    capacity: bigint;
    isSolidState?: boolean;
}
export type DeviceBlueprintId = bigint;
export interface AudioDevice {
    output: string;
    manufacturer: string;
    isWireless: boolean;
    description: string;
    isStereo: boolean;
    deviceType: string;
}
export interface DeviceConnections {
    wirelessConnections: Array<WirelessConnection>;
    portConnections: Array<PortConnection>;
    smartConnections: Array<SmartConnection>;
}
export interface Camera {
    id: bigint;
    hasZoom: boolean;
    type: string;
    pixelResolution: string;
    hasAutofocus: boolean;
    lensType: string;
}
export interface PortConnection {
    features: Array<string>;
    manufacturer: string;
    count: bigint;
    compatibility: Array<string>;
    version: string;
    supportedStandards: Array<string>;
    compatibilityRequirements: Array<string>;
    supportedProtocols: Array<string>;
    portType: string;
    physicalFormFactor: string;
}
export interface UserProfile {
    name: string;
    totalPlayTime: bigint;
    preferredDifficulty?: string;
}
export interface ProtectionMechanism {
    mechanismType: string;
    waterproofCertification: string;
    fingerprintResistance: boolean;
    structuralFeatures: Array<string>;
    additionalFeatures: Array<string>;
    layerCount: bigint;
    material: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bulkSaveToSlot(saves: Array<SavedGame>): Promise<void>;
    checkSaveSlotExists(slotId: string): Promise<boolean>;
    completeResearchEntry(researchEntry: PlayerResearch): Promise<void>;
    createDefaultSaveSlot(): Promise<void>;
    createDeviceBlueprint(blueprint: DeviceBlueprint): Promise<DeviceBlueprintId>;
    deleteSaveSlot(slotId: string): Promise<void>;
    getActiveTechnologyResearch(): Promise<PlayerResearch | null>;
    getAllDeviceBlueprints(): Promise<Array<DeviceBlueprint>>;
    getAllDeviceCategories(): Promise<DeviceCategory>;
    getAllTechnologies(): Promise<Array<Technology>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getSaveSlotInfos(): Promise<Array<SaveSlot>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isSlotAvailable(slotId: string): Promise<boolean>;
    loadSaveSlot(slotId: string): Promise<SavedGame | null>;
    processInput(inputData: Uint8Array): Promise<string>;
    renameSaveSlot(slotId: string, newName: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveGameToSlot(newSave: SavedGame): Promise<void>;
}
