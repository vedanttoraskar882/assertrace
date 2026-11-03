import type { PilotSubmission, SubmissionResult } from './types';

const STORAGE_KEY = 'asserttrace_pilot_submissions';

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback: timestamp + random
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function saveSubmission(data: Omit<PilotSubmission, 'id' | 'submittedAt'>): SubmissionResult {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let existing: PilotSubmission[] = [];

    if (raw !== null) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        return {
          success: false,
          error:
            'There is an existing storage entry that could not be read. Your details have not been saved to avoid overwriting data. Please clear browser storage manually and try again.',
        };
      }
      if (!Array.isArray(parsed)) {
        return {
          success: false,
          error:
            'Existing stored data is not in the expected format. Your details have not been saved to protect existing entries.',
        };
      }
      existing = parsed as PilotSubmission[];
    }

    const newSubmission: PilotSubmission = {
      id: generateId(),
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      organisationName: data.organisationName,
      submittedAt: new Date().toISOString(),
    };

    const updated = [...existing, newSubmission];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return { success: true, submission: newSubmission };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: `Your details could not be saved in this browser (${msg}). Please check that browser storage is available and not full.`,
    };
  }
}
