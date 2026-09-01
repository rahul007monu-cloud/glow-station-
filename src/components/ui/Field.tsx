import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const control =
  'w-full rounded-2xl border border-ivory-400/60 bg-white/75 px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none transition focus:border-gold-300/60 focus:bg-white/75 focus:shadow-glow';

type LabelProps = { label: string; hint?: string; error?: string; required?: boolean };

export function TextField({
  label,
  hint,
  error,
  required,
  ...rest
}: LabelProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label} {required && <span className="text-clay-400">*</span>}
      </span>
      <input className={control} {...rest} />
      {hint && !error && <span className="mt-1 block text-xs text-ink-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-clay-400">{error}</span>}
    </label>
  );
}

export function TextArea({
  label,
  hint,
  ...rest
}: LabelProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      <textarea className={`${control} min-h-[92px] resize-y`} {...rest} />
      {hint && <span className="mt-1 block text-xs text-ink-muted">{hint}</span>}
    </label>
  );
}
