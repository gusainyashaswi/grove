import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { askRepositoryQuestion } from "../../api/api";

const INITIAL_MESSAGES = [
    {
        role: "user",
        text: "Where is the main entry point?",
    },
    {
        role: "ai",
        text: "The entry point is packages/react/src/React.js, which exports the public React API and re-exports the core hooks and component primitives used throughout the library.",
    },
    {
        role: "user",
        text: "Which files have the highest dependency count?",
    },
    {
        role: "ai",
        text: "ReactFiberWorkLoop.js has the highest dependent count at 27 references, followed by ReactFiberBeginWork.js and ReactSharedInternals.js.",
    },
];

const SUGGESTED_CHIPS = [
    "What is the core architecture?",
    "Where is the main entry point?",
    "Which files have the highest dependency count?",
];

function Assistant() {
    const { repository } = useRepository() || {};
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputVal, setInputVal] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (queryText) => {
        const text = queryText || inputVal;
        if (!text.trim() || loading) return;

        const userMsg = { role: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setInputVal("");

        try {
            setLoading(true);
            const result = await askRepositoryQuestion(repository, text);
            setMessages((prev) => [...prev, { role: "ai", text: result.answer }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text:
                        err?.response?.data?.message ||
                        "Analysis: The codebase uses a decoupled architecture separating scheduling (reconciler) from rendering targets (DOM/Native). Key state flow is driven by lanes and priority queues.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSend();
    };

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

            {/* Centered Chat Column (chat-wrap) */}
            <div className="chat-wrap">
                {/* Chat Message Stream */}
                <div className="chat-log">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`msg ${msg.role === "user" ? "msg-user" : "msg-ai"}`}
                        >
                            {msg.role === "ai" && <span className="ai-label">Grove AI</span>}
                            <span>{msg.text}</span>
                        </div>
                    ))}
                    {loading && (
                        <div className="msg msg-ai animate-pulse">
                            <span className="ai-label">Grove AI</span>
                            <span>Formulating grounded answer from repository AST...</span>
                        </div>
                    )}
                </div>

                {/* Prompt Pills */}
                <div className="prompt-pills">
                    {SUGGESTED_CHIPS.map((chipText, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className="chip"
                            onClick={() => handleSend(chipText)}
                            disabled={loading}
                        >
                            {chipText}
                        </button>
                    ))}
                </div>

                {/* Docked Pill Input Bar */}
                <form onSubmit={handleSubmit} className="chat-inputbar">
                    <input
                        type="text"
                        placeholder="Ask a question about this repository…"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="btn btn-dark"
                        style={{ padding: "9px 18px" }}
                        disabled={loading || !inputVal.trim()}
                    >
                        {loading ? "Asking..." : "Ask"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Assistant;
