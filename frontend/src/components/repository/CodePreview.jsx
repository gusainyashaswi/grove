import { useMemo } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";

const DEFAULT_FILE = {
    name: "ReactFiberBeginWork.js",
    path: "packages/react-reconciler/ReactFiberBeginWork.js",
    extension: ".js",
    content: `import ReactSharedInternals from 'shared/ReactSharedInternals';\n\nfunction beginWork(current, workInProgress, renderLanes) {\n  if (current !== null) {\n    const oldProps = current.memoizedProps;\n    const newProps = workInProgress.pendingProps;\n  }\n  return updateFunctionComponent(current, workInProgress);\n}`,
};

function renderSyntaxLine(line) {
    if (!line || !line.trim()) {
        return <div>&nbsp;</div>;
    }

    const parts = line.split(/(\bimport\b|\bfrom\b|\bfunction\b|\bconst\b|\blet\b|\bvar\b|\breturn\b|\bif\b|\belse\b|'.*?'|".*?"|`.*?`)/g);

    return (
        <div>
            {parts.map((part, i) => {
                if (!part) return null;

                if (['import', 'from', 'function', 'const', 'let', 'var', 'return', 'if', 'else', 'null'].includes(part)) {
                    return <span key={i} className="t-dim text-[var(--muted)]">{part}</span>;
                }

                if (part.startsWith("'") || part.startsWith('"') || part.startsWith("`")) {
                    return <span key={i} className="t-accent font-bold text-[var(--accent)]">{part}</span>;
                }

                if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(part) && (line.includes(`function ${part}`) || line.includes(`import ${part}`) || line.includes(`const ${part}`))) {
                    return <span key={i} className="t-heading font-bold text-[var(--ink)]">{part}</span>;
                }

                return <span key={i} className="t-body text-[var(--ink-soft)]">{part}</span>;
            })}
        </div>
    );
}

function CodePreview() {
    const { selectedFile } = useRepository() || {};
    const file = selectedFile || DEFAULT_FILE;

    const lines = useMemo(() => {
        if (!file?.content) return [];
        return file.content.split("\n");
    }, [file?.content]);

    const pathSegments = useMemo(() => {
        if (!file?.path) return [file?.name || "file.js"];
        return file.path.split("/").filter(Boolean);
    }, [file?.path, file?.name]);

    const extension = file?.extension || (file?.name ? `.${file.name.split('.').pop()}` : ".js");

    return (
        <GlassCard className="code-panel !p-0 overflow-hidden w-full flex flex-col min-h-[460px]">
            {/* Top Bar (panel-bar) */}
            <div className="panel-bar flex items-center justify-between px-4 py-3 border-b border-[var(--line)] bg-white/50">
                <div className="breadcrumb font-mono text-[11.5px] text-[var(--ink-soft)] flex items-center gap-1.5 flex-wrap">
                    {pathSegments.map((segment, idx) => {
                        const isLast = idx === pathSegments.length - 1;
                        return (
                            <span key={idx} className="flex items-center gap-1.5">
                                {idx > 0 && <span className="sep opacity-40">/</span>}
                                <span className={isLast ? "t-heading font-bold text-[var(--ink)]" : ""}>
                                    {segment}
                                </span>
                            </span>
                        );
                    })}
                </div>
                <span className="badge badge-neutral shrink-0">{extension}</span>
            </div>

            {/* Code Body */}
            <div className="code-body flex-1 flex font-mono text-[12.5px] leading-[1.9] py-4 bg-white overflow-x-auto">
                {/* Gutter */}
                <div className="code-gutter select-none px-4 text-right text-[rgba(15,22,38,0.2)] shrink-0">
                    {lines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>

                {/* Code Lines */}
                <div className="code-lines pr-5 overflow-x-auto flex-1">
                    {lines.map((line, i) => (
                        <div key={i}>{renderSyntaxLine(line)}</div>
                    ))}
                </div>
            </div>

            {/* Status Bar */}
            <div className="code-status flex items-center justify-between px-4 py-2.5 border-t border-[var(--line)] font-mono text-[11px] text-[var(--muted)] bg-white/50">
                <span>UTF-8 · LF · 2 spaces</span>
                <span>{lines.length.toLocaleString()} lines</span>
            </div>
        </GlassCard>
    );
}

export default CodePreview;