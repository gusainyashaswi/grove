import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-yaml";
import { useRepository } from "../../context/RepositoryContext";
import { askRepositoryQuestion } from "../../api/api";

/* ─── helpers ─────────────────────────────────────────────────────────── */

const LANG_MAP = {
    js: "javascript", jsx: "jsx", ts: "typescript", tsx: "tsx",
    py: "python", python: "python", bash: "bash", sh: "bash",
    json: "json", css: "css", yaml: "yaml", yml: "yaml",
    javascript: "javascript", typescript: "typescript",
};

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(code, lang) {
    const key = LANG_MAP[lang] || "javascript";
    const grammar = Prism.languages[key];
    if (!grammar) return escapeHtml(code);
    return Prism.highlight(code, grammar, key);
}

/* ─── file-pill detection ─────────────────────────────────────────────── */

function splitFilePills(text, files) {
    if (!files?.length) return [{ type: "text", value: text }];
    const nameSet = new Set(files.map((f) => f.name));
    const FILE_RE = /\b([\w.\-/]+\.[a-zA-Z]{1,6})\b/g;
    const parts = [];
    let last = 0;
    let m;
    while ((m = FILE_RE.exec(text)) !== null) {
        const token = m[1];
        const basename = token.split("/").pop();
        if (!nameSet.has(basename)) continue;
        if (m.index > last) parts.push({ type: "text", value: text.slice(last, m.index) });
        parts.push({ type: "file", value: token, basename });
        last = m.index + token.length;
    }
    if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
    return parts;
}

/* ─── FilePill ────────────────────────────────────────────────────────── */

function FilePill({ basename, files, setSelectedFile, setActiveTab }) {
    const file = files?.find((f) => f.name === basename);
    if (!file) return <code>{basename}</code>;
    return (
        <button
            className="file-pill"
            title={`Open ${file.path}`}
            onClick={() => { setSelectedFile(file); setActiveTab("explorer"); }}
        >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
            </svg>
            {basename}
        </button>
    );
}

/* ─── PillText ────────────────────────────────────────────────────────── */

function PillText({ text, files, setSelectedFile, setActiveTab }) {
    const parts = splitFilePills(text, files);
    return (
        <>
            {parts.map((p, i) =>
                p.type === "file" ? (
                    <FilePill key={i} basename={p.basename} files={files} setSelectedFile={setSelectedFile} setActiveTab={setActiveTab} />
                ) : (
                    <span key={i}>{p.value}</span>
                )
            )}
        </>
    );
}

/* ─── CodeBlock ───────────────────────────────────────────────────────── */

function CodeBlock({ children, className }) {
    const [copied, setCopied] = useState(false);
    const lang = (className || "").replace("language-", "") || "js";
    const code = String(children).replace(/\n$/, "");
    const html = highlight(code, lang);

    const copy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        });
    };

    return (
        <div className="ai-code-block">
            <div className="ai-code-block-header">
                <span className="ai-code-lang">{lang}</span>
                <button className="ai-code-copy" onClick={copy}>
                    {copied ? "✓ Copied" : "Copy"}
                </button>
            </div>
            <pre className={`language-${lang}`}>
                <code dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
        </div>
    );
}

/* ─── AiMessage ───────────────────────────────────────────────────────── */

function flatMapChildren(children, mapStr) {
    return Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? mapStr(c) : c))
        : typeof children === "string" ? mapStr(children) : children;
}

function AiMessage({ text, files, setSelectedFile, setActiveTab }) {
    const inject = useCallback((child, i) => {
        if (typeof child !== "string") return child;
        return <PillText key={i} text={child} files={files} setSelectedFile={setSelectedFile} setActiveTab={setActiveTab} />;
    }, [files, setSelectedFile, setActiveTab]);

    const components = {
        code({ inline, className, children, ...rest }) {
            if (inline) return <code className="ai-inline-code" {...rest}>{children}</code>;
            return <CodeBlock className={className}>{children}</CodeBlock>;
        },
        p({ children }) {
            return <p>{flatMapChildren(children, inject)}</p>;
        },
        li({ children }) {
            return <li>{flatMapChildren(children, inject)}</li>;
        },
        a({ href, children }) {
            return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
        },
    };

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {text}
        </ReactMarkdown>
    );
}

/* ─── Constants ───────────────────────────────────────────────────────── */

const INITIAL_MESSAGES = [
    { role: "user", text: "Where is the main entry point?" },
    {
        role: "ai",
        text: "The entry point is `packages/react/React.js`, which exports the public React API and re-exports the core hooks and component primitives used throughout the library.",
    },
    { role: "user", text: "Which files have the highest dependency count?" },
    {
        role: "ai",
        text: "`ReactFiberWorkLoop.js` has the highest dependent count at **27 references**, followed by `ReactFiberBeginWork.js` and `ReactSharedInternals.js`.",
    },
];

const SUGGESTED_CHIPS = [
    "What is the core architecture?",
    "Where is the main entry point?",
    "Which files have the highest dependency count?",
];

/* ─── Assistant ───────────────────────────────────────────────────────── */

function Assistant() {
    const { repository, setSelectedFile, setActiveTab } = useRepository() || {};
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputVal, setInputVal] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const logEndRef = useRef(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = useCallback(async (queryText) => {
        const text = (queryText || inputVal).trim();
        if (!text || loading) return;

        setError(null);
        setMessages((prev) => [...prev, { role: "user", text }]);
        setInputVal("");
        setLoading(true);

        try {
            const result = await askRepositoryQuestion(repository, text);
            if (!result?.answer) throw new Error("Empty response from server.");
            setMessages((prev) => [...prev, { role: "ai", text: result.answer }]);
        } catch (err) {
            const msg = err?.response?.data?.message || err?.message || "Something went wrong. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [inputVal, loading, repository]);

    const handleSubmit = (e) => { e.preventDefault(); handleSend(); };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Page Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="eyebrow font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
                        // codebase assistant
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">
                        Ask about this repo
                    </h1>
                </div>
                <span className="chip !border-[var(--accent-line)] !bg-[var(--accent-soft)] !text-[var(--accent)] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    AI · Live
                </span>
            </div>

            {/* Chat */}
            <div className="chat-wrap">
                <div className="chat-log">
                    {messages.map((msg, idx) =>
                        msg.role === "user" ? (
                            <div key={idx} className="msg msg-user">
                                <span>{msg.text}</span>
                            </div>
                        ) : (
                            <div key={idx} className="msg msg-ai">
                                <span className="ai-label">Grove AI</span>
                                <div className="ai-md-body">
                                    <AiMessage
                                        text={msg.text}
                                        files={repository?.files}
                                        setSelectedFile={setSelectedFile}
                                        setActiveTab={setActiveTab}
                                    />
                                </div>
                            </div>
                        )
                    )}

                    {loading && (
                        <div className="msg msg-ai">
                            <span className="ai-label">Grove AI</span>
                            <span className="ai-typing">
                                <span /><span /><span />
                            </span>
                        </div>
                    )}

                    {error && (
                        <div className="msg msg-error">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div ref={logEndRef} />
                </div>

                {/* Suggested chips */}
                <div className="prompt-pills">
                    {SUGGESTED_CHIPS.map((chipText, idx) => (
                        <button key={idx} type="button" className="chip" onClick={() => handleSend(chipText)} disabled={loading}>
                            {chipText}
                        </button>
                    ))}
                </div>

                {/* Input bar */}
                <form onSubmit={handleSubmit} className="chat-inputbar">
                    <input
                        type="text"
                        placeholder="Ask a question about this repository…"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" className="btn btn-dark" style={{ padding: "9px 18px" }} disabled={loading || !inputVal.trim()}>
                        {loading ? "Asking…" : "Ask"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Assistant;
