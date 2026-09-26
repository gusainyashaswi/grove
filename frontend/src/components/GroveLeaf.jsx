/**
 * GroveLeaf — the shared visual anchor element present on Landing, Loading, and Stats pages.
 * Its `view-transition-name` allows the browser's View Transitions API to morph it
 * smoothly across route changes.
 *
 * Props:
 *   size     — number (px), controls the SVG viewport
 *   animated — boolean, whether the leaves slowly sway
 *   style    — extra inline styles
 *   className — extra class names
 */
export default function GroveLeaf({ size = 48, animated = false, style = {}, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{
                viewTransitionName: "grove-leaf",
                display: "block",
                flexShrink: 0,
                ...style,
            }}
            className={className}
        >
            {animated && (
                <style>{`
                    @keyframes leafSway {
                        0%,100% { transform: rotate(0deg); transform-origin: 40px 60px; }
                        30%     { transform: rotate(3deg);  transform-origin: 40px 60px; }
                        70%     { transform: rotate(-2.5deg); transform-origin: 40px 60px; }
                    }
                    @keyframes leafSway2 {
                        0%,100% { transform: rotate(0deg);  transform-origin: 40px 60px; }
                        35%     { transform: rotate(-4deg); transform-origin: 40px 60px; }
                        72%     { transform: rotate(3deg);  transform-origin: 40px 60px; }
                    }
                    @keyframes stemGrow {
                        from { stroke-dashoffset: 30; }
                        to   { stroke-dashoffset: 0; }
                    }
                    .grove-leaf-l1 { animation: leafSway  4.8s ease-in-out infinite; }
                    .grove-leaf-l2 { animation: leafSway2 5.4s ease-in-out infinite 0.4s; }
                    .grove-leaf-l3 { animation: leafSway  6.1s ease-in-out infinite 0.9s; }
                    .grove-leaf-stem { stroke-dasharray: 30; animation: stemGrow 1.2s ease-out forwards; }
                `}</style>
            )}

            {/* Trunk / stem */}
            <line
                className={animated ? "grove-leaf-stem" : ""}
                x1="40" y1="62"
                x2="40" y2="76"
                stroke="var(--ink-soft, #4c5a70)"
                strokeWidth="2.8"
                strokeLinecap="round"
            />

            {/* Ground arc */}
            <path
                d="M30 76 Q40 73 50 76"
                stroke="var(--ink-soft, #4c5a70)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
            />

            {/* Left leaf */}
            <path
                className={animated ? "grove-leaf-l2" : ""}
                d="M40 56 C32 48 18 46 16 34 C24 34 36 40 40 56Z"
                fill="var(--accent, #3b6fed)"
                opacity="0.82"
            />

            {/* Right leaf */}
            <path
                className={animated ? "grove-leaf-l3" : ""}
                d="M40 56 C48 48 62 46 64 34 C56 34 44 40 40 56Z"
                fill="var(--accent, #3b6fed)"
                opacity="0.65"
            />

            {/* Center / top leaf */}
            <path
                className={animated ? "grove-leaf-l1" : ""}
                d="M40 52 C35 38 28 22 40 12 C52 22 45 38 40 52Z"
                fill="var(--accent, #3b6fed)"
            />

            {/* Vein highlight on center leaf */}
            <line
                x1="40" y1="48"
                x2="40" y2="18"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
        </svg>
    );
}
