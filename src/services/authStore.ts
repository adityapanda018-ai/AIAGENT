import type { UserProfile, UserOrganization } from '../types/auth';

const DEFAULT_ORGANIZATIONS: UserOrganization[] = [
  { id: 'org-1', name: 'Hyperion Energy Labs', role: 'Lead Architect', memberCount: 14 },
  { id: 'org-2', name: 'MIT Power Electronics Lab', role: 'Research Affiliate', memberCount: 6 },
  { id: 'org-3', name: 'Personal Engineering Sandbox', role: 'Owner', memberCount: 1 }
];

export const DEFAULT_GUEST_PROFILE: UserProfile = {
  id: 'usr-guest',
  name: 'Guest Engineer',
  email: 'guest@nexusai.internal',
  role: 'Simulation & Thermal Engineer',
  tier: 'Guest Explorer',
  organization: 'Personal Engineering Sandbox',
  organizations: DEFAULT_ORGANIZATIONS,
  joinedDate: 'August 2026',
  investigationsCount: 3,
  apiTokensUsed: 12450,
  isLoggedIn: false
};

export const DEFAULT_PRO_PROFILE: UserProfile = {
  id: 'usr-aditya',
  name: 'Dr. Aditya Panda',
  email: 'aditya.panda@hyperionlabs.energy',
  role: 'Lead Power Electronics Architect',
  tier: 'Pro Researcher',
  organization: 'Hyperion Energy Labs',
  organizations: DEFAULT_ORGANIZATIONS,
  joinedDate: 'January 2026',
  investigationsCount: 48,
  apiTokensUsed: 384910,
  isLoggedIn: true
};

const STORAGE_KEY = 'nexusai_user_session';

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PRO_PROFILE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load user profile from storage:', e);
  }
  return DEFAULT_PRO_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
}
