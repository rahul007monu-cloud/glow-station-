import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const control =
  'w-full rounded-2xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-gold-300/60 focus:bg-white/[0.08] focus:shadow-glow';

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
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/55">
        {label} {required && <span className="text-rose-400">*</span>}
      </span>
      <input className={control} {...rest} />
      {hint && !error && <span className="mt-1 block text-xs text-white/40">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-rose-400">{error}</span>}
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
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/55">
        {label}
      </span>
      <textarea className={`${control} min-h-[92px] resize-y`} {...rest} />
      {hint && <span className="mt-1 block text-xs text-white/40">{hint}</span>}
    </label>
  );
}
