import { type FC, useState } from 'react';
import { 
  X, 
  Zap, 
  Cpu, 
  ShieldCheck
} from 'lucide-react';
import { playClickSound } from '../services/soundFx';

interface CircuitTopologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SwitchInfo {
  id: string;
  name: string;
  role: string;
  voltageStress: string;
  rdsOn: string;
  eSw: string;
  temperature: string;
  status: 'active' | 'clamping' | 'standby';
}

export const CircuitTopologyModal: FC<CircuitTopologyModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedSwitchId, setSelectedSwitchId] = useState<string>('S1');

  if (!isOpen) return null;

  const switches: Record<string, SwitchInfo> = {
    S1: {
      id: 'S1',
      name: 'Outer Upper Switch (S1)',
      role: 'Main high-side positive rail modulation switch',
      voltageStress: '600V (50% V_dc)',
      rdsOn: '10.5 mΩ @ 100°C',
      eSw: '1.24 mJ (Turn-on + Turn-off)',
      temperature: '68.2°C',
      status: 'active'
    },
    S2: {
      id: 'S2',
      name: 'Inner Upper Switch (S2)',
      role: 'Neutral-point phase connection switch',
      voltageStress: '600V (50% V_dc)',
      rdsOn: '10.5 mΩ @ 100°C',
      eSw: '0.38 mJ (Soft Commutation)',
      temperature: '61.4°C',
      status: 'active'
    },
    S3: {
      id: 'S3',
      name: 'Inner Lower Switch (S3)',
      role: 'Neutral-point phase connection switch',
      voltageStress: '600V (50% V_dc)',
      rdsOn: '10.5 mΩ @ 100°C',
      eSw: '0.38 mJ (Soft Commutation)',
      temperature: '61.4°C',
      status: 'active'
    },
    S4: {
      id: 'S4',
      name: 'Outer Lower Switch (S4)',
      role: 'Main low-side negative rail modulation switch',
      voltageStress: '600V (50% V_dc)',
      rdsOn: '10.5 mΩ @ 100°C',
      eSw: '1.24 mJ (Turn-on + Turn-off)',
      temperature: '68.2°C',
      status: 'active'
    },
    S5: {
      id: 'S5',
      name: 'Active Clamping Upper Switch (S5)',
      role: 'Zero-voltage active clamping to neutral midpoint',
      voltageStress: '600V (50% V_dc)',
      rdsOn: '12.0 mΩ @ 100°C',
      eSw: '0.45 mJ (Loss Distribution)',
      temperature: '58.9°C',
      status: 'clamping'
    },
    S6: {
      id: 'S6',
      name: 'Active Clamping Lower Switch (S6)',
      role: 'Zero-voltage active clamping to neutral midpoint',
      voltageStress: '600V (50% V_dc)',
      rdsOn: '12.0 mΩ @ 100°C',
      eSw: '0.45 mJ (Loss Distribution)',
      temperature: '58.9°C',
      status: 'clamping'
    }
  };

  const active = switches[selectedSwitchId] || switches.S1;

  const handleSelectSwitch = (id: string) => {
    playClickSound();
    setSelectedSwitchId(id);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-sm max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl space-y-3.5 p-5 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              INTERACTIVE 3-LEVEL ANPC HARDWARE TOPOLOGY SCHEMATIC
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 overflow-y-auto">
          {/* Left Column: Interactive Circuit Schematic Diagram (7 Cols) */}
          <div className="md:col-span-7 bg-[#0F141C] border border-[#212936] rounded-sm p-4 flex flex-col justify-between space-y-3 font-mono">
            <div className="flex items-center justify-between text-[10px] text-[#94A3B8] border-b border-[#212936] pb-1.5">
              <span>SINGLE-PHASE ANPC LEG (1200V BUS)</span>
              <span className="text-[#10B981] font-bold">CLICK A SWITCH NODE TO INSPECT</span>
            </div>

            {/* Interactive SVG Circuit Diagram */}
            <div className="relative w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 360 300" className="w-full max-w-md h-auto select-none">
                <defs>
                  <linearGradient id="busGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </linearGradient>
                </defs>

                {/* DC Rails */}
                {/* Positive Rail (+600V) */}
                <line x1="30" y1="30" x2="330" y2="30" stroke="#38BDF8" strokeWidth="2.5" />
                <text x="35" y="24" fill="#38BDF8" fontSize="9" fontWeight="bold">+V_dc/2 (+600V)</text>

                {/* Neutral Rail (0V NP) */}
                <line x1="30" y1="150" x2="330" y2="150" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
                <text x="35" y="144" fill="#10B981" fontSize="9" fontWeight="bold">Neutral Point (NP = 0V)</text>

                {/* Negative Rail (-600V) */}
                <line x1="30" y1="270" x2="330" y2="270" stroke="#EF4444" strokeWidth="2.5" />
                <text x="35" y="286" fill="#EF4444" fontSize="9" fontWeight="bold">-V_dc/2 (-600V)</text>

                {/* Vertical DC-Link Split Capacitors */}
                <line x1="70" y1="30" x2="70" y2="150" stroke="#94A3B8" strokeWidth="1.5" />
                <rect x="58" y="75" width="24" height="18" fill="#161D27" stroke="#38BDF8" rx="2" />
                <text x="63" y="87" fill="#38BDF8" fontSize="8" fontWeight="bold">C1</text>

                <line x1="70" y1="150" x2="70" y2="270" stroke="#94A3B8" strokeWidth="1.5" />
                <rect x="58" y="195" width="24" height="18" fill="#161D27" stroke="#EF4444" rx="2" />
                <text x="63" y="207" fill="#EF4444" fontSize="8" fontWeight="bold">C2</text>

                {/* Main Vertical Leg Bridge (S1, S2, S3, S4) */}
                <line x1="180" y1="30" x2="180" y2="270" stroke="#CBD5E1" strokeWidth="2" />

                {/* S1 Box */}
                <g onClick={() => handleSelectSwitch('S1')} className="cursor-pointer">
                  <rect 
                    x="160" y="48" width="40" height="26" 
                    fill={selectedSwitchId === 'S1' ? '#38BDF8' : '#161D27'} 
                    stroke={selectedSwitchId === 'S1' ? '#FFFFFF' : '#38BDF8'} 
                    strokeWidth={selectedSwitchId === 'S1' ? '2' : '1.2'} 
                    rx="3" 
                  />
                  <text x="173" y="65" fill={selectedSwitchId === 'S1' ? '#0F141C' : '#F1F5F9'} fontSize="10" fontWeight="bold">S1</text>
                </g>

                {/* S2 Box */}
                <g onClick={() => handleSelectSwitch('S2')} className="cursor-pointer">
                  <rect 
                    x="160" y="98" width="40" height="26" 
                    fill={selectedSwitchId === 'S2' ? '#38BDF8' : '#161D27'} 
                    stroke={selectedSwitchId === 'S2' ? '#FFFFFF' : '#38BDF8'} 
                    strokeWidth={selectedSwitchId === 'S2' ? '2' : '1.2'} 
                    rx="3" 
                  />
                  <text x="173" y="115" fill={selectedSwitchId === 'S2' ? '#0F141C' : '#F1F5F9'} fontSize="10" fontWeight="bold">S2</text>
                </g>

                {/* S3 Box */}
                <g onClick={() => handleSelectSwitch('S3')} className="cursor-pointer">
                  <rect 
                    x="160" y="174" width="40" height="26" 
                    fill={selectedSwitchId === 'S3' ? '#38BDF8' : '#161D27'} 
                    stroke={selectedSwitchId === 'S3' ? '#FFFFFF' : '#38BDF8'} 
                    strokeWidth={selectedSwitchId === 'S3' ? '2' : '1.2'} 
                    rx="3" 
                  />
                  <text x="173" y="191" fill={selectedSwitchId === 'S3' ? '#0F141C' : '#F1F5F9'} fontSize="10" fontWeight="bold">S3</text>
                </g>

                {/* S4 Box */}
                <g onClick={() => handleSelectSwitch('S4')} className="cursor-pointer">
                  <rect 
                    x="160" y="224" width="40" height="26" 
                    fill={selectedSwitchId === 'S4' ? '#38BDF8' : '#161D27'} 
                    stroke={selectedSwitchId === 'S4' ? '#FFFFFF' : '#38BDF8'} 
                    strokeWidth={selectedSwitchId === 'S4' ? '2' : '1.2'} 
                    rx="3" 
                  />
                  <text x="173" y="241" fill={selectedSwitchId === 'S4' ? '#0F141C' : '#F1F5F9'} fontSize="10" fontWeight="bold">S4</text>
                </g>

                {/* Active Clamping Path S5 & S6 */}
                <path d="M 180 85 L 260 85 L 260 150 M 180 212 L 260 212 L 260 150" stroke="#F59E0B" strokeWidth="1.5" fill="none" />

                {/* S5 Box */}
                <g onClick={() => handleSelectSwitch('S5')} className="cursor-pointer">
                  <rect 
                    x="240" y="72" width="40" height="26" 
                    fill={selectedSwitchId === 'S5' ? '#F59E0B' : '#161D27'} 
                    stroke={selectedSwitchId === 'S5' ? '#FFFFFF' : '#F59E0B'} 
                    strokeWidth={selectedSwitchId === 'S5' ? '2' : '1.2'} 
                    rx="3" 
                  />
                  <text x="253" y="89" fill={selectedSwitchId === 'S5' ? '#0F141C' : '#F1F5F9'} fontSize="10" fontWeight="bold">S5</text>
                </g>

                {/* S6 Box */}
                <g onClick={() => handleSelectSwitch('S6')} className="cursor-pointer">
                  <rect 
                    x="240" y="199" width="40" height="26" 
                    fill={selectedSwitchId === 'S6' ? '#F59E0B' : '#161D27'} 
                    stroke={selectedSwitchId === 'S6' ? '#FFFFFF' : '#F59E0B'} 
                    strokeWidth={selectedSwitchId === 'S6' ? '2' : '1.2'} 
                    rx="3" 
                  />
                  <text x="253" y="216" fill={selectedSwitchId === 'S6' ? '#0F141C' : '#F1F5F9'} fontSize="10" fontWeight="bold">S6</text>
                </g>

                {/* Output Phase Terminal (Node A) */}
                <line x1="180" y1="150" x2="310" y2="150" stroke="#10B981" strokeWidth="2.5" />
                <circle cx="310" cy="150" r="5" fill="#10B981" />
                <text x="270" y="142" fill="#10B981" fontSize="9" fontWeight="bold">Phase Output (A)</text>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#CBD5E1] pt-2 border-t border-[#212936]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                Main Leg (S1-S4)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                Active Clamping (S5-S6)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Phase Output (3 Levels: +V/2, 0, -V/2)
              </span>
            </div>
          </div>

          {/* Right Column: Switch Inspector Card (5 Cols) */}
          <div className="md:col-span-5 bg-[#0F141C] border border-[#38BDF8]/40 rounded-sm p-4 space-y-4 font-mono flex flex-col justify-between">
            <div className="space-y-3">
              <div className="border-b border-[#212936] pb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#38BDF8]" />
                  <span className="font-bold text-xs text-[#F1F5F9]">{active.name}</span>
                </div>
                <span className="px-1.5 py-0.2 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-[9px] font-bold uppercase">
                  {active.status}
                </span>
              </div>

              <p className="text-[11px] text-[#CBD5E1] font-sans leading-relaxed">
                {active.role}
              </p>

              <div className="space-y-2 text-[11px]">
                <div className="p-2 bg-[#161D27] rounded border border-[#212936] flex justify-between">
                  <span className="text-[#94A3B8]">Max Voltage Stress:</span>
                  <strong className="text-[#38BDF8]">{active.voltageStress}</strong>
                </div>

                <div className="p-2 bg-[#161D27] rounded border border-[#212936] flex justify-between">
                  <span className="text-[#94A3B8]">Conduction R_ds(on):</span>
                  <strong className="text-[#10B981]">{active.rdsOn}</strong>
                </div>

                <div className="p-2 bg-[#161D27] rounded border border-[#212936] flex justify-between">
                  <span className="text-[#94A3B8]">Switching Energy (E_sw):</span>
                  <strong className="text-[#F59E0B]">{active.eSw}</strong>
                </div>

                <div className="p-2 bg-[#161D27] rounded border border-[#212936] flex justify-between">
                  <span className="text-[#94A3B8]">Junction Temperature:</span>
                  <strong className="text-[#38BDF8]">{active.temperature}</strong>
                </div>
              </div>
            </div>

            {/* Engineering Conclusion Badge */}
            <div className="p-2.5 bg-[#161D27] rounded border border-[#10B981]/30 space-y-1">
              <span className="text-[10px] text-[#10B981] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                50% VOLTAGE STRESS BENEFIT
              </span>
              <p className="text-[10px] text-[#94A3B8] font-sans leading-normal">
                Because switches block only 50% of the DC link voltage (600V vs 1200V), fast 1200V SiC MOSFETs operate well below rated avalanche breakdown limits.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end font-mono text-[11px]">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Schematic Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
export default CircuitTopologyModal;
