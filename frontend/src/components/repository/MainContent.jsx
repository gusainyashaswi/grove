import { useState } from "react";
import FileExplorer from "./FileExplorer";
import DetailsPanel from "./DetailsPanel";
import DependencyGraph from "./DependencyGraph";
import CodePreview from "./CodePreview";
import RepositoryStructure from "./RepositoryStructure";
import RepositoryStatistics from "./RepositoryStatistics";
import RepositorySummary from "./RepositorySummary";
import RepositoryQuestion from "./RepositoryQuestion";
import {
    LayoutDashboard,
    FileCode,
    GitFork,
    Sparkles,
    MessageSquare,
} from "lucide-react";

import { useRepository } from "../../context/RepositoryContext";

/**
 * MainContent — Advanced multi-mode developer workspace.
 */
function MainContent() {
    const [viewMode, setViewMode] = useState("graph"); // Let's default to graph for immediate feedback!
    const { sourcePreviewOpen, setSourcePreviewOpen } = useRepository() || {};

    const TABS = [
        { id: "studio", label: "Studio Hub", icon: LayoutDashboard, badge: "All" },
        { id: "editor", label: "VS Code Explorer", icon: FileCode, badge: "IDE" },
        { id: "graph", label: "Dependency Flow", icon: GitFork, badge: "Graph" },
        { id: "ai", label: "AI Architecture", icon: Sparkles, badge: "Summary" },
        { id: "chat", label: "Q&A Assistant", icon: MessageSquare, badge: "Chat" },
    ];

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* --- VIEW MODE TAB BAR --- */}
            <div className="flex items-center overflow-x-auto">
                <div className="flex items-center gap-2 p-2 rounded-2xl glass-panel border border-white/10 shadow-lg">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = viewMode === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setViewMode(tab.id)}
                                className={`
                                    flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold
                                    transition-all duration-200 cursor-pointer select-none whitespace-nowrap
                                    ${isActive
                                        ? "bg-[var(--color-accent)] text-slate-950 shadow-[0_0_20px_rgba(0,245,155,0.4)]"
                                        : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                                    }
                                `}
                            >
                                <Icon size={16} />
                                <span>{tab.label}</span>
                                {tab.badge && (
                                    <span
                                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive
                                                ? "bg-slate-950/20 text-slate-950 font-bold"
                                                : "bg-white/10 text-slate-500"
                                            }`}
                                    >
                                        {tab.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* --- VIEW MODE 1: STUDIO HUB --- */}
            {viewMode === "studio" && (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left: File Explorer */}
                    <aside
                        className="w-full lg:w-80 xl:w-[340px] shrink-0 rounded-3xl glass-card border border-white/10 p-5 shadow-xl min-h-[580px]"
                        aria-label="File explorer"
                    >
                        <FileExplorer />
                    </aside>

                    {/* Center & Right */}
                    <main className="flex-1 min-w-0 flex flex-col gap-8 w-full">
                        {/* Editor + Inspector */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                            <div className="xl:col-span-2 w-full">
                                <CodePreview />
                            </div>
                            <div className="xl:col-span-1 w-full">
                                <DetailsPanel />
                            </div>
                        </div>

                        <RepositorySummary />
                        <DependencyGraph />

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                            <RepositoryStructure />
                            <RepositoryStatistics />
                        </div>

                        <RepositoryQuestion />
                    </main>
                </div>
            )}

            {/* --- VIEW MODE 2: VS CODE EDITOR --- */}
            {viewMode === "editor" && (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <aside className="w-full lg:w-80 xl:w-[340px] shrink-0 rounded-3xl glass-card border border-white/10 p-5 shadow-xl min-h-[640px]">
                        <FileExplorer />
                    </aside>

                    <main className="flex-1 min-w-0 flex flex-col xl:flex-row gap-8 w-full">
                        <div className="flex-1 min-w-0">
                            <CodePreview />
                        </div>
                        <div className="w-full xl:w-96 shrink-0">
                            <DetailsPanel />
                        </div>
                    </main>
                </div>
            )}

            {/* --- VIEW MODE 3: DEPENDENCY FLOW (HERO REDESIGN) --- */}
            {viewMode === "graph" && (
                <main className="w-full h-[85vh] min-h-[640px] flex flex-col lg:flex-row gap-6 relative">
                    <aside className="w-full lg:w-64 xl:w-72 shrink-0 h-full overflow-hidden rounded-3xl glass-card border border-white/10 shadow-xl flex flex-col">
                        <FileExplorer />
                    </aside>

                    <div className="flex-1 min-w-0 h-full relative">
                        <DependencyGraph />
                    </div>

                    <aside className="w-full lg:w-72 xl:w-80 shrink-0 h-full overflow-y-auto hidden lg:flex flex-col gap-6">
                        <DetailsPanel />
                    </aside>
                </main>
            )}

            {/* --- VIEW MODE 4: AI ARCHITECTURE --- */}
            {viewMode === "ai" && (
                <main className="w-full flex flex-col gap-8">
                    <RepositorySummary />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <RepositoryStructure />
                        <RepositoryStatistics />
                    </div>
                    <RepositoryQuestion />
                </main>
            )}

            {/* --- Q&A CHAT ... --- */}
            {viewMode === "chat" && (
                <main className="w-full flex flex-col gap-8">
                    <RepositoryQuestion />
                    <RepositorySummary />
                </main>
            )}

            {/* --- SOURCE PREVIEW MODAL --- */}
            {sourcePreviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setSourcePreviewOpen(false)} />
                    <div className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0A0F1C]">
                        <CodePreview />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainContent;