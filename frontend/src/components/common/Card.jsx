/**
 * Card — Grove common UI primitive
 *
 * Variants: default | elevated | bordered
 */

const variantStyles = {
    default: `
        bg-[var(--color-surface)]
        border border-[var(--color-border-muted)]
    `,
    elevated: `
        bg-[var(--color-elevated)]
        border border-[var(--color-border)]
        shadow-[var(--shadow-md)]
    `,
    bordered: `
        bg-transparent
        border border-[var(--color-border)]
    `,
};

function Card({
    children,
    variant = "default",
    className = "",
    as: Tag = "div",
    ...props
}) {
    return (
        <Tag
            className={`
                rounded-[var(--radius-lg)]
                ${variantStyles[variant] ?? variantStyles.default}
                ${className}
            `}
            {...props}
        >
            {children}
        </Tag>
    );
}

export default Card;
