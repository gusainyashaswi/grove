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
            content: `import ReactSharedInternals from 'shared/ReactSharedInternals';\nimport { renderWithHooks } from './ReactFiberHooks';\n\nfunction beginWork(current, workInProgress, renderLanes) {\n  if (current !== null) {\n    const oldProps = current.memoizedProps;\n    const newProps = workInProgress.pendingProps;\n  }\n  return updateFunctionComponent(current, workInProgress);\n}`,
            dependencies: ["ReactFiberHooks.js", "ReactFiberCompleteWork.js", "ReactSharedInternals.js"],
            dependents: ["ReactFiberWorkLoop.js"]
        },
        {
            name: "ReactFiberWorkLoop.js",
            path: "packages/react-reconciler/ReactFiberWorkLoop.js",
            folder: "react-reconciler",
            lineCount: 2420,
            extension: ".js",
            content: `import { beginWork } from './ReactFiberBeginWork';\n\nfunction workLoopSync() {\n  while (workInProgress !== null) {\n    performUnitOfWork(workInProgress);\n  }\n}`,
            dependencies: ["ReactFiberBeginWork.js"],
            dependents: ["ReactDOMRoot.js"]
        },
        {
            name: "ReactFiberHooks.js",
            path: "packages/react-reconciler/ReactFiberHooks.js",
            folder: "react-reconciler",
            lineCount: 1450,
            extension: ".js",
            content: `import ReactSharedInternals from 'shared/ReactSharedInternals';\n\nexport function renderWithHooks(current, workInProgress, Component, props) {\n  currentlyRenderingFiber = workInProgress;\n  const children = Component(props);\n  return children;\n}`,
            dependencies: ["ReactSharedInternals.js"],
            dependents: ["ReactFiberBeginWork.js"]
        },
        {
            name: "ReactFiberCompleteWork.js",
            path: "packages/react-reconciler/ReactFiberCompleteWork.js",
            folder: "react-reconciler",
            lineCount: 890,
            extension: ".js",
            content: `export function completeWork(current, workInProgress, renderLanes) {\n  const newProps = workInProgress.pendingProps;\n  bubbleProperties(workInProgress);\n  return null;\n}`,
            dependencies: [],
            dependents: ["ReactFiberBeginWork.js"]
        },
        {
            name: "ReactDOMRoot.js",
            path: "packages/react-dom/ReactDOMRoot.js",
            folder: "react-dom",
            lineCount: 320,
            extension: ".js",
            content: `import { scheduleUpdateOnFiber } from 'react-reconciler/ReactFiberWorkLoop';\n\nexport function createRoot(container) {\n  return new ReactDOMRoot(container);\n}`,
            dependencies: ["ReactFiberWorkLoop.js"],
            dependents: []
        },
        {
            name: "React.js",
            path: "packages/react/React.js",
            folder: "react",
            lineCount: 140,
            extension: ".js",
            content: `import ReactSharedInternals from 'shared/ReactSharedInternals';\n\nexport { useState, useEffect, useMemo } from './ReactHooks';`,
            dependencies: ["ReactSharedInternals.js"],
            dependents: []
        },
        {
            name: "ReactSharedInternals.js",
            path: "packages/shared/ReactSharedInternals.js",
            folder: "shared",
            lineCount: 65,
            extension: ".js",
            content: `const ReactSharedInternals = {\n  ReactCurrentDispatcher: { current: null },\n  ReactCurrentBatchConfig: { transition: null },\n};\n\nexport default ReactSharedInternals;`,
            dependencies: [],
            dependents: ["ReactFiberBeginWork.js", "ReactFiberHooks.js", "React.js"]
        }
    ],
    dependencyGraph: {
        nodes: [
            { id: "packages/react-dom/ReactDOMRoot.js", label: "ReactDOMRoot.js", type: "file" },
            { id: "packages/react-reconciler/ReactFiberWorkLoop.js", label: "ReactFiberWorkLoop.js", type: "file" },
            { id: "packages/react-reconciler/ReactFiberBeginWork.js", label: "ReactFiberBeginWork.js", type: "file" },
            { id: "packages/react-reconciler/ReactFiberHooks.js", label: "ReactFiberHooks.js", type: "file" },
            { id: "packages/react-reconciler/ReactFiberCompleteWork.js", label: "ReactFiberCompleteWork.js", type: "file" },
            { id: "packages/react/React.js", label: "React.js", type: "file" },
            { id: "packages/shared/ReactSharedInternals.js", label: "ReactSharedInternals.js", type: "file" }
        ],
        edges: [
            { id: "e-root-workloop", source: "packages/react-dom/ReactDOMRoot.js", target: "packages/react-reconciler/ReactFiberWorkLoop.js" },
            { id: "e-workloop-beginwork", source: "packages/react-reconciler/ReactFiberWorkLoop.js", target: "packages/react-reconciler/ReactFiberBeginWork.js" },
            { id: "e-beginwork-hooks", source: "packages/react-reconciler/ReactFiberBeginWork.js", target: "packages/react-reconciler/ReactFiberHooks.js" },
            { id: "e-beginwork-completework", source: "packages/react-reconciler/ReactFiberBeginWork.js", target: "packages/react-reconciler/ReactFiberCompleteWork.js" },
            { id: "e-beginwork-shared", source: "packages/react-reconciler/ReactFiberBeginWork.js", target: "packages/shared/ReactSharedInternals.js" },
            { id: "e-hooks-shared", source: "packages/react-reconciler/ReactFiberHooks.js", target: "packages/shared/ReactSharedInternals.js" },
            { id: "e-react-shared", source: "packages/react/React.js", target: "packages/shared/ReactSharedInternals.js" }
        ]
    }
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