/**
 * MainLayout — Application shell component
 *
 * Provides top navbar, main content viewport layout, and renders child pages
 * via React Router's <Outlet />.
 */
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

function MainLayout() {
    return (
        <div
            className="flex min-h-dvh w-full flex-col font-sans antialiased selection:bg-[var(--color-selected)] selection:text-[var(--color-accent)]"
            style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text-primary)",
            }}
        >
            {/* Structural Navigation Bar */}
            <AppNavbar />

            {/* Main Application Content Area */}
            <main className="flex flex-1 flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
