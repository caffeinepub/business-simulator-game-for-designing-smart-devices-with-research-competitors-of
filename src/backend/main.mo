import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import List "mo:core/List";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module Types {
    public type ResearchStatus = {
      #completed;
      #inProgress : Nat;
      #notStarted;
    };

    public type Requirements = {
      cash : ?Nat;
      researchedTechnologies : ?[Text];
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

    public type SavedGame = {
      saveId : Text;
      name : Text;
      lastModified : Nat;
      gameState : GameState;
    };

    public type GameState = {
      cash : Nat;
      researchedTechs : [Text];
      products : [Text];
      difficulty : Text;
    };
  };

  module Technology {
    public func compareByResearchId(t1 : Types.Technology, t2 : Types.Technology) : Order.Order {
      Text.compare(t1.researchId, t2.researchId);
    };
  };

  module Device {
    public func compareByPrice(d1 : Types.DeviceBlueprint, d2 : Types.DeviceBlueprint) : Order.Order {
      Nat.compare(d1.price, d2.price);
    };
  };

  module SaveSlot {
    public type SaveSlot = {
      id : Text;
      name : Text;
      lastModified : Int;
    };

    public func compareByLastModified(s1 : SaveSlot, s2 : SaveSlot) : Order.Order {
      Int.compare(s2.lastModified, s1.lastModified);
    };
  };

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    preferredDifficulty : ?Text;
    totalPlayTime : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextResearcherId = 0;
  var nextDeviceBlueprintId = 0;
  var nextSaveSlotId = 0;

  // Data: Tech Tree, Devices, Saves, and Ongoing Research
  let technologies = Map.empty<Text, Types.Technology>();
  let playerResearch = Map.empty<Principal, Types.PlayerResearch>();
  let deviceBlueprints = Map.empty<Principal, Map.Map<Types.DeviceBlueprintId, Types.DeviceBlueprint>>();
  let saveSlots = Map.empty<Principal, [Types.SavedGame]>();

  let deviceCategories = #categoryList([
    "smartphones",
    "tablets",
    "watches",
    "smart-glasses",
    "laptops",
  ]);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Flexible Device Creation System
  public shared ({ caller }) func processInput(inputData : Blob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can process input");
    };
    "Processing input: " # inputData.size().toText();
  };

  public shared ({ caller }) func createDeviceBlueprint(blueprint : Types.DeviceBlueprint) : async Types.DeviceBlueprintId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create device blueprints");
    };

    let userBlueprints = switch (deviceBlueprints.get(caller)) {
      case (null) { Map.empty<Types.DeviceBlueprintId, Types.DeviceBlueprint>() };
      case (?existing) { existing };
    };

    let blueprintId = nextDeviceBlueprintId;
    userBlueprints.add(blueprintId, blueprint);
    deviceBlueprints.add(caller, userBlueprints);
    nextDeviceBlueprintId += 1;
    blueprintId;
  };

  public query ({ caller }) func getAllDeviceBlueprints() : async [Types.DeviceBlueprint] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view device blueprints");
    };

    switch (deviceBlueprints.get(caller)) {
      case (null) { [] };
      case (?userBlueprints) {
        userBlueprints.values().toArray().sort(Device.compareByPrice);
      };
    };
  };

  public query ({ caller }) func getAllDeviceCategories() : async Types.DeviceCategory {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view device categories");
    };
    deviceCategories;
  };

  // Research System
  public shared ({ caller }) func completeResearchEntry(researchEntry : Types.PlayerResearch) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can complete research");
    };
    playerResearch.add(caller, researchEntry);
  };

  public query ({ caller }) func getAllTechnologies() : async [Types.Technology] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view technologies");
    };
    technologies.values().toArray().sort(Technology.compareByResearchId);
  };

  public query ({ caller }) func getActiveTechnologyResearch() : async ?Types.PlayerResearch {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view research");
    };
    playerResearch.get(caller);
  };

  // Save Slot Management
  public shared ({ caller }) func saveGameToSlot(newSave : Types.SavedGame) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save games");
    };

    let existingSaves = switch (saveSlots.get(caller)) {
      case (null) { [] };
      case (?saves) { saves };
    };

    let updatedSaves = existingSaves.filter(
      func(save) { save.saveId != newSave.saveId },
    );

    let newSaves = updatedSaves.concat([newSave]);
    saveSlots.add(caller, newSaves);
  };

  public query ({ caller }) func getSaveSlotInfos() : async [SaveSlot.SaveSlot] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view save slots");
    };

    switch (saveSlots.get(caller)) {
      case (?slots) {
        let infos = slots.map<Types.SavedGame, SaveSlot.SaveSlot>(
          func(savedGame) {
            {
              id = savedGame.saveId;
              name = savedGame.name;
              lastModified = savedGame.lastModified;
            };
          }
        );
        infos.sort(SaveSlot.compareByLastModified);
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func checkSaveSlotExists(slotId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check save slots");
    };

    switch (saveSlots.get(caller)) {
      case (?slots) {
        slots.find<Types.SavedGame>(func(save) { save.saveId == slotId }) != null;
      };
      case (null) { false };
    };
  };

  public shared ({ caller }) func bulkSaveToSlot(saves : [Types.SavedGame]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can bulk save");
    };
    saveSlots.add(caller, saves);
  };

  public query ({ caller }) func isSlotAvailable(slotId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check slot availability");
    };

    switch (saveSlots.get(caller)) {
      case (?slots) {
        slots.find<Types.SavedGame>(func(save) { save.saveId == slotId }) == null;
      };
      case (null) { true };
    };
  };

  public shared ({ caller }) func deleteSaveSlot(slotId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete save slots");
    };

    switch (saveSlots.get(caller)) {
      case (?slots) {
        let updatedSlots = slots.filter(
          func(save) { save.saveId != slotId }
        );
        saveSlots.add(caller, updatedSlots);
      };
      case (null) { };
    };
  };

  public shared ({ caller }) func loadSaveSlot(slotId : Text) : async ?Types.SavedGame {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can load save slots");
    };

    switch (saveSlots.get(caller)) {
      case (?slots) {
        slots.find<Types.SavedGame>(func(save) { save.saveId == slotId });
      };
      case (null) { null };
    };
  };

  public shared ({ caller }) func renameSaveSlot(slotId : Text, newName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can rename save slots");
    };

    switch (saveSlots.get(caller)) {
      case (?slots) {
        let updatedSlots = slots.map(
          func(save) {
            if (save.saveId == slotId) {
              {
                saveId = save.saveId;
                name = newName;
                lastModified = Int.abs(Time.now());
                gameState = save.gameState;
              };
            } else {
              save;
            };
          }
        );
        saveSlots.add(caller, updatedSlots);
      };
      case (null) { Runtime.trap("Save slot not found") };
    };
  };

  // User State Initialization Helpers
  public shared ({ caller }) func createDefaultSaveSlot() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create default save slots");
    };

    let slotExists = await checkSaveSlotExists("default");
    if (not slotExists) {
      let defaultSave : Types.SavedGame = {
        saveId = "default";
        name = "Default Save";
        lastModified = Int.abs(Time.now());
        gameState = {
          cash = 100_000;
          researchedTechs = [];
          products = [];
          difficulty = "normal";
        };
      };
      await saveGameToSlot(defaultSave);
    };
  };
};
