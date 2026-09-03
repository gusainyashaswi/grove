/**
 * GlassCard — Reusable light glassmorphic card container.
 *
 * Primary GlassCard:
 *   - Background: rgba(255, 255, 255, 0.6)
 *   - Backdrop Blur: 18px
 *   - Border: 1px solid rgba(255, 255, 255, 0.7)
 *   - Outer Shadow: 0 20px 45px -24px rgba(15, 22, 38, 0.22)
 *   - Inset Top Highlight: inset 0 1px 0 rgba(255, 255, 255, 0.6)
 *   - Border Radius: 20px
 *   - Default Padding: 24px (p-6)
 *
 * Lighter GlassPanel (variant="panel"):
 *   - Background: rgba(255, 255, 255, 0.42)
 *   - Backdrop Blur: 14px
 *   - Border: 1px solid rgba(255, 255, 255, 0.55)
 *   - Border Radius: 16px
 *   - Default Padding: 20px (p-5)
 *   - No heavy outer shadow
 */

export function GlassCard({
    children,
    variant = "card",
    className = "",
    as: Tag = "div",
    ...props
}) {
    const isPanel = variant === "panel";
    const variantClass = isPanel ? "glass-panel" : "glass-card";

    return (
        <Tag
            className={`
                ${variantClass}
                ${className}
            `.trim()}
            {...props}
        >
            {children}
        </Tag>
    );
}

export function GlassPanel({ className = "", children, ...props }) {
    return (
        <GlassCard variant="panel" className={className} {...props}>
            {children}
        </GlassCard>
    );
}

export default GlassCard;
