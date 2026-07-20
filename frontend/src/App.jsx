import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Repository from "./pages/Repository";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/repository" element={<Repository />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;