import { type FC, useState } from 'react';
import { 
  Key, 
  Palette, 
  Share2, 
  DollarSign, 
  Compass, 
  Command, 
  ShieldCheck 
} from 'lucide-react';
import type { ApiSettings } from '../types/agent';
import type { UserProfile } from '../types/auth';
import { SystemArchitectureModal } from './SystemArchitectureModal';
import { FullSystemTestModal } from './FullSystemTestModal';
import { UserProfileDropdown } from './UserProfileDropdown';

interface HeaderProps {
  settings: ApiSettings;
  userProfile: UserProfile;
  onOpenSettings: () => void;
  onOpenAgentBuilder: () => void;
  onOpenThemeModal: () => void;
  onOpenShareModal: () => void;
  onOpenTokenMeter: () => void;
  onOpenCommandPalette: () => void;
  onOpenTour: () => void;
  onOpenAuth: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
  onSignOut: () => void;
}

export const Header: FC<HeaderProps> = ({
  userProfile,
  onOpenSettings,
  onOpenThemeModal,
  onOpenShareModal,
  onOpenTokenMeter,
  onOpenCommandPalette,
  onOpenTour,
  onOpenAuth,
  onUpdateProfile,
  onSignOut
}) => {
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);
  const [isFullTestModalOpen, setIsFullTestModalOpen] = useState<boolean>(false);

  return (
    <header className="border-b border-[#212936] bg-[#0F141C] select-none font-sans sticky top-0 z-40">
      <div className="h-14 px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: Brand & Active Investigation Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#38BDF8]/40 flex items-center justify-center p-1.5 shadow-sm">
            <img src="/nexus-logo.svg" alt="NexusAI" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-[#F1F5F9] tracking-wider uppercase">
                NEXUS WORKBENCH
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live
              </span>
            </div>
            <span className="text-[10px] text-[#94A3B8] font-sans block">
              Power Electronics Engineering Suite
            </span>
          </div>
        </div>

        {/* Right: Quick Tools, Command Palette & User Profile */}
        <div className="flex items-center gap-2 font-mono shrink-0">
          {/* Quick Search Launcher */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 h-8 px-2.5 rounded border border-[#212936] bg-[#161D27] hover:border-[#38BDF8]/50 text-[#94A3B8] hover:text-[#F1F5F9] transition-all cursor-pointer text-[11px]"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Search</span>
            <kbd className="text-[9px] bg-[#0F141C] border border-[#212936] px-1 py-0.2 rounded text-[#94A3B8]">⌘K</kbd>
          </button>

          {/* Verification Suite */}
          <button
            onClick={() => setIsFullTestModalOpen(true)}
            className="h-8 px-2.5 rounded bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25 border border-[#10B981]/40 font-bold flex items-center gap-1.5 cursor-pointer transition-all text-[11px]"
            title="Run 14-Point Automated Verification Suite"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="hidden sm:inline">Verify</span>
          </button>

          {/* Share Investigation */}
          <button
            onClick={onOpenShareModal}
            className="h-8 w-8 rounded border border-[#212936] hover:border-[#10B981]/50 bg-[#161D27] text-[#94A3B8] hover:text-[#10B981] flex items-center justify-center transition-all cursor-pointer"
            title="Generate Shareable Link & QR Code"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Token & Cost Meter */}
          <button
            onClick={onOpenTokenMeter}
            className="h-8 w-8 rounded border border-[#212936] hover:border-[#38BDF8]/50 bg-[#161D27] text-[#94A3B8] hover:text-[#38BDF8] flex items-center justify-center transition-all cursor-pointer"
            title="API Cost & Token Usage Telemetry"
          >
            <DollarSign className="w-3.5 h-3.5" />
          </button>

          {/* Tour Guide */}
          <button
            onClick={onOpenTour}
            className="h-8 w-8 rounded border border-[#212936] hover:border-[#38BDF8]/50 bg-[#161D27] text-[#94A3B8] hover:text-[#38BDF8] flex items-center justify-center transition-all cursor-pointer"
            title="Product Tour & Onboarding"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>

          {/* Theme Palette */}
          <button
            onClick={onOpenThemeModal}
            className="h-8 w-8 rounded border border-[#212936] hover:border-[#38BDF8]/50 bg-[#161D27] text-[#94A3B8] hover:text-[#38BDF8] flex items-center justify-center transition-all cursor-pointer"
            title="Themes, Particles & Scanline HUD"
          >
            <Palette className="w-3.5 h-3.5" />
          </button>

          {/* System Settings */}
          <button
            onClick={onOpenSettings}
            className="h-8 w-8 rounded border border-[#212936] hover:border-[#38BDF8]/50 bg-[#161D27] text-[#94A3B8] hover:text-[#F59E0B] flex items-center justify-center transition-all cursor-pointer"
            title="API Keys & Workspace Settings"
          >
            <Key className="w-3.5 h-3.5" />
          </button>

          {/* User Profile Monogram Pill */}
          <UserProfileDropdown
            profile={userProfile}
            onOpenAuth={onOpenAuth}
            onUpdateProfile={onUpdateProfile}
            onSignOut={onSignOut}
          />
        </div>
      </div>

      <SystemArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      <FullSystemTestModal
        isOpen={isFullTestModalOpen}
        onClose={() => setIsFullTestModalOpen(false)}
      />
    </header>
  );
};
export default Header;
