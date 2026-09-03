import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
    return (
        <div className="flex min-h-dvh w-full flex-col relative">
            {/* Atmospheric background blobs */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />

            <Navbar />
            <main className="flex flex-1 flex-col w-full relative z-10">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
