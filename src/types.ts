export interface PilotSubmission {
  id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  organisationName: string;
  submittedAt: string; // ISO 8601
}

export type SubmissionResult =
  | { success: true; submission: PilotSubmission }
  | { success: false; error: string };
