import FileExplorer from "./FileExplorer";
import DetailsPanel from "./DetailsPanel";
import DependencyGraph from "./DependencyGraph";
import CodePreview from "./CodePreview";
import RepositoryStructure from "./RepositoryStructure";
import RepositoryStatistics from "../repository/RepositoryStatistics";
import RepositorySummary from "./RepositorySummary";
import RepositoryQuestion from "./RepositoryQuestion";

/**
 * MainContent — 3-column workspace layout for the repository page.
 *
 * Desktop (lg+):   left sidebar | scrollable center | right details panel
 * Tablet  (md–lg): left sidebar hidden, center + right stacked
 * Mobile  (<md):   single column, all panels stacked vertically
 */
function MainContent() {
    return (
        <div className="flex gap-4 lg:gap-6 items-start">

            {/* ── LEFT: File Explorer sidebar ─────────────────────────── */}
            <aside
                className="hidden md:flex flex-col flex-shrink-0 w-52 lg:w-64 rounded-2xl overflow-hidden"
                style={{
                    background: "white",
                    boxShadow:
                        "5px 5px 12px rgba(0,0,0,0.055), -3px -3px 8px rgba(255,255,255,0.85)",
                }}
                aria-label="File explorer"
            >
                <div className="px-4 py-4 flex flex-col gap-3 h-full">
                    <FileExplorer />
                </div>
            </aside>

            {/* ── CENTER: Main analysis panels ────────────────────────── */}
            <main className="flex-1 min-w-0 flex flex-col gap-4 lg:gap-5">

                {/* Repository Summary (AI) */}
                <section
                    className="rounded-2xl px-5 py-5"
                    style={{
                        background: "white",
                        boxShadow:
                            "5px 5px 12px rgba(0,0,0,0.055), -3px -3px 8px rgba(255,255,255,0.85)",
                    }}
                >
                    <RepositorySummary />
                </section>

                {/* Repository Structure */}
                <section
                    className="rounded-2xl px-5 py-5"
                    style={{
                        background: "white",
                        boxShadow:
                            "5px 5px 12px rgba(0,0,0,0.055), -3px -3px 8px rgba(255,255,255,0.85)",
                    }}
                >
                    <RepositoryStructure />
                </section>

                {/* Repository Statistics */}
                <section
                    className="rounded-2xl px-5 py-5"
                    style={{
                        background: "white",
                        boxShadow:
                            "5px 5px 12px rgba(0,0,0,0.055), -3px -3px 8px rgba(255,255,255,0.85)",
                    }}
                >
                    <RepositoryStatistics />
                </section>

                {/* Repository Q&A (AI) */}
                <section
                    className="rounded-2xl px-5 py-5"
                    style={{
                        background: "white",
                        boxShadow:
                            "5px 5px 12px rgba(0,0,0,0.055), -3px -3px 8px rgba(255,255,255,0.85)",
                    }}
                >
                    <RepositoryQuestion />
                </section>

                {/* Dependency Graph */}
                <section
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: "white",
                        boxShadow:
                            "5px 5px 12px rgba(0,0,0,0.055), -3px -3px 8px rgba(255,255,255,0.85)",
                    }}
                >
                    <DependencyGraph />
                </section>

            </main>

            {/* ── RIGHT: File details + code preview ──────────────────── */}
            <aside
                className="hidden lg:flex flex-col flex-shrink-0 w-72 xl:w-80 gap-4 lg:gap-5"
                aria-label="File details"
            >
                <div
                    className="rounded-2xl px-4 py-4"
                    style={{
                        background: "white",
                        boxShadow:
                            "5px 5px 12px rgba(0,0,0,0.055), -3px -3px 8px rgba(255,255,255,0.85)",
                    }}
                >
                    <DetailsPanel />
                </div>

                <div
                    className="rounded-2xl px-4 py-4"
                    style={{
                        background: "white",
                        boxShadow:
                            "5px 5px 12px rgba(0,0,0,0.055), -3px -3px 8px rgba(255,255,255,0.85)",
                    }}
                >
                    <CodePreview />
                </div>
            </aside>

        </div>
    );
}

export default MainContent;