import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type ArtCanvas = {
    base64Data : Text;
  };

  // Legacy entry type (matches the previously deployed stable var shape)
  type JournalEntryV1 = {
    dayNumber : Nat;
    spiritualResponse : Text;
    writingResponse : Text;
    gratitudeAnchor : Text;
    artCanvas : ArtCanvas;
  };

  type EmbedLink = {
    url : Text;
    title : Text;
    linkType : Text; // "music", "video", "reference"
  };

  type JournalEntry = {
    dayNumber : Nat;
    spiritualResponse : Text;
    writingResponse : Text;
    gratitudeAnchor : Text;
    artCanvas : ArtCanvas;
    links : [EmbedLink];
    photoIds : [Text];
  };

  type DayData = {
    day : Nat;
    spiritual : Text;
    art : Text;
    writing : Text;
    gratitude : Text;
  };

  type WeekData = {
    week : Nat;
    theme : Text;
    intention : Text;
    quote : Text;
    mandalaHint : Text;
    reflectionQuestions : [Text];
    days : [DayData];
  };

  let weeks = List.empty<WeekData>();

  // Store user profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Legacy stable var — keeps the old type so existing data loads without a compatibility error.
  // All reads/writes use userEntriesV2 going forward; migration runs in postupgrade.
  let userEntries = Map.empty<Principal, Map.Map<Nat, JournalEntryV1>>();

  // Current stable storage with the new entry shape
  let userEntriesV2 = Map.empty<Principal, Map.Map<Nat, JournalEntry>>();

  // Migrate any V1 entries into V2 on upgrade
  system func postupgrade() {
    for ((principal, oldMap) in userEntries.entries()) {
      let newUserMap = switch (userEntriesV2.get(principal)) {
        case (?m) { m };
        case (null) {
          let m = Map.empty<Nat, JournalEntry>();
          userEntriesV2.add(principal, m);
          m;
        };
      };
      for ((day, old) in oldMap.entries()) {
        // Only migrate if V2 doesn't already have this entry
        switch (newUserMap.get(day)) {
          case (?_) {}; // already migrated
          case (null) {
            newUserMap.add(day, {
              dayNumber = old.dayNumber;
              spiritualResponse = old.spiritualResponse;
              writingResponse = old.writingResponse;
              gratitudeAnchor = old.gratitudeAnchor;
              artCanvas = old.artCanvas;
              links = [];
              photoIds = [];
            });
          };
        };
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
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

  public shared ({ caller }) func saveJournalEntry(
    dayNumber : Nat,
    spiritualResponse : Text,
    writingResponse : Text,
    gratitudeAnchor : Text,
    artCanvas : ArtCanvas,
    links : [EmbedLink],
    photoIds : [Text],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save entries");
    };

    let entry : JournalEntry = {
      dayNumber;
      spiritualResponse;
      writingResponse;
      gratitudeAnchor;
      artCanvas;
      links;
      photoIds;
    };

    let userMap = switch (userEntriesV2.get(caller)) {
      case (null) {
        let newMap = Map.empty<Nat, JournalEntry>();
        userEntriesV2.add(caller, newMap);
        newMap;
      };
      case (?existingMap) { existingMap };
    };

    userMap.add(dayNumber, entry);
  };

  public query ({ caller }) func getJournalEntry(dayNumber : Nat) : async ?JournalEntry {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view entries");
    };

    switch (userEntriesV2.get(caller)) {
      case (null) { null };
      case (?entries) { entries.get(dayNumber) };
    };
  };

  public query ({ caller }) func getAllJournalEntries() : async [JournalEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view entries");
    };

    switch (userEntriesV2.get(caller)) {
      case (null) { [] };
      case (?entries) { entries.values().toArray() };
    };
  };

  public query ({ caller }) func getProgress() : async [Nat] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view progress");
    };

    switch (userEntriesV2.get(caller)) {
      case (null) { [] };
      case (?entries) {
        let daysSet = Set.empty<Nat>();
        for (entry in entries.values()) {
          daysSet.add(entry.dayNumber);
        };
        daysSet.toArray();
      };
    };
  };

  public query ({ caller }) func getWeeks() : async [WeekData] {
    weeks.toArray();
  };

  public query ({ caller }) func getWeek(weekNumber : Nat) : async ?WeekData {
    weeks.find(func(week) { week.week == weekNumber });
  };
};
