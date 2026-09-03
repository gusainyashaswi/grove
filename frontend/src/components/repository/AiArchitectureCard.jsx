import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";
import { BookOpen } from "lucide-react";

function AiArchitectureCard() {
    const { repository, setActiveTab } = useRepository() || {};

    const summaryText = repository?.summary ||
        "React is a declarative UI library organized around a fiber-based reconciler. The codebase splits cleanly into the core reconciliation engine, the DOM renderer, and a shared internals layer used to coordinate state between them...";

    const handleReadFull = () => {
        if (setActiveTab) {
            setActiveTab("ai");
        }
    };

    return (
        <section aria-label="AI architecture summary" className="w-full">
            {/* Block Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-display tracking-tight text-[var(--ink)]">
                    AI architecture summary
                </h2>
                <button
                    onClick={handleReadFull}
                    className="text-xs font-mono text-[var(--muted)] hover:text-[var(--ink-soft)] cursor-pointer transition-colors"
                >
                    View full summary →
                </button>
            </div>

            {/* GlassCard with Badge, Icon Box, Summary Paragraph & CTA */}
            <GlassCard className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-wrap p-6">
                {/* Top-right corner badge */}
                <span className="absolute top-5 right-5 badge badge-accent">
                    AI Summary
                </span>

                {/* Icon Box */}
                <div className="icon-box shrink-0 mb-0">
                    <BookOpen size={17} />
                </div>

                {/* Summary Text */}
                <p className="text-[14.5px] leading-[1.65] text-[var(--ink-soft)] flex-1 min-w-[260px] pr-20 sm:pr-24">
                    {summaryText}
                </p>

                {/* Read Full Breakdown Button */}
                <button
                    onClick={handleReadFull}
                    className="btn btn-outline shrink-0 cursor-pointer self-start sm:self-center"
                >
                    Read full breakdown
                </button>
            </GlassCard>
        </section>
    );
}

export default AiArchitectureCard;
