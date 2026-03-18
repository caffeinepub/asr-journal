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

  type JournalEntry = {
    dayNumber : Nat;
    spiritualResponse : Text;
    writingResponse : Text;
    gratitudeAnchor : Text;
    artCanvas : ArtCanvas;
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

  // Store entries per user
  let userEntries = Map.empty<Principal, Map.Map<Nat, JournalEntry>>();

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

  public shared ({ caller }) func saveJournalEntry(dayNumber : Nat, spiritualResponse : Text, writingResponse : Text, gratitudeAnchor : Text, artCanvas : ArtCanvas) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save entries");
    };

    let entry : JournalEntry = {
      dayNumber;
      spiritualResponse;
      writingResponse;
      gratitudeAnchor;
      artCanvas;
    };

    let userMap = switch (userEntries.get(caller)) {
      case (null) {
        let newMap = Map.empty<Nat, JournalEntry>();
        userEntries.add(caller, newMap);
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

    switch (userEntries.get(caller)) {
      case (null) { null };
      case (?entries) { entries.get(dayNumber) };
    };
  };

  public query ({ caller }) func getAllJournalEntries() : async [JournalEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view entries");
    };

    switch (userEntries.get(caller)) {
      case (null) { [] };
      case (?entries) { entries.values().toArray() };
    };
  };

  public query ({ caller }) func getProgress() : async [Nat] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view progress");
    };

    switch (userEntries.get(caller)) {
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
