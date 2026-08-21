/**
 * PageContainer — Standard layout wrapper for page content
 *
 * Provides horizontal padding, responsive margins, and content max-width bounds.
 */

function PageContainer({
    children,
    className = "",
    maxWidth = "var(--container-max-w)",
    fullWidth = false,
}) {
    return (
        <div
            className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`}
            style={
                fullWidth
                    ? { maxWidth: "100%" }
                    : { maxWidth }
            }
        >
            {children}
        </div>
    );
}

export default PageContainer;
