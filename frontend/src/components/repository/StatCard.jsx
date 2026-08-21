/**
 * StatCard — compact inline stat item.
 *
 * Renders as a label/value pair with no surface of its own.
 * The surface and shadow belong to the parent StatsBar container.
 *
 * Props:
 *   label  — short descriptor (e.g. "Files")
 *   value  — formatted display value (string | number)
 */
function StatCard({ label, value }) {
    return (
        <div className="flex flex-col gap-0.5 px-5 sm:px-6 py-3 sm:py-3.5 min-w-0">
            <span
                className="text-gray-400 uppercase font-medium tracking-widest truncate"
                style={{ fontSize: "var(--text-xs)" }}
            >
                {label}
            </span>
            <span
                className="text-gray-900 font-semibold tabular-nums"
                style={{
                    fontSize: "var(--text-md)",
                    letterSpacing: "var(--tracking-tight)",
                    lineHeight: "var(--leading-tight)",
                }}
            >
                {value ?? "—"}
            </span>
        </div>
    );
}

export default StatCard;