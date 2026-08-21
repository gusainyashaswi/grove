/**
 * IconButton — Grove common UI primitive
 *
 * A square button that holds a single icon.
 * Accepts children (pass a Lucide icon component directly).
 */

const variantStyles = {
    ghost: `
        text-[var(--color-text-secondary)]
        border border-transparent
        hover:text-[var(--color-text-primary)]
        hover:bg-[var(--color-elevated)]
    `,
    subtle: `
        text-[var(--color-text-secondary)]
        bg-[var(--color-elevated)]
        border border-[var(--color-border-muted)]
        hover:border-[var(--color-border)]
        hover:text-[var(--color-text-primary)]
    `,
};

const sizeStyles = {
    sm: "size-7",
    md: "size-9",
    lg: "size-11",
};

function IconButton({
    children,
    onClick,
    type = "button",
    variant = "ghost",
    size = "md",
    disabled = false,
    label,
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className={`
                inline-flex items-center justify-center
                rounded-[var(--radius-md)]
                transition-colors duration-[var(--duration-fast)]
                cursor-pointer
                disabled:pointer-events-none disabled:opacity-40
                ${variantStyles[variant] ?? variantStyles.ghost}
                ${sizeStyles[size] ?? sizeStyles.md}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

export default IconButton;
