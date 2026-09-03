import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";

function AiInsights() {
    const { repository } = useRepository() || {};

    const repoName = repository?.name || "react";
    const framework = repository?.structure?.framework || "React";

    const STEPS = [
        {
            num: "01",
            title: "Project overview",
            content: (
                <p>
                    A declarative library for building user interfaces from composable components,
                    built around a fiber-based reconciliation engine that separates scheduling from rendering.
                </p>
            ),
        },
        {
            num: "02",
            title: "Detected technologies",
            content: (
                <p>
                    {framework}, no backend framework detected — this repository is a frontend library rather than an application.
                </p>
            ),
        },
        {
            num: "03",
            title: "Repository organization",
            content: (
                <p>
                    Split into packages by concern: <strong>react-reconciler</strong> (core engine),{" "}
                    <strong>react-dom</strong> (DOM renderer), and <strong>shared</strong> (cross-package internals).
                </p>
            ),
        },
        {
            num: "04",
            title: "Important files",
            content: (
                <ul>
                    <li>
                        <strong>ReactFiberWorkLoop.js</strong> — central scheduling loop
                    </li>
                    <li>
                        <strong>ReactFiberBeginWork.js</strong> — per-fiber work unit
                    </li>
                </ul>
            ),
        },
        {
            num: "05",
            title: "Application entry point",
            content: (
                <p>
                    <span className="font-mono text-xs bg-white/60 border border-[var(--line)] px-2 py-0.5 rounded-md text-[var(--ink)]">
                        packages/react/src/React.js
                    </span>
                </p>
            ),
        },
        {
            num: "06",
            title: "Key dependency relationships",
            content: (
                <p>
                    ReactFiberWorkLoop.js is the most relied-upon internal module, referenced by 27 other files across the reconciler.
                </p>
            ),
        },
        {
            num: "07",
            title: "Statistics & health insights",
            content: (
                <p>
                    Codebase health is strong overall; a small number of large files (&gt;900 lines) concentrated in the reconciler are natural refactor candidates.
                </p>
            ),
        },
        {
            num: "08",
            title: "Recommended starting point",
            content: (
                <p>
                    Start at{" "}
                    <span className="font-mono text-xs bg-white/60 border border-[var(--line)] px-2 py-0.5 rounded-md text-[var(--ink)]">
                        ReactFiberWorkLoop.js
                    </span>
                    , then trace into{" "}
                    <span className="font-mono text-xs bg-white/60 border border-[var(--line)] px-2 py-0.5 rounded-md text-[var(--ink)]">
                        ReactFiberBeginWork.js
                    </span>{" "}
                    to understand the render phase.
                </p>
            ),
        },
        {
            num: "09",
            title: "Overall summary",
            content: (
                <p>
                    A mature, cleanly separated codebase where the reconciliation engine and renderer are deliberately decoupled through a shared internals layer.
                </p>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Page Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="eyebrow font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
                        // grounded architecture summary
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">
                        AI insights
                    </h1>
                </div>
                <span className="chip !border-[var(--accent-line)] !bg-[var(--accent-soft)] !text-[var(--accent)] font-semibold">
                    Gemini · grounded
                </span>
            </div>

            {/* Large GlassCard Container */}
            <GlassCard className="!p-8 sm:!p-9">
                <div className="ai-steps">
                    {STEPS.map((step) => (
                        <div key={step.num} className="ai-step">
                            <div className="ai-step-num">{step.num}</div>
                            <div>
                                <h3>{step.title}</h3>
                                {step.content}
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}

export default AiInsights;
