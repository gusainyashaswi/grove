/**
 * Button — pill-shaped button with three variants.
 *
 * Variants:
 *   "dark"    — black bg, white text. Lifts + fades slightly on hover.
 *   "light"   — off-white bg, ink text. Lifts + fades slightly on hover.
 *   "outline" — transparent bg, 1px --line border. Border darkens on hover.
 *
 * Renders as <a> when `href` is passed, otherwise as <button>.
 */

const BASE =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 " +
    "rounded-full font-medium text-sm leading-none " +
    "transition-all duration-200 ease-out cursor-pointer select-none " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "disabled:opacity-40 disabled:pointer-events-none";

const VARIANTS = {
    dark:
        "bg-[var(--black)] text-[var(--white)] " +
        "hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0 active:opacity-100",
    light:
        "bg-[var(--white)] text-[var(--ink)] " +
        "hover:-translate-y-0.5 hover:opacity-80 active:translate-y-0 active:opacity-100",
    outline:
        "bg-transparent text-[var(--ink)] border border-[var(--line)] " +
        "hover:border-[var(--ink)] hover:text-[var(--black)] active:border-[var(--ink-soft)]",
};

export default function Button({
    variant = "dark",
    href,
    className = "",
    children,
    ...props
}) {
    const classes = `${BASE} ${VARIANTS[variant] ?? VARIANTS.dark} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}