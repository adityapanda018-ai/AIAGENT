export type UserRole = 
  | 'Lead Power Electronics Architect'
  | 'Simulation & Thermal Engineer'
  | 'Compliance & Safety Auditor'
  | 'R&D Principal Investigator';

export type UserTier = 'Guest Explorer' | 'Pro Researcher' | 'Enterprise Team';

export interface UserOrganization {
  id: string;
  name: string;
  role: string;
  memberCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  tier: UserTier;
  organization: string;
  organizations: UserOrganization[];
  joinedDate: string;
  investigationsCount: number;
  apiTokensUsed: number;
  isLoggedIn: boolean;
}
