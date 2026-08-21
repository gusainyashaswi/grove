/**
 * PageContainer — responsive page content wrapper
 *
 * Provides consistent horizontal padding and max-width centering.
 * Use as the outermost wrapper inside each page component.
 */

function PageContainer({ children, className = "", maxWidth = "var(--container-2xl)" }) {
    return (
        <div
            style={{
                width: "100%",
                maxWidth,
                margin: "0 auto",
                padding: `var(--space-8) var(--space-6)`,
            }}
            className={className}
        >
            {children}
        </div>
    );
}

export default PageContainer;
