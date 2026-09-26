import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Repository from "./pages/Repository";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/repository" element={<Repository />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;