import { createContext, useContext, useState } from "react";

const RepositoryContext = createContext();

export function RepositoryProvider({ children }) {
    const [repository, setRepository] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <RepositoryContext.Provider
            value={{ repository, setRepository, selectedFile, setSelectedFile }}
        >
            {children}
        </RepositoryContext.Provider>
    );
}

export function useRepository() {
    return useContext(RepositoryContext);
}