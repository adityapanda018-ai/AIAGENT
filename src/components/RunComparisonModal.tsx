import { type FC } from 'react';
import { 
  X, 
  Layers, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  DollarSign
} from 'lucide-react';
import { playClickSound } from '../services/soundFx';

interface RunComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RunComparisonModal: FC<RunComparisonModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const comparisonRows = [
    {
      metric: 'Nominal System Efficiency',
      runA: '99.15%',
      runB: '95.05%',
      delta: '+4.10%',
      isPositive: true,
      sub: 'Annual savings: 35,916 kWh / yr'
    },
    {
      metric: 'Total Dissipated Losses',
      runA: '0.86 kW',
      runB: '5.21 kW',
      delta: '-83.5%',
      isPositive: true,
      sub: 'Loss reduced from 5,210W to 858W'
    },
    {
      metric: 'High-Frequency Switching Loss',
      runA: '0.23 kW',
      runB: '3.41 kW',
      delta: '-93.2%',
      isPositive: true,
      sub: 'At 10 kHz PWM carrier'
    },
    {
      metric: 'Junction Temperature (T_j)',
      runA: '61.4°C',
      runB: '118.2°C',
      delta: '-56.8°C',
      isPositive: true,
      sub: 'Ambient = 40°C with Liquid Cold Plate'
    },
    {
      metric: 'Output Filter Inductor Volume',
      runA: '4.2 Liters',
      runB: '8.9 Liters',
      delta: '-52.8%',
      isPositive: true,
      sub: '3-level PWM cuts output voltage ripple in half'
    },
    {
      metric: 'Semiconductor Module BOM Cost',
      runA: '$1,420',
      runB: '$890',
      delta: '+$530',
      isPositive: false,
      sub: 'SiC initial module premium amortized in 8.4 months'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-sm max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl space-y-4 p-5 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-2 font-mono">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
              INVESTIGATION RUN COMPARISON DIFF MATRIX
            </h2>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1 rounded-sm text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Header Labels for the 2 Runs */}
        <div className="grid grid-cols-2 gap-3 font-mono">
          <div className="p-3 bg-[#0F141C] border border-[#38BDF8]/50 rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#38BDF8] font-bold">RUN #0248 (PRIMARY CANDIDATE)</span>
              <span className="px-1.5 py-0.2 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 rounded text-[9px] font-bold">RECOMMENDED</span>
            </div>
            <strong className="text-xs text-[#F1F5F9] block mt-1">100 kW 3-Level ANPC (1200V SiC MOSFET)</strong>
            <span className="text-[9px] text-[#94A3B8]">Verified Provenance • 10 kHz PWM • Liquid Cold Plate</span>
          </div>

          <div className="p-3 bg-[#0F141C] border border-[#212936] rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#94A3B8] font-bold">RUN #0247 (BASELINE BENCHMARK)</span>
              <span className="px-1.5 py-0.2 bg-[#94A3B8]/10 text-[#94A3B8] border border-[#212936] rounded text-[9px]">BASELINE</span>
            </div>
            <strong className="text-xs text-[#F1F5F9] block mt-1">100 kW 2-Level Half-Bridge (Silicon IGBT)</strong>
            <span className="text-[9px] text-[#94A3B8]">Legacy Topology • 10 kHz PWM • Liquid Cold Plate</span>
          </div>
        </div>

        {/* Diff Table */}
        <div className="flex-1 overflow-y-auto font-mono text-[11px] bg-[#0F141C] border border-[#212936] rounded-sm">
          <table className="w-full text-left">
            <thead className="bg-[#161D27] text-[#94A3B8] text-[9px] uppercase border-b border-[#212936]">
              <tr>
                <th className="p-2.5">Engineering Parameter</th>
                <th className="p-2.5 text-[#38BDF8]">Investigation 0248</th>
                <th className="p-2.5 text-[#94A3B8]">Investigation 0247</th>
                <th className="p-2.5 text-right">Delta (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#212936]">
              {comparisonRows.map((row) => (
                <tr key={row.metric} className="hover:bg-[#161D27]/50">
                  <td className="p-2.5">
                    <span className="font-bold text-[#F1F5F9] block">{row.metric}</span>
                    <span className="text-[9px] text-[#94A3B8] font-sans">{row.sub}</span>
                  </td>
                  <td className="p-2.5 text-[#38BDF8] font-bold text-xs">{row.runA}</td>
                  <td className="p-2.5 text-[#94A3B8]">{row.runB}</td>
                  <td className="p-2.5 text-right">
                    <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[10px] ${
                      row.isPositive
                        ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                        : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                    }`}>
                      {row.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{row.delta}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Economic Feasibility & ROI Note */}
        <div className="p-3 bg-[#0F141C] border border-[#10B981]/30 rounded-sm flex items-center justify-between font-mono">
          <div className="flex items-center gap-2 text-[11px]">
            <DollarSign className="w-4 h-4 text-[#10B981]" />
            <span className="text-[#F1F5F9]">
              Net Economic Payback Period: <strong className="text-[#10B981]">8.4 Months</strong> (at $0.14 / kWh electricity rate)
            </span>
          </div>
          <span className="text-[#10B981] text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Clear Architectural Winner
          </span>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#212936] flex justify-end font-mono text-[11px]">
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="btn-primary py-1 px-4 text-xs font-semibold cursor-pointer"
          >
            Close Diff Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
export default RunComparisonModal;
