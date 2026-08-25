export interface ResilienceScenario {
  id: string;
  code: string;
  name: string;
  status: 'UNTESTED' | 'TESTING' | 'RECOVERED' | 'INTERVENTION_REQUIRED';
  details: string;
  telemetryLog: string[];
  actionLabel?: string;
  resultSummary: string;
}

export interface RecoveryPolicyItem {
  trigger: string;
  policy: string;
}

export const RECOVERY_POLICY_MATRIX: RecoveryPolicyItem[] = [
  { trigger: 'Source failure', policy: 'Retry → Fallback' },
  { trigger: 'Evidence shortage', policy: 'Expand search' },
  { trigger: 'Specialist failure', policy: 'Reassign task' },
  { trigger: 'Conflicting evidence', policy: 'Cross-check' },
  { trigger: 'Invalid data', policy: 'Reject' },
  { trigger: 'API timeout', policy: 'Retry' },
  { trigger: 'Database failure', policy: 'Cache → Reconnect' }
];

export const DEFAULT_RESILIENCE_SCENARIOS: ResilienceScenario[] = [
  {
    id: 'sc-01',
    code: '01',
    name: 'Source Retrieval Failure',
    status: 'UNTESTED',
    details: 'Simulate primary research API failure with fallback provider retry.',
    telemetryLog: [
      'RESEARCH API: Primary service failed (HTTP 503)',
      'FALLBACK: Switching to IEEE secondary mirror',
      'RETRY: Attempt 2 successful',
      'RECOVERY: Investigation continued cleanly'
    ],
    resultSummary: 'No data loss (Recovered automatically)'
  },
  {
    id: 'sc-02',
    code: '02',
    name: 'No Relevant Evidence',
    status: 'UNTESTED',
    details: 'Retrieved sources fail minimum relevance threshold filter.',
    telemetryLog: [
      'SOURCES RETRIEVED: 14',
      'RELEVANT SOURCES: 2 (Relevance >= 0.65)',
      'REQUIRED MINIMUM: 5 sources',
      'STATUS: CONCLUSION GENERATION PAUSED (Threshold not satisfied)'
    ],
    actionLabel: 'REFINE SEARCH',
    resultSummary: 'Required intervention (Avoided false conclusion)'
  },
  {
    id: 'sc-03',
    code: '03',
    name: 'Conflicting Sources',
    status: 'UNTESTED',
    details: 'Discrepancy detected between IEEE 2024 and experimental dataset.',
    telemetryLog: [
      'SOURCE A: η = 97.2% (@ 8kHz)',
      'SOURCE B: η = 98.1% (@ 10kHz)',
      'CAUSE: Different switching frequencies & test temperatures',
      'RESOLUTION: Operating conditions normalized to 10kHz @ 25°C'
    ],
    actionLabel: 'VIEW RESOLUTION',
    resultSummary: 'Normalized → η = 97.8% (✓ RESOLVED)'
  },
  {
    id: 'sc-04',
    code: '04',
    name: 'Specialist Failure',
    status: 'UNTESTED',
    details: 'DataPulse quantitative module encounters execution timeout.',
    telemetryLog: [
      'DATAPULSE: Analysis module unavailable (Timeout 15s)',
      'FALLBACK: Reassigned to Apex + Nova specialist pair',
      'IMPACT: Quantitative verification unavailable',
      'ACTION: Marked conclusion as CONDITIONAL'
    ],
    resultSummary: 'Recovered automatically (Marked CONDITIONAL)'
  },
  {
    id: 'sc-05',
    code: '05',
    name: 'API Timeout',
    status: 'UNTESTED',
    details: 'External literature search request times out after 30s.',
    telemetryLog: [
      'RESEARCH SERVICE: Request timeout (30s)',
      'ACTION: Retry 1 ✓ (Failed)',
      'ACTION: Retry 2 ✓ (Successful)',
      'RESULT: Recovered cleanly'
    ],
    resultSummary: 'Recovered automatically'
  },
  {
    id: 'sc-06',
    code: '06',
    name: 'Invalid Research Objective',
    status: 'UNTESTED',
    details: 'User enters overly broad prompt ("Tell me everything about electricity").',
    telemetryLog: [
      'INPUT EVALUATION: "Tell me everything about electricity"',
      'CLASSIFICATION: OBJECTIVE TOO BROAD',
      'SUGGESTION: "Compare SiC and Si IGBT switching performance for 100 kW industrial inverters"'
    ],
    actionLabel: 'USE SUGGESTION',
    resultSummary: 'Required intervention (Suggested refinement)'
  },
  {
    id: 'sc-07',
    code: '07',
    name: 'Database Failure',
    status: 'UNTESTED',
    details: 'PostgreSQL connection drops mid-investigation.',
    telemetryLog: [
      'DATABASE: Connection lost (ECONNREFUSED)',
      'LOCAL CACHE: Active & preserved',
      'CURRENT INVESTIGATION: Preserved in IndexedDB workspace cache',
      'RECOVERY: Background reconnection attempt 1 successful'
    ],
    resultSummary: 'No data loss (Preserved locally)'
  },
  {
    id: 'sc-08',
    code: '08',
    name: 'Calculation Failure',
    status: 'UNTESTED',
    details: 'DataPulse receives unphysical numerical input (Efficiency = -4%).',
    telemetryLog: [
      'QUANTITATIVE VALIDATION: Input Efficiency = -4%',
      'VALIDATION FAILED: Value outside physical bounds (0% to 100%)',
      'ACTION: Outlier claim excluded from synthesis'
    ],
    resultSummary: 'Recovered automatically (Claim excluded)'
  }
];
