/**
 * Button — Grove common UI primitive
 *
 * Variants: primary | secondary | ghost | danger
 * Supports: disabled, loading states
 */
import { Loader2 } from "lucide-react";

const variantStyles = {
    primary: `
        bg-[var(--color-accent)] text-[var(--color-text-inverse)]
        hover:bg-[var(--color-accent-hover)]
        border border-transparent
    `,
    secondary: `
        bg-transparent text-[var(--color-text-primary)]
        border border-[var(--color-border)]
        hover:border-[var(--color-border-focus)] hover:bg-[var(--color-overlay)]
    `,
    ghost: `
        bg-transparent text-[var(--color-text-secondary)]
        border border-transparent
        hover:text-[var(--color-text-primary)] hover:bg-[var(--color-elevated)]
    `,
    danger: `
        bg-transparent text-[var(--color-error)]
        border border-[var(--color-border)]
        hover:bg-[var(--color-error-subtle)] hover:border-[var(--color-error)]
    `,
};

const sizeStyles = {
    sm: "h-7 px-3 text-[var(--text-xs)] gap-1.5",
    md: "h-9 px-4 text-[var(--text-sm)] gap-2",
    lg: "h-11 px-5 text-[var(--text-base)] gap-2.5",
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
                font-medium rounded-[var(--radius-md)]
                transition-colors duration-[var(--duration-fast)]
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
