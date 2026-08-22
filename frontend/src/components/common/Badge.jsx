/**
 * Badge — Grove common UI primitive
 * Variants: neutral | success | warning | error | accent | cyan | purple
 */

const variantStyles = {
    neutral: "bg-white/5 text-slate-300 border border-white/10",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
    error: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
    accent: "bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-border)]",
    cyan: "bg-sky-500/10 text-sky-400 border border-sky-500/30",
    purple: "bg-purple-500/10 text-purple-300 border border-purple-500/30",
};

function Badge({
    children,
    variant = "neutral",
    className = "",
    ...props
}) {
    return (
        <span
            className={`
                inline-flex items-center gap-1.5
                px-2.5 py-1
                text-[11px]
                font-mono font-medium
                rounded-full
                backdrop-blur-md
                transition-all duration-200
                ${variantStyles[variant] ?? variantStyles.neutral}
                ${className}
            `}
            {...props}
        >
            {children}
        </span>
    );
}

export default Badge;

