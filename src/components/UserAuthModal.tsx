import { type FC, useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import type { UserProfile, UserRole } from '../types/auth';
import { playClickSound, playSuccessSound } from '../services/soundFx';
import { DEFAULT_PRO_PROFILE, DEFAULT_GUEST_PROFILE } from '../services/authStore';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
}

export const UserAuthModal: FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Lead Power Electronics Architect');
  const [organization, setOrganization] = useState('Hyperion Energy Labs');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInstantDemoLogin = () => {
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      playSuccessSound();
      onLoginSuccess(DEFAULT_PRO_PROFILE);
      onClose();
    }, 400);
  };

  const handleGuestLogin = () => {
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      playSuccessSound();
      onLoginSuccess(DEFAULT_GUEST_PROFILE);
      onClose();
    }, 300);
  };

  const handleOAuthLogin = (provider: string) => {
    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      playSuccessSound();
      const oauthProfile: UserProfile = {
        ...DEFAULT_PRO_PROFILE,
        name: fullName || (provider === 'github' ? 'Aditya Panda (GitHub)' : 'Aditya Panda (Google)'),
        email: email || `aditya@${provider}.auth`,
        tier: 'Pro Researcher',
        isLoggedIn: true
      };
      onLoginSuccess(oauthProfile);
      onClose();
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    playClickSound();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      playSuccessSound();
      const customProfile: UserProfile = {
        id: `usr-${Date.now()}`,
        name: fullName || email.split('@')[0] || 'Research Engineer',
        email: email,
        role: selectedRole,
        tier: 'Pro Researcher',
        organization: organization || 'Hyperion Energy Labs',
        organizations: DEFAULT_PRO_PROFILE.organizations,
        joinedDate: 'August 2026',
        investigationsCount: 1,
        apiTokensUsed: 5000,
        isLoggedIn: true
      };
      setSuccessMessage(`Authenticated successfully as ${customProfile.name}!`);
      setTimeout(() => {
        onLoginSuccess(customProfile);
        onClose();
      }, 500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-sm max-w-lg w-full flex flex-col overflow-hidden shadow-2xl space-y-4 p-6 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-3 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              NEXUSAI ENGINEERING ACCESS & AUTHENTICATION
            </h2>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instant Demo & Zero-Friction Guest Access */}
        <div className="grid grid-cols-2 gap-2 font-mono">
          <button
            onClick={handleInstantDemoLogin}
            disabled={isLoading}
            className="p-2.5 rounded-sm border border-[#10B981]/50 bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] font-bold text-left transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider">1-CLICK LOGIN</span>
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            </div>
            <div>
              <span className="block text-xs text-[#F1F5F9] font-bold">Dr. Aditya Panda</span>
              <span className="text-[9px] text-[#10B981]">Pro Researcher Account</span>
            </div>
          </button>

          <button
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="p-2.5 rounded-sm border border-[#212936] bg-[#0F141C] hover:bg-[#161D27] text-[#94A3B8] hover:text-[#F1F5F9] text-left transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider">ANONYMOUS</span>
              <User className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
            <div>
              <span className="block text-xs text-[#F1F5F9]">Instant Guest Mode</span>
              <span className="text-[9px] text-[#94A3B8]">Zero Signup Required</span>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-[10px] text-[#94A3B8] font-mono">
          <div className="flex-1 h-px bg-[#212936]" />
          <span>OR SIGN IN WITH SSO</span>
          <div className="flex-1 h-px bg-[#212936]" />
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-3 gap-2 font-mono">
          <button
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="p-2 rounded-sm border border-[#212936] bg-[#0F141C] hover:bg-[#161D27] text-[#CBD5E1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[10px]"
          >
            <span className="font-bold text-[#EA4335]">G</span>
            <span>Google</span>
          </button>

          <button
            onClick={() => handleOAuthLogin('github')}
            disabled={isLoading}
            className="p-2 rounded-sm border border-[#212936] bg-[#0F141C] hover:bg-[#161D27] text-[#CBD5E1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[10px]"
          >
            <span className="font-bold text-[#F1F5F9]">GH</span>
            <span>GitHub</span>
          </button>

          <button
            onClick={() => handleOAuthLogin('azure')}
            disabled={isLoading}
            className="p-2 rounded-sm border border-[#212936] bg-[#0F141C] hover:bg-[#161D27] text-[#CBD5E1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-[10px]"
          >
            <span className="font-bold text-[#0078D4]">AZ</span>
            <span>Azure SSO</span>
          </button>
        </div>

        {/* Mode Toggle (Sign In vs Sign Up) */}
        <div className="flex border-b border-[#212936] font-mono text-[11px] pt-1">
          <button
            onClick={() => { playClickSound(); setAuthMode('signin'); }}
            className={`pb-1.5 px-3 border-b-2 font-bold cursor-pointer transition-colors ${
              authMode === 'signin'
                ? 'border-[#38BDF8] text-[#38BDF8]'
                : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9]'
            }`}
          >
            Email & Password
          </button>

          <button
            onClick={() => { playClickSound(); setAuthMode('signup'); }}
            className={`pb-1.5 px-3 border-b-2 font-bold cursor-pointer transition-colors ${
              authMode === 'signup'
                ? 'border-[#38BDF8] text-[#38BDF8]'
                : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9]'
            }`}
          >
            Create Organization Seat
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 font-mono">
          {authMode === 'signup' && (
            <>
              <div>
                <label className="text-[10px] text-[#94A3B8] block mb-1">Full Legal Name</label>
                <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0F141C] border border-[#212936] rounded-sm">
                  <User className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Aditya Panda"
                    className="w-full bg-transparent text-xs text-[#F1F5F9] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#94A3B8] block mb-1">Engineering Organization</label>
                <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0F141C] border border-[#212936] rounded-sm">
                  <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Hyperion Energy Labs"
                    className="w-full bg-transparent text-xs text-[#F1F5F9] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#94A3B8] block mb-1">Engineering Role Specialization</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full px-2.5 py-1.5 bg-[#0F141C] border border-[#212936] text-[#F1F5F9] rounded-sm text-xs focus:outline-none"
                >
                  <option value="Lead Power Electronics Architect">Lead Power Electronics Architect</option>
                  <option value="Simulation & Thermal Engineer">Simulation & Thermal Engineer</option>
                  <option value="Compliance & Safety Auditor">Compliance & Safety Auditor</option>
                  <option value="R&D Principal Investigator">R&D Principal Investigator</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="text-[10px] text-[#94A3B8] block mb-1">Work Email Address</label>
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0F141C] border border-[#212936] rounded-sm">
              <Mail className="w-3.5 h-3.5 text-[#94A3B8]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-transparent text-xs text-[#F1F5F9] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-[#94A3B8] block mb-1">Password</label>
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0F141C] border border-[#212936] rounded-sm">
              <Lock className="w-3.5 h-3.5 text-[#94A3B8]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent text-xs text-[#F1F5F9] focus:outline-none"
              />
            </div>
          </div>

          {successMessage && (
            <div className="p-2 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-2 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isLoading ? 'AUTHENTICATING...' : authMode === 'signin' ? 'Sign In to Workspace' : 'Create Organization Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
export default UserAuthModal;
