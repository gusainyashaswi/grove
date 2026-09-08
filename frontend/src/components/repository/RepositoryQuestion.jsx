import { useState, useEffect } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { askRepositoryQuestion } from "../../api/api";
import {
    MessageSquare,
    Send,
    Sparkles,
    ShieldAlert,
    Copy,
    Check,
    Bot,
    User,
    Compass,
    HelpCircle
} from "lucide-react";
import Badge from "../common/Badge";

const SUGGESTED_QUESTIONS = [
    "What is the core architecture and design pattern of this repo?",
    "Where is the main entry point and how does routing work?",
    "Which files have the highest dependency count and why?",
    "How is state managed throughout the application?"
];

function RepositoryQuestion() {
    const { repository } = useRepository();
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const [copiedIndex, setCopiedIndex] = useState(null);

    useEffect(() => {
        setQuestion("");
        setMessages([]);
        setError("");
    }, [repository]);

    if (!repository) {
        return null;
    }

    const askQuery = async (queryText) => {
        if (!queryText.trim() || loading) return;

        const userMsg = { role: "user", text: queryText };
        setMessages((prev) => [...prev, userMsg]);
        setQuestion("");
        setError("");

        try {
            setLoading(true);
            const result = await askRepositoryQuestion(repository, queryText.trim());
            const aiMsg = { role: "assistant", text: result.answer };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch AI answer. Please ensure your Gemini API key is configured.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        askQuery(question);
    };

    const handleCopyAnswer = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="flex flex-col gap-5 p-6 rounded-3xl glass-card border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(0,245,155,0.25)]">
                        <MessageSquare size={18} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
                            Interactive Codebase Assistant
                        </h2>
                        <span className="text-xs text-slate-400 font-mono">
                            Ask questions, investigate algorithms, and query dependencies in natural language
                        </span>
                    </div>
                </div>

                <Badge variant="accent" className="font-mono text-xs">
                    Gemini Powered
                </Badge>
            </div>

            {/* Suggested Question Pills */}
            <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Sparkles size={12} className="text-emerald-400" />
                    Quick Prompt Suggestions
                </span>
                <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                        <button
                            key={idx}
                            onClick={() => askQuery(q)}
                            disabled={loading}
                            className="
                                text-xs font-mono text-slate-300 bg-white/[0.04] hover:bg-white/[0.08]
                                border border-white/[0.08] hover:border-emerald-500/40 hover:text-white
                                px-3 py-1.5 rounded-full transition-all duration-150 text-left cursor-pointer
                                disabled:opacity-50
                            "
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conversation Stream */}
            {messages.length > 0 && (
                <div className="flex flex-col gap-3.5 max-h-[420px] overflow-y-auto pr-1">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-3 p-4 rounded-2xl ${msg.role === "user"
                                ? "bg-white/[0.05] border border-white/10 ml-8"
                                : "bg-[#090d14] border border-emerald-500/20 mr-4 shadow-inner"
                                }`}
                        >
                            <div className="shrink-0 mt-0.5">
                                {msg.role === "user" ? (
                                    <div className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-white">
                                        <User size={14} />
                                    </div>
                                ) : (
                                    <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                                        <Bot size={14} />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        {msg.role === "user" ? "You" : "Grove AI"}
                                    </span>
                                    {msg.role === "assistant" && (
                                        <button
                                            onClick={() => handleCopyAnswer(msg.text, idx)}
                                            className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                                            title="Copy answer"
                                        >
                                            {copiedIndex === idx ? (
                                                <Check size={12} className="text-emerald-400" />
                                            ) : (
                                                <Copy size={12} />
                                            )}
                                        </button>
                                    )}
                                </div>
                                <div className="font-mono text-xs sm:text-[12.5px] leading-relaxed text-slate-200 whitespace-pre-wrap">
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {loading && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#090d14] border border-emerald-500/20">
                    <Bot size={18} className="animate-spin text-emerald-400" />
                    <span className="font-mono text-xs text-emerald-300 font-semibold animate-pulse">
                        Analyzing repository source code and formulating architectural answer...
                    </span>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-3">
                    <ShieldAlert size={16} className="shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 relative mt-2">
                <input
                    type="text"
                    className="
                        flex-1 h-12 px-4 rounded-2xl text-xs font-mono text-white placeholder:text-slate-500
                        bg-white/[0.04] border border-white/10
                        outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] focus:shadow-[0_0_15px_rgba(0,245,155,0.25)]
                        transition-all duration-200
                    "
                    placeholder="Ask any technical question about this codebase..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={loading}
                />

                <button
                    type="submit"
                    className="
                        flex items-center justify-center gap-2 px-5 h-12 rounded-2xl
                        bg-[var(--color-accent)] text-slate-950 font-bold font-sans text-xs
                        hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_20px_rgba(0,245,155,0.4)]
                        transition-all duration-200 cursor-pointer disabled:opacity-50 shrink-0
                    "
                    disabled={loading || !question.trim()}
                >
                    <Send size={14} />
                    <span className="hidden sm:inline">Ask AI</span>
                </button>
            </form>
        </div>
    );
}

export default RepositoryQuestion;
