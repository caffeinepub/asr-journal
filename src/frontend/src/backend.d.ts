import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ArtCanvas {
    base64Data: string;
}
export interface JournalEntry {
    artCanvas: ArtCanvas;
    writingResponse: string;
    spiritualResponse: string;
    dayNumber: bigint;
    gratitudeAnchor: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllJournalEntries(): Promise<Array<JournalEntry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJournalEntry(dayNumber: bigint): Promise<JournalEntry | null>;
    getProgress(): Promise<Array<bigint>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveJournalEntry(dayNumber: bigint, spiritualResponse: string, writingResponse: string, gratitudeAnchor: string, artCanvas: ArtCanvas): Promise<void>;
}
