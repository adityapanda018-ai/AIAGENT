import { type FC, useState, useRef, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  Building2, 
  CreditCard, 
  ChevronDown, 
  Check 
} from 'lucide-react';
import type { UserProfile, UserRole, UserOrganization } from '../types/auth';
import { playClickSound, playSwitchSound } from '../services/soundFx';

interface UserProfileDropdownProps {
  profile: UserProfile;
  onOpenAuth: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
  onSignOut: () => void;
}

export const UserProfileDropdown: FC<UserProfileDropdownProps> = ({
  profile,
  onOpenAuth,
  onUpdateProfile,
  onSignOut
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: UserRole[] = [
    'Lead Power Electronics Architect',
    'Simulation & Thermal Engineer',
    'Compliance & Safety Auditor',
    'R&D Principal Investigator'
  ];

  const handleRoleChange = (role: UserRole) => {
    playClickSound();
    onUpdateProfile({ ...profile, role });
  };

  const handleOrgChange = (org: UserOrganization) => {
    playSwitchSound();
    onUpdateProfile({ ...profile, organization: org.name });
  };

  return (
    <div className="relative font-mono select-none" ref={dropdownRef}>
      {/* Top Header Trigger Pill */}
      <button
        onClick={() => { playClickSound(); setIsOpen(!isOpen); }}
        className="h-8 px-2.5 rounded-sm border border-[#212936] hover:border-[#38BDF8]/60 bg-[#161D27] text-left flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        title="User Profile & Organization Workspace"
      >
        <div className="w-5 h-5 rounded-full overflow-hidden border border-[#38BDF8]/50 bg-[#0F141C] flex items-center justify-center shrink-0">
          {profile.isLoggedIn ? (
            <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-3 h-3 text-[#94A3B8]" />
          )}
        </div>

        <div className="hidden sm:flex flex-col items-start leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#F1F5F9]">{profile.name}</span>
            <span className={`text-[8px] px-1 py-0.2 rounded font-bold uppercase ${
              profile.tier === 'Pro Researcher'
                ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30'
                : profile.tier === 'Enterprise Team'
                  ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                  : 'bg-[#94A3B8]/15 text-[#94A3B8] border border-[#212936]'
            }`}>
              {profile.tier}
            </span>
          </div>
        </div>

        <ChevronDown className="w-3 h-3 text-[#94A3B8]" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 bg-[#161D27]/98 backdrop-blur-md border border-[#38BDF8]/40 rounded-sm shadow-2xl z-50 p-3 space-y-3 animate-fade-in text-xs font-mono">
          {/* User Details Header */}
          <div className="flex items-start gap-2.5 border-b border-[#212936] pb-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#38BDF8] bg-[#0F141C] shrink-0">
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden space-y-0.5">
              <span className="font-bold text-xs text-[#F1F5F9] block truncate">{profile.name}</span>
              <span className="text-[9px] text-[#94A3B8] block truncate font-sans">{profile.email}</span>
              <span className="text-[9px] text-[#10B981] font-semibold block truncate flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5" />
                {profile.organization}
              </span>
            </div>
          </div>

          {/* Role-Based Engineering Profiles Switcher */}
          <div className="space-y-1">
            <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider block">
              ENGINEERING ROLE SPECIALIZATION
            </span>
            <div className="space-y-1">
              {roles.map((r) => {
                const isSelected = profile.role === r;
                return (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full p-1.5 rounded-xs text-left flex items-center justify-between text-[10px] transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#38BDF8]/15 text-[#38BDF8] font-bold border border-[#38BDF8]/30'
                        : 'text-[#CBD5E1] hover:bg-[#0F141C]'
                    }`}
                  >
                    <span className="truncate">{r}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#38BDF8] shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workspace & Team Organization Switcher */}
          <div className="space-y-1 pt-2 border-t border-[#212936]">
            <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider block">
              ACTIVE WORKSPACE
            </span>
            <div className="space-y-1">
              {profile.organizations.map((org) => {
                const isSelected = profile.organization === org.name;
                return (
                  <button
                    key={org.id}
                    onClick={() => handleOrgChange(org)}
                    className={`w-full p-1.5 rounded-xs text-left flex items-center justify-between text-[10px] transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#10B981]/15 text-[#10B981] font-bold border border-[#10B981]/30'
                        : 'text-[#CBD5E1] hover:bg-[#0F141C]'
                    }`}
                  >
                    <div className="truncate">
                      <span className="block truncate">{org.name}</span>
                      <span className="text-[8px] text-[#94A3B8] block">{org.role} • {org.memberCount} seats</span>
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-[#10B981] shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subscription & Tier Indicator */}
          <div className="p-2 bg-[#0F141C] rounded border border-[#212936] space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-[#94A3B8] flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-[#38BDF8]" />
                Subscription:
              </span>
              <strong className="text-[#38BDF8]">{profile.tier}</strong>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#94A3B8]">
              <span>Saved Runs: <strong className="text-[#F1F5F9]">{profile.investigationsCount}</strong></span>
              <span>Tokens Used: <strong className="text-[#10B981]">{profile.apiTokensUsed.toLocaleString()}</strong></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-[#212936] flex items-center justify-between text-[10px]">
            {profile.isLoggedIn ? (
              <button
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                  onSignOut();
                }}
                className="text-[#EF4444] hover:text-[#F87171] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  playClickSound();
                  setIsOpen(false);
                  onOpenAuth();
                }}
                className="text-[#38BDF8] hover:text-[#7DD3FC] flex items-center gap-1 font-bold cursor-pointer transition-colors"
              >
                <User className="w-3 h-3" />
                <span>Sign In / Sign Up</span>
              </button>
            )}

            <button
              onClick={() => {
                playClickSound();
                setIsOpen(false);
                onOpenAuth();
              }}
              className="text-[#94A3B8] hover:text-[#F1F5F9] flex items-center gap-1 cursor-pointer"
            >
              <span>Switch Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserProfileDropdown;
