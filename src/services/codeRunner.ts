export interface CodeRunResult {
  success: boolean;
  logs: string[];
  result?: any;
  error?: string;
  executionTimeMs: number;
}

export function executeJavaScript(code: string): CodeRunResult {
  const startTime = performance.now();
  const logs: string[] = [];

  // Create custom console interceptor
  const mockConsole = {
    log: (...args: any[]) => {
      logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '));
    },
    error: (...args: any[]) => {
      logs.push(`[ERROR] ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')}`);
    },
    warn: (...args: any[]) => {
      logs.push(`[WARN] ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')}`);
    },
    info: (...args: any[]) => {
      logs.push(`[INFO] ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')}`);
    }
  };

  try {
    // Construct execution scope
    const safeFunction = new Function('console', `
      "use strict";
      ${code}
    `);

    const result = safeFunction(mockConsole);
    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;

    return {
      success: true,
      logs,
      result: result !== undefined ? result : (logs.length > 0 ? logs[logs.length - 1] : 'Executed successfully'),
      executionTimeMs
    };
  } catch (err: any) {
    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
    return {
      success: false,
      logs,
      error: err?.message || String(err),
      executionTimeMs
    };
  }
}
