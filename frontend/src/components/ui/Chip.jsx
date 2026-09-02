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
    "inline-flex items-center gap-1 px-3.5 py-1.5 " +
    "rounded-full text-xs font-semibold leading-none " +
    "bg-white/70 backdrop-blur-lg border border-white/90 text-[var(--ink)] " +
    "shadow-[0_4px_16px_rgba(13,27,42,0.06)] " +
    "transition-all duration-150 ease-out select-none";

const INTERACTIVE =
    "cursor-pointer hover:bg-white/95 hover:border-white hover:text-[var(--ink)] hover:shadow-[0_6px_20px_rgba(13,27,42,0.12)] " +
    "active:scale-[0.97]";

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
