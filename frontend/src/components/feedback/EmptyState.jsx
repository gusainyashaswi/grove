/**
 * EmptyState — displayed when no content is available
 */

function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
            {Icon && (
                <Icon
                    size={32}
                    className="text-[var(--color-text-muted)]"
                    aria-hidden="true"
                    strokeWidth={1.5}
                />
            )}
            {title && (
                <p className="text-[var(--text-sm)] font-medium text-[var(--color-text-secondary)]">
                    {title}
                </p>
            )}
            {description && (
                <p className="text-[var(--text-xs)] text-[var(--color-text-muted)] max-w-xs">
                    {description}
                </p>
            )}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}

export default EmptyState;
