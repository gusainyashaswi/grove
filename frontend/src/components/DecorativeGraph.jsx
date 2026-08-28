export default function DecorativeGraph() {
    return (
        <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] pointer-events-none z-0 opacity-80 md:opacity-100 hidden sm:block">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 300 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Lines */}
                <path
                    d="M150 50 L150 150 C150 170, 220 170, 220 190 L220 280 C220 300, 150 300, 150 320 L150 400 C150 420, 80 420, 80 440 L80 520"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    fill="none"
                />
                <path
                    d="M150 320 C150 300, 220 300, 220 280"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    fill="none"
                />
                <path
                    d="M150 150 L150 320"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    fill="none"
                />

                {/* Nodes */}
                {/* Top Node */}
                <circle cx="150" cy="50" r="14" fill="#E0F2FE" stroke="#000000" strokeWidth="2" />
                <rect x="146" y="46" width="8" height="8" transform="rotate(45 150 50)" fill="transparent" stroke="#000000" strokeWidth="1.5" />

                {/* Left Middle Node */}
                <circle cx="150" cy="200" r="14" fill="#E0F2FE" stroke="#000000" strokeWidth="2" />
                <rect x="145" y="195" width="10" height="10" fill="transparent" stroke="#000000" strokeWidth="1.5" />

                {/* Right Middle Node 1 */}
                <circle cx="220" cy="200" r="14" fill="#E8D5FF" stroke="#000000" strokeWidth="2" />
                <circle cx="220" cy="200" r="4" fill="transparent" stroke="#000000" strokeWidth="1.5" />

                {/* Right Middle Node 2 */}
                <circle cx="220" cy="280" r="14" fill="#E8D5FF" stroke="#000000" strokeWidth="2" />
                <circle cx="220" cy="280" r="4" fill="transparent" stroke="#000000" strokeWidth="1.5" />

                {/* Center Node */}
                <circle cx="150" cy="280" r="14" fill="#E0F2FE" stroke="#000000" strokeWidth="2" />
                <rect x="146" y="276" width="8" height="8" transform="rotate(45 150 280)" fill="transparent" stroke="#000000" strokeWidth="1.5" />

                {/* Bottom Left Node 1 */}
                <circle cx="80" cy="400" r="14" fill="#A7F3D0" stroke="#000000" strokeWidth="2" />
                <path d="M75 403 L85 403 L80 395 Z" fill="transparent" stroke="#000000" strokeWidth="1.5" />

                {/* Bottom Center Node */}
                <circle cx="150" cy="400" r="14" fill="#E0F2FE" stroke="#000000" strokeWidth="2" />
                <rect x="145" y="395" width="10" height="10" fill="transparent" stroke="#000000" strokeWidth="1.5" />

                {/* Bottom Left Node 2 */}
                <circle cx="80" cy="480" r="14" fill="#A7F3D0" stroke="#000000" strokeWidth="2" />
                <path d="M75 483 L85 483 L80 475 Z" fill="transparent" stroke="#000000" strokeWidth="1.5" />

            </svg>
        </div>
    );
}
