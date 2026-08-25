import { useState, type FC } from 'react';
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  Zap, 
  ArrowRight, 
  Activity, 
  Compass 
} from 'lucide-react';
import { playClickSound } from '../services/soundFx';

interface RoiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSimulator: () => void;
  onOpenTour: () => void;
}

export const RoiCalculatorModal: FC<RoiCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenSimulator,
  onOpenTour
}) => {
  const [plantCapacityMw, setPlantCapacityMw] = useState<number>(5); // 5 MW default
  const [electricityTariff, setElectricityTariff] = useState<number>(0.09); // $0.09 / kWh
  const operationalHoursPerYear = 4500; // 4500 hours (solar/wind typical)
  const inverterCostDeltaPerUnit = 450; // $450 SiC premium per 100kW module

  if (!isOpen) return null;

  // Numerical Calculations based on IEEE 3-Level ANPC SiC conversion calibration
  // Baseline Si IGBT 2-Level Efficiency: 94.8% (5.2% loss)
  // Candidate SiC 3-Level ANPC Efficiency: 98.9% (1.1% loss)
  // Loss Reduction: 4.1% absolute efficiency gain (78.8% reduction in lost energy)

  const annualGenerationMwh = plantCapacityMw * operationalHoursPerYear;
  const baselineLossMwh = annualGenerationMwh * 0.052;
  const candidateLossMwh = annualGenerationMwh * 0.011;
  const annualEnergySavedMwh = baselineLossMwh - candidateLossMwh;

  const annualDollarSavings = annualEnergySavedMwh * 1000 * electricityTariff;
  const fiveYearDollarSavings = annualDollarSavings * 5;
  const tenYearDollarSavings = annualDollarSavings * 10;

  // Total Modules needed (100 kW module blocks)
  const totalInverterBlocks = plantCapacityMw * 10; // 5 MW = 50x 100kW modules
  const totalHardwareCapexPremium = totalInverterBlocks * inverterCostDeltaPerUnit;

  const paybackPeriodMonths = totalHardwareCapexPremium > 0 
    ? Math.max(1, ((totalHardwareCapexPremium / annualDollarSavings) * 12)) 
    : 0;

  const co2OffsetTonsPerYear = annualEnergySavedMwh * 0.42; // ~0.42 metric tons CO2 / MWh US Grid avg

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in font-sans select-none">
      <div className="bg-[#161D27] border border-[#38BDF8]/50 rounded-md max-w-3xl w-full flex flex-col overflow-hidden shadow-2xl space-y-4 p-6 text-xs font-sans max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#212936] pb-3 font-mono">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
            <div>
              <h2 className="font-bold text-xs text-[#F1F5F9] uppercase tracking-wider">
                COMMERCIAL CONVERTER ROI & ENERGY AMORTIZATION CALCULATOR
              </h2>
              <span className="text-[10px] text-[#94A3B8] font-sans">
                Real-world financial & carbon offset model for 3-Level ANPC Silicon Carbide transition
              </span>
            </div>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-1 rounded text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F141C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sliders Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
          {/* Capacity Slider */}
          <div className="p-4 bg-[#0F141C] border border-[#212936] rounded-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#CBD5E1] flex items-center gap-1.5 font-bold">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                Plant Generation Capacity:
              </span>
              <strong className="text-sm text-[#F59E0B]">{plantCapacityMw} MW</strong>
            </div>
            <input
              type="range"
              min="0.5"
              max="50"
              step="0.5"
              value={plantCapacityMw}
              onChange={(e) => setPlantCapacityMw(Number(e.target.value))}
              className="w-full accent-[#F59E0B] cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-[#94A3B8]">
              <span>500 kW (Microgrid)</span>
              <span>25 MW</span>
              <span>50 MW (Utility Scale)</span>
            </div>
          </div>

          {/* Electricity Tariff Slider */}
          <div className="p-4 bg-[#0F141C] border border-[#212936] rounded-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#CBD5E1] flex items-center gap-1.5 font-bold">
                <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
                Electricity Tariff Rate:
              </span>
              <strong className="text-sm text-[#10B981]">${electricityTariff.toFixed(3)} / kWh</strong>
            </div>
            <input
              type="range"
              min="0.04"
              max="0.25"
              step="0.005"
              value={electricityTariff}
              onChange={(e) => setElectricityTariff(Number(e.target.value))}
              className="w-full accent-[#10B981] cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-[#94A3B8]">
              <span>$0.040/kWh (PPA)</span>
              <span>$0.120/kWh</span>
              <span>$0.250/kWh (Peak Commercial)</span>
            </div>
          </div>
        </div>

        {/* Key ROI Metrics Callout Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-3.5 bg-[#0F141C] border border-[#10B981]/40 rounded-md text-center space-y-1 shadow-sm">
            <span className="text-[9px] text-[#94A3B8] uppercase block">ANNUAL SAVINGS</span>
            <strong className="text-base text-[#10B981] block font-sans font-bold">
              ${Math.round(annualDollarSavings).toLocaleString()}
            </strong>
            <span className="text-[9px] text-[#10B981]">Every Single Year</span>
          </div>

          <div className="p-3.5 bg-[#0F141C] border border-[#38BDF8]/40 rounded-md text-center space-y-1 shadow-sm">
            <span className="text-[9px] text-[#94A3B8] uppercase block">CAPEX PAYBACK</span>
            <strong className="text-base text-[#38BDF8] block font-sans font-bold">
              {paybackPeriodMonths.toFixed(1)} Months
            </strong>
            <span className="text-[9px] text-[#38BDF8]">Rapid Amortization</span>
          </div>

          <div className="p-3.5 bg-[#0F141C] border border-[#F59E0B]/40 rounded-md text-center space-y-1 shadow-sm">
            <span className="text-[9px] text-[#94A3B8] uppercase block">5-YEAR VALUE ADD</span>
            <strong className="text-base text-[#F59E0B] block font-sans font-bold">
              ${Math.round(fiveYearDollarSavings).toLocaleString()}
            </strong>
            <span className="text-[9px] text-[#F59E0B]">Cumulative Net Gain</span>
          </div>

          <div className="p-3.5 bg-[#0F141C] border border-[#34D399]/40 rounded-md text-center space-y-1 shadow-sm">
            <span className="text-[9px] text-[#94A3B8] uppercase block">CO₂ AVOIDED</span>
            <strong className="text-base text-[#34D399] block font-sans font-bold">
              {Math.round(co2OffsetTonsPerYear).toLocaleString()} t
            </strong>
            <span className="text-[9px] text-[#34D399]">Per Year Offset</span>
          </div>
        </div>

        {/* Detailed Breakdown Comparison Table */}
        <div className="p-4 bg-[#0F141C] border border-[#212936] rounded-md space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-[#212936] pb-2 text-xs">
            <span className="font-bold text-[#F1F5F9]">ANNUAL LOSS & REVENUE MATRIX ({plantCapacityMw} MW PLANT)</span>
            <span className="text-[10px] text-[#10B981] font-bold">98.9% vs 94.8% EFFICIENCY</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between text-[#94A3B8] pb-1 border-b border-[#212936]/60 text-[10px]">
              <span>METRIC SPECIFICATION</span>
              <span>2-LEVEL SILICON IGBT</span>
              <span>3-LEVEL ANPC SiC</span>
              <span className="text-[#10B981] font-bold">SAVINGS DELTA</span>
            </div>

            <div className="flex items-center justify-between text-[#CBD5E1]">
              <span className="text-[#94A3B8]">Nominal Converter Efficiency</span>
              <span className="text-[#EF4444]">94.8%</span>
              <span className="text-[#10B981] font-bold">98.9%</span>
              <span className="text-[#10B981] font-bold">+4.10% Gain</span>
            </div>

            <div className="flex items-center justify-between text-[#CBD5E1]">
              <span className="text-[#94A3B8]">Annual Energy Dissipated as Heat</span>
              <span className="text-[#EF4444]">{Math.round(baselineLossMwh).toLocaleString()} MWh</span>
              <span className="text-[#10B981]">{Math.round(candidateLossMwh).toLocaleString()} MWh</span>
              <span className="text-[#10B981] font-bold">-{Math.round(annualEnergySavedMwh).toLocaleString()} MWh (-78.8%)</span>
            </div>

            <div className="flex items-center justify-between text-[#CBD5E1]">
              <span className="text-[#94A3B8]">10-Year Cumulative Energy Revenue</span>
              <span className="text-[#94A3B8]">$0 (Baseline)</span>
              <span className="text-[#F1F5F9]">${Math.round(tenYearDollarSavings).toLocaleString()}</span>
              <span className="text-[#10B981] font-bold">+${Math.round(tenYearDollarSavings).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-2 border-t border-[#212936] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <button
            onClick={() => {
              playClickSound();
              onOpenTour();
              onClose();
            }}
            className="text-[#94A3B8] hover:text-[#38BDF8] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Launch Product Tour</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { playClickSound(); onClose(); }}
              className="btn-secondary py-1.5 px-4 text-xs cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenSimulator();
                onClose();
              }}
              className="btn-primary py-1.5 px-4 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md bg-[#10B981] hover:bg-[#059669] text-[#0F141C] border-[#10B981]"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Simulate Losses in Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoiCalculatorModal;
