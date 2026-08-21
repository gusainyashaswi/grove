/**
 * MainLayout — Application shell
 *
 * Provides the global Navbar and renders child routes
 * via React Router's <Outlet />.
 */
import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

function MainLayout() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100dvh",
                backgroundColor: "var(--color-bg)",
            }}
        >
            <AppNavbar />

            <main
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
