import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
    return (
        <div className="flex min-h-dvh w-full flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
