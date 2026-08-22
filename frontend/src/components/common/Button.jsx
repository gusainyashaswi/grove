/**
 * Button — Grove common UI primitive
 * Variants: primary | secondary | ghost | danger | glow
 */
import { Loader2 } from "lucide-react";

const variantStyles = {
    primary: `
        bg-[var(--color-accent)] text-[#070a0f] font-semibold
        hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_20px_rgba(0,245,155,0.4)]
        border border-transparent
    `,
    secondary: `
        bg-white/5 text-slate-100 font-medium
        border border-white/10
        hover:bg-white/10 hover:border-white/20
        backdrop-blur-md
    `,
    ghost: `
        bg-transparent text-slate-400 font-medium
        border border-transparent
        hover:text-white hover:bg-white/5
    `,
    danger: `
        bg-rose-500/10 text-rose-400 font-medium
        border border-rose-500/30
        hover:bg-rose-500/20 hover:border-rose-500/50
    `,
    glow: `
        bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold
        shadow-[0_0_25px_rgba(0,245,155,0.45)] hover:shadow-[0_0_35px_rgba(0,245,155,0.65)]
        hover:scale-[1.02] active:scale-[0.98]
        border border-emerald-300/40
    `
};

const sizeStyles = {
    sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
    md: "h-10 px-4 text-sm gap-2 rounded-xl",
    lg: "h-12 px-6 text-sm font-semibold gap-2.5 rounded-xl",
    pill: "h-10 px-5 text-xs font-semibold gap-2 rounded-full",
};

function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    className = "",
    ...props
}) {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`
                inline-flex items-center justify-center
                transition-all duration-200
                cursor-pointer select-none whitespace-nowrap
                disabled:pointer-events-none disabled:opacity-40
                ${variantStyles[variant] ?? variantStyles.primary}
                ${sizeStyles[size] ?? sizeStyles.md}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <Loader2
                    size={14}
                    className="animate-spin shrink-0"
                    aria-hidden="true"
                />
            )}
            {children}
        </button>
    );
}

export default Button;
