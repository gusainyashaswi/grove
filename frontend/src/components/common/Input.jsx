/**
 * Input — Grove common UI primitive
 *
 * States: default, focus, error, disabled
 */

function Input({
    value,
    onChange,
    onKeyDown,
    placeholder,
    type = "text",
    disabled = false,
    error = false,
    id,
    name,
    className = "",
    ...props
}) {
    return (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={`
                w-full h-9
                px-3
                font-[family-name:var(--font-sans)]
                text-[var(--text-sm)]
                text-[var(--color-text-primary)]
                placeholder:text-[var(--color-text-muted)]
                bg-[var(--color-elevated)]
                border rounded-[var(--radius-md)]
                outline-none
                transition-colors duration-[var(--duration-fast)]
                disabled:pointer-events-none disabled:opacity-40
                ${error
                    ? "border-[var(--color-error)] focus:border-[var(--color-error)]"
                    : "border-[var(--color-border)] focus:border-[var(--color-border-focus)]"
                }
                ${className}
            `}
            {...props}
        />
    );
}

export default Input;
