import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";

import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";
import { Copy, Check, Search, ChevronUp, ChevronDown, X } from "lucide-react";

const DEFAULT_FILE = {
    name: "ReactFiberBeginWork.js",
    path: "packages/react-reconciler/ReactFiberBeginWork.js",
    extension: ".js",
    content: `import ReactSharedInternals from 'shared/ReactSharedInternals';\n\nfunction beginWork(current, workInProgress, renderLanes) {\n  if (current !== null) {\n    const oldProps = current.memoizedProps;\n    const newProps = workInProgress.pendingProps;\n  }\n  return updateFunctionComponent(current, workInProgress);\n}`,
};

/* ── Prism Language Detector ───────────────────────────────── */
function getLanguageFromFilename(filename = "") {
    const ext = filename.split(".").pop().toLowerCase();
    switch (ext) {
        case "js":
        case "mjs":
        case "cjs":
            return "javascript";
        case "jsx":
            return "jsx";
        case "ts":
            return "typescript";
        case "tsx":
            return "tsx";
        case "json":
            return "json";
        case "css":
        case "scss":
        case "less":
            return "css";
        case "html":
        case "svg":
        case "xml":
            return "markup";
        case "py":
            return "python";
        case "sh":
        case "bash":
        case "zsh":
            return "bash";
        case "md":
        case "markdown":
            return "markdown";
        case "yaml":
        case "yml":
            return "yaml";
        default:
            return "javascript";
    }
}

/* ── Light-theme Token Coloring ────────────────────────────── */
const TOKEN_STYLES = {
    keyword: "text-[#3b6fed] font-semibold",
    builtin: "text-[#2563eb]",
    class: "text-[#0f1626] font-semibold",
    "class-name": "text-[#0f1626] font-semibold",
    function: "text-[#0f1626] font-semibold",
    string: "text-[#059669]",
    "attr-value": "text-[#059669]",
    char: "text-[#059669]",
    comment: "text-[#8a97ac] italic",
    prolog: "text-[#8a97ac] italic",
    doctype: "text-[#8a97ac] italic",
    cdata: "text-[#8a97ac] italic",
    number: "text-[#d97706]",
    boolean: "text-[#d97706] font-semibold",
    operator: "text-[#64748b]",
    punctuation: "text-[#94a3b8]",
    property: "text-[#2563eb]",
    tag: "text-[#3b6fed] font-semibold",
    "attr-name": "text-[#6366f1]",
    variable: "text-[#475569]",
    constant: "text-[#4338ca] font-semibold",
    regex: "text-[#dc2626]",
    important: "text-[#dc2626] font-bold",
};

/* ── Tokenize Code into Structured Lines ───────────────────── */
function tokenizeToLines(code, language) {
    const grammar = Prism.languages[language] || Prism.languages.javascript || Prism.languages.clike;
    if (!code) return [[]];

    const rawTokens = Prism.tokenize(code, grammar);
    const lines = [[]];

    function process(item, inheritedType) {
        if (typeof item === "string") {
            const parts = item.split("\n");
            for (let i = 0; i < parts.length; i++) {
                if (i > 0) lines.push([]);
                if (parts[i].length > 0) {
                    lines[lines.length - 1].push({
                        type: inheritedType || "text",
                        text: parts[i],
                    });
                }
            }
        } else if (item && typeof item === "object") {
            const type = item.type || inheritedType;
            if (Array.isArray(item.content)) {
                item.content.forEach((sub) => process(sub, type));
            } else {
                process(item.content, type);
            }
        }
    }

    rawTokens.forEach((tok) => process(tok));
    return lines;
}

function CodePreview() {
    const { selectedFile } = useRepository() || {};
    const file = selectedFile || DEFAULT_FILE;

    // Search & Copy State
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const searchInputRef = useRef(null);
    const lineRefs = useRef({});

    const pathSegments = useMemo(() => {
        if (!file?.path) return [file?.name || "file.js"];
        return file.path.split("/").filter(Boolean);
    }, [file?.path, file?.name]);

    const filename = file?.name || pathSegments[pathSegments.length - 1] || "file.js";
    const extension = file?.extension || (filename.includes(".") ? `.${filename.split(".").pop()}` : ".js");
    const language = useMemo(() => getLanguageFromFilename(filename), [filename]);

    // Tokenized lines using Prism.js
    const tokenizedLines = useMemo(() => {
        return tokenizeToLines(file?.content || "", language);
    }, [file?.content, language]);

    // In-file search indexer
    const matches = useMemo(() => {
        if (!searchQuery || !searchQuery.trim() || !file?.content) return [];
        const q = searchQuery.toLowerCase();
        const found = [];
        const lines = file.content.split("\n");

        lines.forEach((lineText, lineIdx) => {
            let startIdx = 0;
            const lower = lineText.toLowerCase();
            while ((startIdx = lower.indexOf(q, startIdx)) !== -1) {
                found.push({
                    lineIdx,
                    startIdx,
                    length: q.length,
                });
                startIdx += q.length;
            }
        });
        return found;
    }, [searchQuery, file?.content]);

    // Reset match index when query changes
    useEffect(() => {
        setCurrentMatchIndex(0);
    }, [searchQuery]);

    // Scroll active match line into view
    useEffect(() => {
        if (matches.length > 0 && matches[currentMatchIndex]) {
            const activeLineIdx = matches[currentMatchIndex].lineIdx;
            const targetEl = lineRefs.current[activeLineIdx];
            if (targetEl) {
                targetEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
        }
    }, [currentMatchIndex, matches]);

    // Search navigation handlers
    const goToPrevMatch = useCallback(() => {
        if (matches.length === 0) return;
        setCurrentMatchIndex((prev) => (prev > 0 ? prev - 1 : matches.length - 1));
    }, [matches.length]);

    const goToNextMatch = useCallback(() => {
        if (matches.length === 0) return;
        setCurrentMatchIndex((prev) => (prev < matches.length - 1 ? prev + 1 : 0));
    }, [matches.length]);

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.shiftKey) {
                goToPrevMatch();
            } else {
                goToNextMatch();
            }
        } else if (e.key === "Escape") {
            setSearchQuery("");
            searchInputRef.current?.blur();
        }
    };

    // Copy file content handler
    const handleCopy = useCallback(() => {
        if (!file?.content) return;
        navigator.clipboard.writeText(file.content).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [file?.content]);

    return (
        <GlassCard className="code-panel !p-0 overflow-hidden w-full flex flex-col min-h-[460px]">
            {/* Top Bar (panel-bar) */}
            <div className="panel-bar flex items-center justify-between px-4 py-3 border-b border-[var(--line)] bg-white/50 gap-3">
                {/* Left: Breadcrumbs */}
                <div className="breadcrumb font-mono text-[11.5px] text-[var(--ink-soft)] flex items-center gap-1.5 flex-wrap min-w-0">
                    {pathSegments.map((segment, idx) => {
                        const isLast = idx === pathSegments.length - 1;
                        return (
                            <span key={idx} className="flex items-center gap-1.5 truncate">
                                {idx > 0 && <span className="sep opacity-40">/</span>}
                                <span className={isLast ? "t-heading font-bold text-[var(--ink)]" : ""}>
                                    {segment}
                                </span>
                            </span>
                        );
                    })}
                </div>

                {/* Right: Search, Copy & Extension */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* Minimal in-file Search Input */}
                    <div className="flex items-center gap-1 bg-white/80 border border-[var(--line)] rounded-lg px-2 py-1 text-xs focus-within:border-[var(--accent)] transition-all">
                        <Search size={12} className="text-[var(--muted)] shrink-0" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Find..."
                            className="bg-transparent text-[var(--ink)] font-mono text-xs outline-none w-16 sm:w-24 focus:w-28 sm:focus:w-32 placeholder:text-[var(--muted)] transition-all"
                        />
                        {searchQuery && (
                            <div className="flex items-center gap-1 text-[10.5px] font-mono text-[var(--muted)] pl-1.5 border-l border-[var(--line)] shrink-0">
                                <span>
                                    {matches.length > 0 ? `${currentMatchIndex + 1}/${matches.length}` : "0/0"}
                                </span>
                                <button
                                    type="button"
                                    onClick={goToPrevMatch}
                                    title="Previous match (Shift+Enter)"
                                    aria-label="Previous match"
                                    className="hover:text-[var(--ink)] p-0.5 cursor-pointer"
                                >
                                    <ChevronUp size={11} />
                                </button>
                                <button
                                    type="button"
                                    onClick={goToNextMatch}
                                    title="Next match (Enter)"
                                    aria-label="Next match"
                                    className="hover:text-[var(--ink)] p-0.5 cursor-pointer"
                                >
                                    <ChevronDown size={11} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    title="Clear search (Esc)"
                                    aria-label="Clear search"
                                    className="hover:text-[var(--ink)] p-0.5 cursor-pointer"
                                >
                                    <X size={11} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Copy File Content Button */}
                    <button
                        type="button"
                        onClick={handleCopy}
                        title={copied ? "Copied to clipboard!" : "Copy file contents"}
                        aria-label="Copy file content"
                        className="px-2 py-1 rounded-lg border border-[var(--line)] bg-white/80 hover:bg-white text-[var(--ink-soft)] hover:text-[var(--ink)] transition-all flex items-center gap-1.5 text-xs cursor-pointer shadow-2xs"
                    >
                        {copied ? (
                            <Check size={13} className="text-emerald-600 shrink-0" />
                        ) : (
                            <Copy size={13} className="shrink-0" />
                        )}
                        <span className="hidden sm:inline font-mono text-[11px]">
                            {copied ? "Copied" : "Copy"}
                        </span>
                    </button>

                    {/* Extension Badge */}
                    <span className="badge badge-neutral shrink-0">{extension}</span>
                </div>
            </div>

            {/* Code Body */}
            <div className="code-body flex-1 flex font-mono text-[12.5px] leading-[1.9] py-4 bg-white overflow-x-auto">
                {/* Gutter */}
                <div className="code-gutter select-none px-4 text-right text-[rgba(15,22,38,0.25)] shrink-0">
                    {tokenizedLines.map((_, i) => {
                        const isMatchLine =
                            matches.length > 0 && matches[currentMatchIndex]?.lineIdx === i;
                        return (
                            <div
                                key={i}
                                className={isMatchLine ? "text-[var(--accent)] font-semibold" : ""}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>

                {/* Code Lines with Prism Tokens & Search Highlights */}
                <div className="code-lines pr-5 overflow-x-auto flex-1">
                    {tokenizedLines.map((tokens, lineIdx) => {
                        let lineCharOffset = 0;
                        const isMatchLine =
                            matches.length > 0 && matches[currentMatchIndex]?.lineIdx === lineIdx;

                        return (
                            <div
                                key={lineIdx}
                                ref={(el) => (lineRefs.current[lineIdx] = el)}
                                className={`whitespace-pre ${isMatchLine ? "bg-amber-50/70 -mx-2 px-2 rounded-xs" : ""}`}
                            >
                                {tokens.length === 0 ? (
                                    <span>&nbsp;</span>
                                ) : (
                                    tokens.map((token, tokIdx) => {
                                        const tokenStart = lineCharOffset;
                                        lineCharOffset += token.text.length;

                                        // Render tokens with search highlighting if active
                                        if (searchQuery && searchQuery.trim()) {
                                            const q = searchQuery.toLowerCase();
                                            const lower = token.text.toLowerCase();
                                            const segments = [];
                                            let lastIdx = 0;
                                            let matchIdx = 0;

                                            while ((matchIdx = lower.indexOf(q, lastIdx)) !== -1) {
                                                if (matchIdx > lastIdx) {
                                                    segments.push({
                                                        isMatch: false,
                                                        text: token.text.slice(lastIdx, matchIdx),
                                                    });
                                                }

                                                const globalMatchIdx = matches.findIndex(
                                                    (m) =>
                                                        m.lineIdx === lineIdx &&
                                                        m.startIdx === tokenStart + matchIdx
                                                );
                                                const isCurrent =
                                                    globalMatchIdx !== -1 &&
                                                    globalMatchIdx === currentMatchIndex;

                                                segments.push({
                                                    isMatch: true,
                                                    isCurrent,
                                                    text: token.text.slice(matchIdx, matchIdx + q.length),
                                                });
                                                lastIdx = matchIdx + q.length;
                                            }

                                            if (lastIdx < token.text.length) {
                                                segments.push({
                                                    isMatch: false,
                                                    text: token.text.slice(lastIdx),
                                                });
                                            }

                                            return (
                                                <span
                                                    key={tokIdx}
                                                    className={TOKEN_STYLES[token.type] || "text-[var(--ink-soft)]"}
                                                >
                                                    {segments.map((seg, sIdx) => {
                                                        if (!seg.isMatch) return seg.text;
                                                        return (
                                                            <mark
                                                                key={sIdx}
                                                                className={`rounded-xs px-0.5 ${
                                                                    seg.isCurrent
                                                                        ? "bg-amber-400 text-black font-semibold shadow-xs ring-1 ring-amber-500"
                                                                        : "bg-amber-200/90 text-black"
                                                                }`}
                                                            >
                                                                {seg.text}
                                                            </mark>
                                                        );
                                                    })}
                                                </span>
                                            );
                                        }

                                        // Default Prism highlighting
                                        return (
                                            <span
                                                key={tokIdx}
                                                className={TOKEN_STYLES[token.type] || "text-[var(--ink-soft)]"}
                                            >
                                                {token.text}
                                            </span>
                                        );
                                    })
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Status Bar */}
            <div className="code-status flex items-center justify-between px-4 py-2.5 border-t border-[var(--line)] font-mono text-[11px] text-[var(--muted)] bg-white/50">
                <span>{language.toUpperCase()} · UTF-8 · LF</span>
                <span>{tokenizedLines.length.toLocaleString()} lines</span>
            </div>
        </GlassCard>
    );
}

export default CodePreview;