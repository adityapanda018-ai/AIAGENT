import React from 'react';
import { Table } from 'lucide-react';
import { resolveDomainEvidence } from '../services/evidenceDatabase';

interface EngineeringDecisionMatrixProps {
  taskPrompt?: string;
}

export const EngineeringDecisionMatrix: React.FC<EngineeringDecisionMatrixProps> = ({
  taskPrompt = ''
}) => {
  const domainData = resolveDomainEvidence(taskPrompt);
  const isOpticalFiber = taskPrompt.toLowerCase().includes('fiber') || 
                         taskPrompt.toLowerCase().includes('optical') || 
                         taskPrompt.toLowerCase().includes('otdr') || 
                         taskPrompt.toLowerCase().includes('micro-bend');

  // Optical Fiber Networks Matrix Comparison Data
  const opticalFiberMatrix = [
    {
      criterion: 'Detection capability',
      conventional: 'Gross faults & cuts only',
      aiEnhanced: 'Micro-bends & gradual attenuation',
      distributed: 'Continuous distributed acoustic sensing'
    },
    {
      criterion: 'Micro-degradation detection',
      conventional: 'Poor (< 0.5 dB loss threshold)',
      aiEnhanced: 'High (0.05 dB/km micro-bend loss)',
      distributed: 'Very High (< 0.01 dB threshold)'
    },
    {
      criterion: 'Localization accuracy',
      conventional: '± 5.0 meters spatial margin',
      aiEnhanced: '± 0.1 meter spatial precision (99.1%)',
      distributed: '± 0.5 meter continuous resolution'
    },
    {
      criterion: 'Real-time capability',
      conventional: 'Offline manual sweep',
      aiEnhanced: 'Near real-time (5s inference cycle)',
      distributed: 'Real-time continuous streaming'
    },
    {
      criterion: 'Predictive maintenance',
      conventional: 'None (reactive post-failure)',
      aiEnhanced: 'High (-64% MTTR reduction)',
      distributed: 'Very High (Automated alert dispatches)'
    },
    {
      criterion: 'False alarm rate',
      conventional: 'High (18.4% false trigger rate)',
      aiEnhanced: 'Low (< 2.1% with CNN-LSTM)',
      distributed: 'Low (< 1.8% with spatial filtering)'
    },
    {
      criterion: 'Deployment complexity',
      conventional: 'Low (Standard portable OTDR)',
      aiEnhanced: 'Moderate (Software AI module add-on)',
      distributed: 'High (Dedicated hardware interrogator)'
    },
    {
      criterion: 'Cost',
      conventional: 'Low CAPEX / High OPEX',
      aiEnhanced: 'Optimal ROI (Software enhancement)',
      distributed: 'High CAPEX ($50k+ interrogator)'
    }
  ];

  // Default Inverter Matrix Comparison Data (Si IGBT vs SiC ANPC vs SiC 2-Level)
  const defaultInverterMatrix = [
    {
      criterion: 'Detection / Performance capability',
      conventional: 'Baseline (Si IGBT 2-Level)',
      aiEnhanced: 'High (3-Level SiC ANPC)',
      distributed: 'Moderate (2-Level SiC MOSFET)'
    },
    {
      criterion: 'Micro-degradation / Loss',
      conventional: '310 W Dissipation',
      aiEnhanced: '180 W Dissipation (42% reduction)',
      distributed: '240 W Dissipation'
    },
    {
      criterion: 'Localization / Voltage Stress',
      conventional: 'High dv/dt (100% stress)',
      aiEnhanced: 'Low dv/dt (50% stress per switch)',
      distributed: 'High dv/dt stress'
    },
    {
      criterion: 'Real-time capability',
      conventional: '8 kHz PWM limit',
      aiEnhanced: '20 kHz PWM capable',
      distributed: '15 kHz PWM capable'
    },
    {
      criterion: 'Predictive maintenance',
      conventional: 'R_th,jc <= 0.35 K/W',
      aiEnhanced: 'R_th,jc <= 0.18 K/W',
      distributed: 'R_th,jc <= 0.25 K/W'
    },
    {
      criterion: 'False alarm rate',
      conventional: 'High thermal noise',
      aiEnhanced: 'Low thermal dissipation',
      distributed: 'Moderate thermal noise'
    },
    {
      criterion: 'Deployment complexity',
      conventional: 'Standard 6-pack module',
      aiEnhanced: 'ANPC 12-switch gate topology',
      distributed: 'Standard 6-pack SiC'
    },
    {
      criterion: 'Cost',
      conventional: 'Low semiconductor cost',
      aiEnhanced: 'Higher silicon carbide cost',
      distributed: 'Moderate cost'
    }
  ];

  const currentMatrix = isOpticalFiber ? opticalFiberMatrix : defaultInverterMatrix;
  const optionALabel = isOpticalFiber ? 'Conventional OTDR' : 'Conventional Si IGBT';
  const optionBLabel = isOpticalFiber ? 'AI-Enhanced OTDR' : '3-Level SiC ANPC';
  const optionCLabel = isOpticalFiber ? 'Distributed AI Monitoring' : '2-Level SiC MOSFET';

  return (
    <div className="glass-card p-4 bg-[#161D27] border-[#212936] rounded-sm space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[#212936] pb-2">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-[#38BDF8]" />
          <h3 className="font-bold text-[#F1F5F9] uppercase tracking-wider text-xs">
            ENGINEERING DECISION MATRIX — {domainData.domain.toUpperCase()}
          </h3>
        </div>
        <span className="text-[10px] text-[#10B981] font-bold uppercase bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/30">
          RECOMMENDED: {optionBLabel.toUpperCase()}
        </span>
      </div>

      <div className="overflow-x-auto border border-[#212936] rounded-sm bg-[#0F141C] text-[11px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#161D27] text-[#94A3B8] border-b border-[#212936]">
              <th className="p-2">CRITERION</th>
              <th className="p-2 text-[#94A3B8]">{optionALabel}</th>
              <th className="p-2 text-[#38BDF8] bg-[#38BDF8]/10 border-x border-[#38BDF8]/30 font-bold">
                ★ {optionBLabel}
              </th>
              <th className="p-2 text-[#F59E0B]">{optionCLabel}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#212936] text-[#CBD5E1]">
            {currentMatrix.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#161D27]/50 font-sans text-xs">
                <td className="p-2 font-mono text-[11px] font-bold text-[#F1F5F9]">{row.criterion}</td>
                <td className="p-2 text-[#94A3B8]">{row.conventional}</td>
                <td className="p-2 text-[#F1F5F9] font-bold bg-[#38BDF8]/5 border-x border-[#38BDF8]/20">
                  {row.aiEnhanced}
                </td>
                <td className="p-2 text-[#CBD5E1]">{row.distributed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
