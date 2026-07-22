import { createContext, useContext, useState } from "react";

const RepositoryContext = createContext();

export function RepositoryProvider({ children }) {
    const [repository, setRepository] = useState(null);

    return (
        <RepositoryContext.Provider
            value={{ repository, setRepository }}
        >
            {children}
        </RepositoryContext.Provider>
    );
}

export function useRepository() {
    return useContext(RepositoryContext);
}