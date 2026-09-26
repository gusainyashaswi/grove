import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";

function AiArchitectureCard() {
    const { repository, setActiveTab } = useRepository() || {};

    const summaryText = repository?.summary ||
        "This repository is organized around a core reconciliation and component graph. The architecture cleanly separates modular logic, utility helpers, and dependency coordinators to ensure performant execution.";

    const handleReadFull = () => {
        if (setActiveTab) {
            setActiveTab("ai");
        }
    };

    return (
        <section aria-label="AI architecture summary" className="w-full">
            {/* Block Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-[var(--ink)]">
                        AI architecture summary
                    </h2>
                    <span className="badge badge-accent text-[11px]">
                        Deep analysis
                    </span>
                </div>
                <button
                    onClick={handleReadFull}
                    className="text-xs sm:text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] cursor-pointer transition-colors flex items-center gap-1"
                >
                    <span>View full summary</span>
                    <ArrowRight size={13} />
                </button>
            </div>

            {/* Symmetrical GlassCard Container */}
            <GlassCard className="flex flex-col gap-4 p-6 sm:p-7">
                {/* Header row inside card */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[var(--line-soft)] flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                        <BookOpen size={18} className="text-[var(--accent)] shrink-0" />
                        <span className="font-semibold text-[14.5px] text-[var(--ink)]">
                            Architectural synthesis
                        </span>
                    </div>
                    <span className="badge badge-accent">
                        <Sparkles size={11} className="mr-0.5" />
                        AI Summary
                    </span>
                </div>

                {/* Body paragraph */}
                <p className="text-[14.5px] sm:text-[15px] leading-relaxed text-[var(--ink-soft)] font-normal">
                    {summaryText}
                </p>

                {/* Footer action row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--line-soft)] mt-1">
                    <span className="font-mono text-xs text-[var(--muted)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-70" />
                        Synthesized from AST dependencies and call hierarchies
                    </span>
                    <button
                        onClick={handleReadFull}
                        className="btn-outline shrink-0 self-start sm:self-auto"
                    >
                        <span>Read full breakdown</span>
                        <ArrowRight size={13} />
                    </button>
                </div>
            </GlassCard>
        </section>
    );
}

export default AiArchitectureCard;

