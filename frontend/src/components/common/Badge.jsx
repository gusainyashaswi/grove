/**
 * Badge — Grove common UI primitive
 *
 * Variants: neutral | success | warning | error | accent
 */

const variantStyles = {
    neutral: `
        bg-[var(--color-elevated)]
        text-[var(--color-text-secondary)]
        border border-[var(--color-border)]
    `,
    success: `
        bg-[var(--color-success-subtle)]
        text-[var(--color-success)]
        border border-[var(--color-accent-border)]
    `,
    warning: `
        bg-[var(--color-warning-subtle)]
        text-[var(--color-warning)]
        border border-[var(--color-warning)]
    `,
    error: `
        bg-[var(--color-error-subtle)]
        text-[var(--color-error)]
        border border-[var(--color-error)]
    `,
    accent: `
        bg-[var(--color-accent-subtle)]
        text-[var(--color-accent)]
        border border-[var(--color-accent-border)]
    `,
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
                inline-flex items-center
                px-2 py-0.5
                text-[var(--text-xs)]
                font-medium
                rounded-[var(--radius-full)]
                leading-[1.4]
                tracking-[var(--tracking-wide)]
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
