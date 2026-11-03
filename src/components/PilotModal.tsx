import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react';
import { saveSubmission } from '../storage';

interface PilotModalProps {
  onClose: () => void;
}

interface FormFields {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  organisationName: string;
}

interface FieldErrors {
  fullName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  organisationName?: string;
}

const EMPTY_FIELDS: FormFields = {
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  organisationName: '',
};

function validateFields(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }
  if (!fields.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  }
  if (!fields.emailAddress.trim()) {
    errors.emailAddress = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.emailAddress.trim())) {
    errors.emailAddress = 'Please enter a valid email address.';
  }
  if (!fields.organisationName.trim()) {
    errors.organisationName = 'Organisation name is required.';
  }
  return errors;
}

export default function PilotModal({ onClose }: PilotModalProps) {
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Prevent background scroll
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  // Focus first element on open
  useEffect(() => {
    firstFocusRef.current?.focus();
  }, []);

  // Trap focus inside modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = () =>
      Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const els = focusable();
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const handleChange = (field: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (statusMessage) setStatusMessage(null);
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (submitting) return;

      const errors = validateFields(fields);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setStatusMessage({ type: 'error', text: 'Please correct the errors below before submitting.' });
        return;
      }

      setSubmitting(true);
      setStatusMessage(null);

      const result = saveSubmission({
        fullName: fields.fullName.trim(),
        phoneNumber: fields.phoneNumber.trim(),
        emailAddress: fields.emailAddress.trim(),
        organisationName: fields.organisationName.trim(),
      });

      if (result.success) {
        setSubmitted(true);
        setStatusMessage({
          type: 'success',
          text: 'Your pilot enquiry details have been saved in this browser. This demo has not sent them to AssertTrace.',
        });
        setFields(EMPTY_FIELDS);
        setFieldErrors({});
      } else {
        setStatusMessage({ type: 'error', text: result.error });
      }

      setSubmitting(false);
    },
    [fields, submitting]
  );

  const inputClass = (_field: keyof FormFields) =>
    `w-full px-3 py-2.5 text-sm rounded-lg border transition-colors duration-150 bg-white outline-none focus-visible:ring-2 focus-visible:ring-teal-500`;

  const inputStyle = (field: keyof FormFields): React.CSSProperties => ({
    border: fieldErrors[field] ? '1px solid #EF4444' : '1px solid #CBD5E1',
    color: '#0B1220',
  });

  const localTime = new Date().toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(11,18,32,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-lg rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{ background: 'white', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b shrink-0"
          style={{ borderColor: '#F1F5F9', background: '#0B1220' }}
        >
          <div>
            <h2 id="modal-title" className="text-lg font-bold" style={{ color: '#F7F9FC' }}>
              Request a Pilot
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
              Explore a potential AssertTrace benchmark or pilot for your organisation.
            </p>
          </div>
          <button
            ref={firstFocusRef}
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-150 shrink-0"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#94A3B8' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {/* Status region */}
          <div
            ref={statusRef}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="mb-4"
          >
            {statusMessage && (
              <div
                className="rounded-lg px-4 py-3 text-sm"
                style={
                  statusMessage.type === 'success'
                    ? { background: '#E6F5F1', color: '#0F766E', border: '1px solid #A7D9D1' }
                    : { background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }
                }
              >
                {statusMessage.text}
              </div>
            )}
          </div>

          {submitted ? (
            <div className="text-center py-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#E6F5F1' }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="13" stroke="#0F766E" strokeWidth="2"/>
                  <path d="M10 16l5 5 7-8" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-base font-semibold mb-2" style={{ color: '#0B1220' }}>Details saved in this browser</p>
              <p className="text-sm" style={{ color: '#475569' }}>
                This demonstration has not transmitted your details to AssertTrace.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 text-sm font-semibold text-white rounded-lg cursor-pointer"
                style={{ background: '#0F766E' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Demo notice */}
              <div
                className="rounded-lg px-4 py-3 mb-5 text-sm"
                style={{ background: 'rgba(197,154,69,0.10)', border: '1px solid rgba(197,154,69,0.35)', color: '#92711C' }}
              >
                <strong>Demo form:</strong> your details will be saved only in this browser. They will not be sent to AssertTrace.
              </div>

              <div className="flex flex-col gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#0B1220' }}
                  >
                    Full Name <span aria-hidden="true" style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fields.fullName}
                    onChange={handleChange('fullName')}
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!fieldErrors.fullName}
                    aria-describedby={fieldErrors.fullName ? 'err-fullName' : undefined}
                    className={inputClass('fullName')}
                    style={inputStyle('fullName')}
                    placeholder="Your full name"
                  />
                  {fieldErrors.fullName && (
                    <p id="err-fullName" role="alert" className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#0B1220' }}
                  >
                    Phone Number <span aria-hidden="true" style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={fields.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={!!fieldErrors.phoneNumber}
                    aria-describedby={fieldErrors.phoneNumber ? 'err-phoneNumber' : 'hint-phoneNumber'}
                    className={inputClass('phoneNumber')}
                    style={inputStyle('phoneNumber')}
                    placeholder="+44 7700 000000"
                  />
                  <p id="hint-phoneNumber" className="mt-1 text-xs" style={{ color: '#64748B' }}>
                    Include country code if outside the UK. Leading zeros are preserved.
                  </p>
                  {fieldErrors.phoneNumber && (
                    <p id="err-phoneNumber" role="alert" className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                      {fieldErrors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="emailAddress"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#0B1220' }}
                  >
                    Email Address <span aria-hidden="true" style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={fields.emailAddress}
                    onChange={handleChange('emailAddress')}
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!fieldErrors.emailAddress}
                    aria-describedby={fieldErrors.emailAddress ? 'err-emailAddress' : undefined}
                    className={inputClass('emailAddress')}
                    style={inputStyle('emailAddress')}
                    placeholder="you@organisation.com"
                  />
                  {fieldErrors.emailAddress && (
                    <p id="err-emailAddress" role="alert" className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                      {fieldErrors.emailAddress}
                    </p>
                  )}
                </div>

                {/* Organisation Name */}
                <div>
                  <label
                    htmlFor="organisationName"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: '#0B1220' }}
                  >
                    Organisation Name <span aria-hidden="true" style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="organisationName"
                    name="organisationName"
                    value={fields.organisationName}
                    onChange={handleChange('organisationName')}
                    autoComplete="organization"
                    aria-required="true"
                    aria-invalid={!!fieldErrors.organisationName}
                    aria-describedby={fieldErrors.organisationName ? 'err-organisationName' : undefined}
                    className={inputClass('organisationName')}
                    style={inputStyle('organisationName')}
                    placeholder="Your firm or organisation"
                  />
                  {fieldErrors.organisationName && (
                    <p id="err-organisationName" role="alert" className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                      {fieldErrors.organisationName}
                    </p>
                  )}
                </div>

                {/* Submission date (read-only display) */}
                <div>
                  <p className="block text-sm font-semibold mb-1.5" style={{ color: '#0B1220' }}>
                    Submission Date/Time
                  </p>
                  <p
                    className="text-sm px-3 py-2.5 rounded-lg"
                    style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}
                    aria-label={`Will be recorded as approximately ${localTime}`}
                  >
                    Generated automatically on submission ({localTime})
                  </p>
                </div>

                {/* Notice above submit */}
                <div
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#475569' }}
                >
                  <strong style={{ color: '#0B1220' }}>Demo form:</strong> your details will be saved only in this browser. They will not be sent to AssertTrace.
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 text-sm font-semibold text-white rounded-lg cursor-pointer transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: '#0F766E' }}
                  onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = '#0d6560'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#0F766E'; }}
                >
                  {submitting ? 'Saving…' : 'Submit Pilot Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
