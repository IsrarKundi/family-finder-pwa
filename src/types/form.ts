export interface ContactDetails {
  fullName: string;
  age: string;
  mobile: string;
  email: string;
  shareContact: boolean;
}

export interface FamilyMember {
  id: string;
  fullName: string;
  age: string;
}

export interface FormData {
  contactDetails: ContactDetails;
  familyMembers: FamilyMember[];
  clan: string;
  subClan: string;
  address: {
    country: string;
    district: string;
    fullAddress: string;
  };
}

export const CLANS = [
  "Clan Alpha",
  "Clan Beta",
  "Clan Gamma",
  "Clan Delta",
  "Clan Epsilon",
];

export const SUB_CLANS: Record<string, string[]> = {
  "Clan Alpha": ["Alpha-1", "Alpha-2", "Alpha-3"],
  "Clan Beta": ["Beta-1", "Beta-2", "Beta-3"],
  "Clan Gamma": ["Gamma-1", "Gamma-2", "Gamma-3"],
  "Clan Delta": ["Delta-1", "Delta-2", "Delta-3"],
  "Clan Epsilon": ["Epsilon-1", "Epsilon-2", "Epsilon-3"],
};
