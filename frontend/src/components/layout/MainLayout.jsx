import { Outlet, useLocation } from "react-router-dom";
import AppNavbar from "./AppNavbar";

function MainLayout() {
    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    return (
        <div
            className="flex min-h-dvh w-full flex-col font-sans antialiased selection:bg-[var(--color-selected)] selection:text-[var(--color-accent)]"
            style={isLandingPage ? {} : {
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text-primary)",
            }}
        >
            {/* Structural Navigation Bar - only show on non-landing pages */}
            {!isLandingPage && <AppNavbar />}

            {/* Main Application Content Area */}
            <main className="flex flex-1 flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
