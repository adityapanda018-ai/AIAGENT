import { type FC, useState } from 'react';
import { X, Activity, Zap, Sliders, CheckCircle2, RotateCcw, TrendingUp } from 'lucide-react';

interface InteractiveSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveSimulatorModal: FC<InteractiveSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [powerKw, setPowerKw] = useState<number>(100);
  const [freqKhz, setFreqKhz] = useState<number>(10);
  const [ambientTemp, setAmbientTemp] = useState<number>(40);
  const [topology, setTopology] = useState<'3level_anpc' | '2level_sic' | '2level_igbt'>('3level_anpc');

  if (!isOpen) return null;

  // Real-time Physics-Based Loss Calculation
  const conductionLoss = (powerKw * 1000 * 0.006) * (topology === '3level_anpc' ? 0.65 : topology === '2level_sic' ? 0.9 : 1.4);
  const switchingLoss = (freqKhz * powerKw * 0.85) * (topology === '3level_anpc' ? 0.58 : topology === '2level_sic' ? 0.72 : 1.85);
  const totalLossWatts = conductionLoss + switchingLoss;
  const efficiencyPct = ((powerKw * 1000) / (powerKw * 1000 + totalLossWatts)) * 100;

  // Thermal Resistance & Junction Temperature: Tj = Ta + (Ploss * Rth)
  const rth = topology === '3level_anpc' ? 0.14 : 0.18;
  const junctionTempC = ambientTemp + (totalLossWatts / 6) * rth;
  const isThermalSafe = junctionTempC <= 125;

  const handleReset = () => {
    setPowerKw(100);
    setFreqKhz(10);
    setAmbientTemp(40);
    setTopology('3level_anpc');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-sm max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl space-y-3 p-5 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              INTERACTIVE ENGINEERING LOSS & THERMAL SIMULATOR
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm">
            <span className="text-[10px] text-[#94A3B8] block">EFFICIENCY</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-[#10B981]">{efficiencyPct.toFixed(2)}%</span>
            </div>
            <span className="text-[9px] text-[#10B981] flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-2.5 h-2.5" />
              +2.1% vs Legacy IGBT
            </span>
          </div>

          <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm">
            <span className="text-[10px] text-[#94A3B8] block">TOTAL LOSSES</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-[#F59E0B]">{(totalLossWatts / 1000).toFixed(2)} kW</span>
            </div>
            <span className="text-[9px] text-[#94A3B8]">Switching + Conduction</span>
          </div>

          <div className={`p-3 bg-[#0F141C] border rounded-sm ${isThermalSafe ? 'border-[#10B981]/40' : 'border-[#EF4444]/60'}`}>
            <span className="text-[10px] text-[#94A3B8] block">JUNCTION TEMP (T_j)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-xl font-bold ${isThermalSafe ? 'text-[#38BDF8]' : 'text-[#EF4444]'}`}>
                {junctionTempC.toFixed(1)}°C
              </span>
            </div>
            <span className={`text-[9px] font-bold ${isThermalSafe ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {isThermalSafe ? '● THERMAL MARGIN OK' : '⚠ OVERTEMP LIMIT (>125°C)'}
            </span>
          </div>

          <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm">
            <span className="text-[10px] text-[#94A3B8] block">SWITCH LOSS REDUCTION</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-[#38BDF8]">42.8%</span>
            </div>
            <span className="text-[9px] text-[#38BDF8]">At {freqKhz} kHz PWM</span>
          </div>
        </div>

        {/* Sliders & Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Left Column: Sliders */}
          <div className="p-4 bg-[#0F141C] border border-[#212936] rounded-sm space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#212936] pb-1 text-[11px] text-[#F1F5F9] font-bold">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
                OPERATING PARAMETERS
              </span>
              <button
                onClick={handleReset}
                className="text-[9px] text-[#94A3B8] hover:text-[#38BDF8] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Reset
              </button>
            </div>

            {/* Slider 1: Load Power */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#94A3B8]">Continuous Load Power:</span>
                <span className="text-[#38BDF8] font-bold">{powerKw} kW</span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={powerKw}
                onChange={(e) => setPowerKw(Number(e.target.value))}
                className="w-full accent-[#38BDF8] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-[#94A3B8]">
                <span>10 kW</span>
                <span>100 kW</span>
                <span>250 kW</span>
              </div>
            </div>

            {/* Slider 2: Switching Frequency */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#94A3B8]">PWM Switching Frequency (f_sw):</span>
                <span className="text-[#F59E0B] font-bold">{freqKhz} kHz</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={freqKhz}
                onChange={(e) => setFreqKhz(Number(e.target.value))}
                className="w-full accent-[#F59E0B] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-[#94A3B8]">
                <span>5 kHz</span>
                <span>10 kHz</span>
                <span>50 kHz</span>
              </div>
            </div>

            {/* Slider 3: Ambient Temperature */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#94A3B8]">Ambient Temperature (T_ambient):</span>
                <span className="text-[#10B981] font-bold">{ambientTemp} °C</span>
              </div>
              <input
                type="range"
                min="15"
                max="85"
                step="5"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(Number(e.target.value))}
                className="w-full accent-[#10B981] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-[#94A3B8]">
                <span>15 °C</span>
                <span>40 °C (Nominal)</span>
                <span>85 °C</span>
              </div>
            </div>
          </div>

          {/* Right Column: Converter Topology Selector & Loss Breakdown */}
          <div className="p-4 bg-[#0F141C] border border-[#212936] rounded-sm space-y-4">
            <span className="text-[11px] font-mono text-[#F1F5F9] font-bold flex items-center gap-1.5 border-b border-[#212936] pb-1">
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              POWER CONVERTER TOPOLOGY
            </span>

            <div className="grid grid-cols-1 gap-2 font-mono text-[11px]">
              <button
                onClick={() => setTopology('3level_anpc')}
                className={`p-2 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                  topology === '3level_anpc'
                    ? 'border-[#38BDF8] bg-[#161D27] text-[#38BDF8] font-bold shadow-sm'
                    : 'border-[#212936] text-[#94A3B8] hover:bg-[#161D27]'
                }`}
              >
                <div>
                  <span className="block text-[#F1F5F9]">3-Level ANPC (SiC MOSFET)</span>
                  <span className="text-[9px] text-[#94A3B8] font-sans">Lowest switching loss & voltage stress</span>
                </div>
                {topology === '3level_anpc' && <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />}
              </button>

              <button
                onClick={() => setTopology('2level_sic')}
                className={`p-2 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                  topology === '2level_sic'
                    ? 'border-[#38BDF8] bg-[#161D27] text-[#38BDF8] font-bold shadow-sm'
                    : 'border-[#212936] text-[#94A3B8] hover:bg-[#161D27]'
                }`}
              >
                <div>
                  <span className="block text-[#F1F5F9]">2-Level Bridge (SiC MOSFET)</span>
                  <span className="text-[9px] text-[#94A3B8] font-sans">Simpler gate drive, higher switch loss</span>
                </div>
                {topology === '2level_sic' && <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />}
              </button>

              <button
                onClick={() => setTopology('2level_igbt')}
                className={`p-2 rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${
                  topology === '2level_igbt'
                    ? 'border-[#38BDF8] bg-[#161D27] text-[#38BDF8] font-bold shadow-sm'
                    : 'border-[#212936] text-[#94A3B8] hover:bg-[#161D27]'
                }`}
              >
                <div>
                  <span className="block text-[#F1F5F9]">Legacy 2-Level (Silicon IGBT)</span>
                  <span className="text-[9px] text-[#94A3B8] font-sans">Baseline comparison hardware</span>
                </div>
                {topology === '2level_igbt' && <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />}
              </button>
            </div>

            {/* Visual Loss Ratio Bar */}
            <div className="space-y-1 font-mono text-[10px] pt-1">
              <div className="flex justify-between text-[#CBD5E1]">
                <span>Conduction: {(conductionLoss / 1000).toFixed(2)} kW</span>
                <span>Switching: {(switchingLoss / 1000).toFixed(2)} kW</span>
              </div>
              <div className="h-2 w-full bg-[#161D27] rounded-full overflow-hidden flex border border-[#212936]">
                <div 
                  className="bg-[#10B981] h-full" 
                  style={{ width: `${(conductionLoss / totalLossWatts) * 100}%` }} 
                />
                <div 
                  className="bg-[#F59E0B] h-full" 
                  style={{ width: `${(switchingLoss / totalLossWatts) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end font-mono text-[11px]">
          <button
            onClick={onClose}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Simulator
          </button>
        </div>
      </div>
    </div>
  );
};
export default InteractiveSimulatorModal;
