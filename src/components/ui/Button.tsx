import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

type Variant = 'gold' | 'ghost' | 'outline' | 'whatsapp' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  gold: 'bg-gold-sheen bg-[length:200%_auto] text-ink shadow-glow hover:bg-[position:100%_50%] hover:shadow-[0_0_60px_-10px_rgba(231,195,93,0.7)] active:scale-[0.98]',
  ghost: 'text-white/80 hover:bg-white/10 hover:text-white',
  outline:
    'border border-gold-300/40 text-gold-100 hover:border-gold-200 hover:bg-gold-300/10 hover:shadow-glow',
  whatsapp:
    'bg-[#25D366] text-[#04310f] shadow-[0_0_36px_-10px_rgba(37,211,102,0.8)] hover:brightness-110 active:scale-[0.98]',
  dark: 'border border-white/[0.12] bg-white/[0.06] text-white backdrop-blur hover:border-white/25 hover:bg-white/[0.12]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  full?: boolean;
};

export function Button({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
  icon,
  full,
  ...rest
}: PropsWithChildren<CommonProps & ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
  icon,
  full,
  href,
  external,
  ...rest
}: PropsWithChildren<
  CommonProps & { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${full ? 'w-full' : ''} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}
