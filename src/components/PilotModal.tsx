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
  if (!fields.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!fields.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required.';
  if (!fields.emailAddress.trim()) {
    errors.emailAddress = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.emailAddress.trim())) {
    errors.emailAddress = 'Please enter a valid email address.';
  }
  if (!fields.organisationName.trim()) errors.organisationName = 'Organisation name is required.';
  return errors;
}

export default function PilotModal({ onClose }: PilotModalProps) {
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Prevent background scroll
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  // Focus close button on open
  useEffect(() => { closeRef.current?.focus(); }, []);

  // Focus trap + Escape
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusable = () =>
      Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab') {
        const els = focusable();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === e.currentTarget) onClose(); },
    [onClose]
  );

  const handleChange = (field: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (statusMessage) setStatusMessage(null);
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (submitting) return;

      const errors = validateFields(fields);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setStatusMessage({ type: 'error', text: 'Please correct the errors highlighted below.' });
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

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: '0.9rem',
    borderRadius: '10px',
    outline: 'none',
    background: '#F7F9FC',
    color: '#0B1220',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  const inputStyle = (field: keyof FormFields): React.CSSProperties => ({
    ...inputBase,
    border: fieldErrors[field] ? '1px solid #EF4444' : '1px solid #DDE4EF',
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(8,15,28,0.8)', backdropFilter: 'blur(6px)' }}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full sm:max-w-[480px] flex flex-col"
        style={{
          background: 'white',
          boxShadow: '0 32px 96px rgba(8,15,28,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
          borderRadius: '20px 20px 0 0',
          maxHeight: '95vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-5 shrink-0"
          style={{
            borderBottom: '1px solid #F1F5F9',
            background: 'linear-gradient(160deg, #0B1220 0%, #0F2A28 100%)',
            borderRadius: '20px 20px 0 0',
          }}
        >
          <div>
            <h2
              id="modal-title"
              className="text-[1.125rem] font-bold"
              style={{ color: '#F7F9FC', letterSpacing: '-0.01em' }}
            >
              Request a Pilot
            </h2>
            <p className="text-[0.8rem] mt-0.5" style={{ color: '#64748B' }}>
              Explore a potential AssertTrace benchmark or pilot for your organisation.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150 shrink-0"
            style={{ background: 'rgba(255,255,255,0.07)', color: '#94A3B8' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">

          {/* Status region */}
          <div role="status" aria-live="polite" aria-atomic="true">
            {statusMessage && (
              <div
                className="rounded-xl px-4 py-3 text-sm mb-5"
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

          {/* Success state */}
          {submitted ? (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#E6F5F1' }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <circle cx="14" cy="14" r="11" stroke="#0F766E" strokeWidth="1.8" />
                  <path d="M8.5 14l4 4 7-7" stroke="#0F766E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-[1rem] font-bold mb-2" style={{ color: '#0B1220' }}>
                Details saved in this browser
              </p>
              <p className="text-sm leading-[1.7]" style={{ color: '#64748B' }}>
                This demonstration has not transmitted your details to AssertTrace.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 text-sm font-semibold text-white rounded-lg cursor-pointer transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #0F766E 0%, #0d6560 100%)', boxShadow: '0 2px 8px rgba(15,118,110,0.35)' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-5">

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold mb-1.5" style={{ color: '#0B1220' }}>
                    Full Name <span aria-hidden="true" style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fields.fullName}
                    onChange={handleChange('fullName')}
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!fieldErrors.fullName}
                    aria-describedby={fieldErrors.fullName ? 'err-fullName' : undefined}
                    style={inputStyle('fullName')}
                    placeholder=""
                  />
                  {fieldErrors.fullName && (
                    <p id="err-fullName" role="alert" className="mt-1.5 text-xs" style={{ color: '#EF4444' }}>
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-1.5" style={{ color: '#0B1220' }}>
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
                    style={inputStyle('phoneNumber')}
                    placeholder=""
                  />
                  <p id="hint-phoneNumber" className="mt-1.5 text-xs" style={{ color: '#94A3B8' }}>
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
                  <label htmlFor="emailAddress" className="block text-sm font-semibold mb-1.5" style={{ color: '#0B1220' }}>
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
                    style={inputStyle('emailAddress')}
                    placeholder=""
                  />
                  {fieldErrors.emailAddress && (
                    <p id="err-emailAddress" role="alert" className="mt-1.5 text-xs" style={{ color: '#EF4444' }}>
                      {fieldErrors.emailAddress}
                    </p>
                  )}
                </div>

                {/* Organisation Name */}
                <div>
                  <label htmlFor="organisationName" className="block text-sm font-semibold mb-1.5" style={{ color: '#0B1220' }}>
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
                    style={inputStyle('organisationName')}
                    placeholder=""
                  />
                  {fieldErrors.organisationName && (
                    <p id="err-organisationName" role="alert" className="mt-1.5 text-xs" style={{ color: '#EF4444' }}>
                      {fieldErrors.organisationName}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 text-[0.9375rem] font-semibold text-white rounded-xl cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #0F766E 0%, #0d6560 100%)',
                    boxShadow: '0 4px 16px rgba(15,118,110,0.35)',
                    marginTop: '4px',
                  }}
                  onMouseEnter={(e) => { if (!submitting) { e.currentTarget.style.boxShadow = '0 6px 24px rgba(15,118,110,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,118,110,0.35)'; e.currentTarget.style.transform = ''; }}
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
