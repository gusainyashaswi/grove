import { createContext, useContext, useState } from "react";

const RepositoryContext = createContext();

const DEFAULT_REPO = {
    name: "react",
    owner: "facebook",
    fullName: "facebook/react",
    url: "https://github.com/facebook/react",
    structure: {
        framework: "React",
        folders: {
            "components": 38,
            "utils": 21,
            "hooks": 14,
            "services": 9,
            "config": 6
        }
    },
    statistics: {
        totalFiles: 1842,
        totalFolders: 214,
        totalLines: 96400,
        averageLinesPerFile: 52,
        averageDependencies: 4.2,
        maximumDependencies: 27,
    },
    files: [
        {
            name: "ReactFiberBeginWork.js",
            path: "packages/react-reconciler/ReactFiberBeginWork.js",
            folder: "react-reconciler",
            lineCount: 1184,
            extension: ".js",
            content: `import ReactSharedInternals from 'shared/ReactSharedInternals';\n\nfunction beginWork(current, workInProgress, renderLanes) {\n  if (current !== null) {\n    const oldProps = current.memoizedProps;\n    const newProps = workInProgress.pendingProps;\n  }\n  return updateFunctionComponent(current, workInProgress);\n}`,
            dependencies: ["ReactFiber.js", "ReactLanes.js", "ReactHooks.js"],
            dependents: ["ReactFiberWorkLoop.js", "ReactFiberCompleteWork.js"]
        }
    ]
};

export function RepositoryProvider({ children }) {
    const [repository, setRepository] = useState(DEFAULT_REPO);
    const [selectedFile, setSelectedFile] = useState(DEFAULT_REPO.files[0]);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <RepositoryContext.Provider
            value={{ repository, setRepository, selectedFile, setSelectedFile, activeTab, setActiveTab }}
        >
            {children}
        </RepositoryContext.Provider>
    );
}

export function useRepository() {
    return useContext(RepositoryContext);
}