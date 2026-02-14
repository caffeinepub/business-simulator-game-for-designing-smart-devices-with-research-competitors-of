import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
  // Old types (from original actor state)
  module OldTypes {
    public type ResearchStatus = {
      #completed;
      #inProgress : Nat;
      #notStarted;
    };

    public type Requirements = {
      cash : ?Nat;
      researchedTechnologies : ?[Text];
    };

    public type Branding = {
      companyName : Text;
      companyLogo : Text;
      productName : Text;
      productLogo : Text;
    };

    public type Technology = {
      researchId : Text;
      researchName : Text;
      category : Text;
      effectedTestProps : [Text];
      status : ResearchStatus;
      price : Nat;
      researchTime : Nat;
      requirements : ?Requirements;
      description : Text;
      isCompleted : Bool;
      researchDate : ?Nat;
      cost : Nat;
    };

    public type DeviceCategory = {
      #categoryList : [Text];
      #singleCategory : Text;
    };

    public type ProcessingUnit = {
      name : Text;
      cores : Nat;
      coreType : Text;
      clockSpeed : ?Nat;
      manufacturingYear : ?Nat;
      manufacturer : Text;
      energyConsumption : ?Nat;
      standards : [Text];
      architecture : Text;
    };

    public type DisplayUnit = {
      displayType : Text;
      details : Text;
      manufacturer : Text;
      width : Nat;
      height : Nat;
      frameRate : Nat;
      brightness : Nat;
      energyConsumption : ?Nat;
    };

    public type Storage = {
      id : Nat;
      name : Text;
      type_ : Text;
      capacity : Nat;
      readSpeed : ?Nat;
      writeSpeed : ?Nat;
      manufacturer : Text;
      isSolidState : ?Bool;
      endurance : ?Nat;
      cacheSize : ?Nat;
      description : Text;
      energyConsumption : Nat;
    };

    public type RAM = {
      id : Nat;
      type_ : Text;
      capacity : Nat;
      modules : Nat;
      clockSpeed : Nat;
      manufacturer : Text;
      description : Text;
    };

    public type Camera = {
      id : Nat;
      type_ : Text;
      pixelResolution : Text;
      lensType : Text;
      hasZoom : Bool;
      hasAutofocus : Bool;
    };

    public type Motherboard = {
      sockets : [Text];
      interfaces : [Text];
    };

    public type Battery = {
      type_ : Text;
      capacity : Nat;
      voltage : Float;
      connector : Text;
      model : Text;
    };

    public type AudioDevice = {
      deviceType : Text;
      output : Text;
      isStereo : Bool;
      isWireless : Bool;
      manufacturer : Text;
      description : Text;
    };

    public type WirelessConnection = {
      connectionName : Text;
      maxUploadSpeed : Nat;
      maxDownloadSpeed : Nat;
      supportedStandards : [Text];
    };

    public type SmartConnection = {
      manufacturer : Text;
      standard : Text;
      transportProtocol : Text;
      encryptionType : Text;
      interfaceType : Text;
      frequencyBand : Text;
      rangeInMeters : Nat;
      smartFeatures : [Text];
    };

    public type PortConnection = {
      portType : Text;
      count : Nat;
      version : Text;
      manufacturer : Text;
      physicalFormFactor : Text;
      supportedProtocols : [Text];
      supportedStandards : [Text];
      compatibilityRequirements : [Text];
      features : [Text];
      compatibility : [Text];
    };

    public type DeviceConnections = {
      wirelessConnections : [WirelessConnection];
      smartConnections : [SmartConnection];
      portConnections : [PortConnection];
    };

    public type DeviceSlot = {
      slotType : Text;
      version : Text;
      maxCapacity : Nat;
    };

    public type ProtectionMechanism = {
      mechanismType : Text;
      material : Text;
      layerCount : Nat;
      structuralFeatures : [Text];
      additionalFeatures : [Text];
      fingerprintResistance : Bool;
      waterproofCertification : Text;
    };

    public type Protection = {
      mechanisms : [ProtectionMechanism];
      protectionRating : Text;
    };

    public type DeviceBlueprint = {
      category : DeviceCategory;
      processingUnit : ProcessingUnit;
      display : DisplayUnit;
      storages : [Storage];
      rams : [RAM];
      cameras : [Camera];
      motherboard : Motherboard;
      battery : Battery;
      audioDevices : [AudioDevice];
      connections : DeviceConnections;
      deviceSlots : [DeviceSlot];
      protection : Protection;
      price : Nat;
      finalized : Bool;
      name : Text;
      comfortRating : Text;
      coating : Text;
      certifications : [Text];
      impedance : Nat;
      ports : [Text];
      resistanceRating : Text;
      technologyRatingSystem : Text;
      weight : Nat;
      wirelessPowerTransfer : [Text];
    };

    public type DeviceBlueprintId = Nat;

    public type PlayerResearch = {
      researchId : Text;
      researchLevel : Nat;
      totalSpent : Nat;
      daysActive : Nat;
      researchState : Nat;
    };

    public type ReleasedProduct = {
      productId : Text;
      name : Text;
      category : Text;
      year : Nat;
      sales : Nat;
      rating : Float;
      price : Nat;
      features : [Text];
    };

    public type SavedGame = {
      saveId : Text;
      name : Text;
      lastModified : Nat;
      branding : Branding;
      gameState : GameState;
      releasedProducts : [ReleasedProduct];
    };

    public type GameState = {
      cash : Nat;
      researchedTechs : [Text];
      products : [Text];
      difficulty : Text;
    };
  };

  // New types (from new actor state)
  module NewTypes {
    public type Store = {
      country : Text;
      storeName : Text;
      location : Text;
      employees : Nat;
      inventoryCapacity : Nat;
      establishmentDate : Nat;
    };

    public type StoreNetwork = {
      stores : [Store];
      productivityBonus : Nat;
      productAttractionBonus : Nat;
    };

    public type SavedGame = OldTypes.SavedGame and {
      storeNetwork : StoreNetwork;
    };
  };

  // Old actor state type (before migration)
  type OldActor = {
    saveSlots : Map.Map<Principal, [OldTypes.SavedGame]>;
    // other state fields...
  };

  // New actor state type (after migration)
  type NewActor = {
    saveSlots : Map.Map<Principal, [NewTypes.SavedGame]>;
    // other state fields...
  };

  public func run(old : OldActor) : NewActor {
    // Migrate save slots to include new fields
    let newSaveSlots = old.saveSlots.map<Principal, [OldTypes.SavedGame], [NewTypes.SavedGame]>(
      func(_, oldSaves) { migrateSaves(oldSaves) }
    );

    { old with saveSlots = newSaveSlots };
  };

  func migrateSaves(oldSaves : [OldTypes.SavedGame]) : [NewTypes.SavedGame] {
    let list = List.empty<NewTypes.SavedGame>();
    for (oldSave in oldSaves.values()) {
      let newSave = migrateSingleSave(oldSave);
      list.add(newSave);
    };
    list.toArray();
  };

  func migrateSingleSave(oldSave : OldTypes.SavedGame) : NewTypes.SavedGame {
    let storeNetwork = {
      stores = [];
      productivityBonus = 0; // Default value
      productAttractionBonus = 0; // Default value
    };

    { oldSave with storeNetwork };
  };
};
