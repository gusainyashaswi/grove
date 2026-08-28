/**
 * Chip — small pill-shaped label/tag.
 *
 * 1px --line border, muted text color.
 * On hover: border and text darken toward --ink.
 *
 * Props:
 *   onClick  — optional click handler (renders a <button> when provided,
 *               otherwise a <span> for purely decorative chips)
 *   children — chip label content
 *   className — additional classes
 */

const BASE =
    "inline-flex items-center gap-1 px-3 py-1 " +
    "rounded-full text-xs font-medium leading-none " +
    "border border-[var(--line)] text-[var(--muted)] " +
    "transition-all duration-150 ease-out select-none";

const INTERACTIVE =
    "cursor-pointer hover:border-[var(--ink-soft)] hover:text-[var(--ink)] " +
    "active:border-[var(--ink)] active:text-[var(--black)]";

export default function Chip({ onClick, className = "", children, ...props }) {
    const classes = `${BASE} ${onClick ? INTERACTIVE : ""} ${className}`;

    if (onClick) {
        return (
            <button
                type="button"
                className={classes}
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        );
    }

    return (
        <span className={classes} {...props}>
            {children}
        </span>
    );
}
