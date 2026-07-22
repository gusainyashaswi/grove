import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RepositoryProvider } from "./context/RepositoryContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    
<RepositoryProvider>
        <App />
</RepositoryProvider>
);