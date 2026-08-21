/**
 * GroveLogo — Custom SVG brand mark for Grove
 *
 * Conceptually communicates connected repository architecture,
 * structural nodes, and software intelligence.
 */

function GroveLogo({ size = 20, className = "", color = "var(--color-accent)" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`shrink-0 ${className}`}
            aria-hidden="true"
        >
            {/* Connected branch lines */}
            <path
                d="M12 20V12M12 12L7 7M12 12L17 7M7 7V4M17 7V4"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Structural Nodes */}
            <circle cx="12" cy="20" r="2" fill={color} />
            <circle cx="7" cy="4" r="2" fill={color} />
            <circle cx="17" cy="4" r="2" fill={color} />
            <circle cx="12" cy="12" r="2.2" fill="var(--color-bg-secondary)" stroke={color} strokeWidth="2" />
        </svg>
    );
}

export default GroveLogo;
