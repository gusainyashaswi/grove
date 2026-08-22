import { useState, useMemo } from "react";
import { useRepository } from "../../context/RepositoryContext";
import {
    Copy,
    Check,
    FileCode,
    Maximize2,
    Minimize2,
    Code,
    Sparkles,
    ChevronRight,
    Terminal,
    Layers,
    FileText
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";

function getLanguageFromExt(extension) {
    switch (extension?.toLowerCase()) {
        case ".jsx":
            return "jsx";
        case ".tsx":
            return "tsx";
        case ".ts":
            return "typescript";
        case ".js":
        case ".mjs":
        case ".cjs":
            return "javascript";
        case ".css":
        case ".scss":
            return "css";
        case ".json":
            return "json";
        case ".md":
        case ".mdx":
            return "markdown";
        default:
            return "javascript";
    }
}

function CodePreview() {
    const { selectedFile } = useRepository();
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCopy = () => {
        if (!selectedFile?.content) return;
        navigator.clipboard.writeText(selectedFile.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = useMemo(() => {
        if (!selectedFile?.content) return [];
        return selectedFile.content.split("\n");
    }, [selectedFile?.content]);

    const highlightedCode = useMemo(() => {
        if (!selectedFile?.content) return "";
        const lang = getLanguageFromExt(selectedFile.extension);
        const grammar = Prism.languages[lang] || Prism.languages.javascript;
        try {
            return Prism.highlight(selectedFile.content, grammar, lang);
        } catch {
            return selectedFile.content;
        }
    }, [selectedFile?.content, selectedFile?.extension]);

    if (!selectedFile) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center rounded-3xl glass-card border border-white/[0.08] min-h-[480px] shadow-2xl">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-400 mb-5 shadow-inner">
                    <FileCode size={32} className="text-slate-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-200 mb-2">
                    No File Selected
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-mono">
                    Select any file from the VS Code Explorer tree to inspect its source code, syntax highlighting, and AST dependency metadata.
                </p>
            </div>
        );
    }

    const breadcrumbs = selectedFile.path.split("/").filter(Boolean);

    return (
        <div
            className={`
                flex flex-col rounded-3xl overflow-hidden glass-card border border-white/[0.08] shadow-2xl transition-all duration-300
                ${isExpanded ? "fixed inset-4 z-50 bg-[#070a0f]" : "w-full min-h-[520px]"}
            `}
        >
            {/* --- TOP: VS CODE TAB & TOOLBAR BAR --- */}
            <div className="flex items-center justify-between bg-[#0b0f17] border-b border-white/[0.08] px-4 pt-2">
                {/* Active Tab */}
                <div className="flex items-center gap-1 overflow-x-auto">
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#121824] border-t-2 border-[var(--color-accent)] rounded-t-xl text-xs font-mono text-white border-x border-white/[0.06]">
                        <span className="font-bold text-sky-400">/*</span>
                        <span className="font-semibold text-slate-100">{selectedFile.name}</span>
                        <span className="text-[11px] text-slate-400 ml-1">({lines.length} lines)</span>
                    </div>
                </div>

                {/* Toolbar Actions */}
                <div className="flex items-center gap-2.5 pb-1">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                        title="Copy file contents"
                    >
                        {copied ? (
                            <>
                                <Check size={13} className="text-emerald-400" />
                                <span className="text-emerald-400 font-semibold">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy size={13} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                        title={isExpanded ? "Exit Fullscreen" : "Fullscreen Preview"}
                    >
                        {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                </div>
            </div>

            {/* --- BREADCRUMB BAR --- */}
            <div className="flex items-center gap-2 px-5 py-2 bg-[#0e131d] border-b border-white/[0.04] text-xs font-mono text-slate-400 overflow-x-auto">
                <Layers size={13} className="text-slate-500 shrink-0" />
                {breadcrumbs.map((crumb, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 shrink-0">
                        {idx > 0 && <ChevronRight size={12} className="text-slate-600" />}
                        <span className={idx === breadcrumbs.length - 1 ? "text-emerald-400 font-semibold" : "text-slate-400"}>
                            {crumb}
                        </span>
                    </span>
                ))}
            </div>

            {/* --- CODE BODY WITH GUTTER --- */}
            <div className="flex-1 flex overflow-auto bg-[#070a0f] text-[13px] font-mono leading-relaxed select-text min-h-[420px] max-h-[680px]">
                {/* Line Numbers Gutter */}
                <div className="select-none py-4 px-4 bg-[#090d14] border-r border-white/[0.06] text-right text-slate-600 font-mono text-xs shrink-0">
                    {lines.map((_, i) => (
                        <div key={i} className="h-[22px] leading-[22px] hover:text-slate-400 transition-colors">
                            {i + 1}
                        </div>
                    ))}
                </div>

                {/* Highlighted Code Area */}
                <div className="flex-1 p-4 overflow-x-auto">
                    <pre className="m-0 p-0 font-mono text-[13px] leading-[22px] text-slate-200">
                        <code
                            dangerouslySetInnerHTML={{ __html: highlightedCode }}
                            className={`language-${getLanguageFromExt(selectedFile.extension)}`}
                        />
                    </pre>
                </div>
            </div>

            {/* --- BOTTOM VS CODE STATUS BAR --- */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-[#0e131d] border-t border-white/[0.08] text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3.5">
                    <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                        <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,245,155,0.6)]" />
                        {getLanguageFromExt(selectedFile.extension).toUpperCase()}
                    </span>
                    <span className="hidden sm:inline text-slate-500">|</span>
                    <span className="hidden sm:inline">UTF-8</span>
                    <span className="hidden sm:inline text-slate-500">|</span>
                    <span className="hidden sm:inline">Spaces: 2</span>
                </div>

                <div className="flex items-center gap-3.5">
                    <span>Lines: {lines.length}</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-300 font-semibold">Grove Studio IDE</span>
                </div>
            </div>
        </div>
    );
}

export default CodePreview;