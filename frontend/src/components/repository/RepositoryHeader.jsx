import { useRepository } from "../../context/RepositoryContext";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ExternalLink,
    CheckCircle2,
    GitBranch,
    Layers,
    Code2,
} from "lucide-react";
import Badge from "../common/Badge";

function RepositoryHeader() {
    const { repository } = useRepository();

    if (!repository) return null;

    /* ── Data extraction with graceful fallbacks ──────────────── */
    const name     = repository.name     ?? repository.entryPoint?.name ?? "Repository";
    const owner    = repository.owner    ?? null;
    const url      = repository.url      ?? null;
    const fullName = repository.fullName ?? (owner ? `${owner}/${name}` : name);
    const framework = repository.structure?.framework ?? null;
    const fileCount = repository.files?.length ?? 0;

    return (
        <header
            className="w-full rounded-2xl"
            style={{
                background: "white",
                boxShadow:
                    "6px 6px 14px rgba(0,0,0,0.055), -4px -4px 10px rgba(255,255,255,0.9)",
            }}
            aria-label="Repository header"
        >

            {/* ── Top strip: back link + status badge ───────────────── */}
            <div
                className="flex items-center justify-between px-6 sm:px-8 pt-5 pb-4"
                style={{
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                }}
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                    style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--weight-medium)",
                        transitionDuration: "var(--duration-fast)",
                    }}
                    aria-label="Back to home"
                >
                    <ArrowLeft size={13} aria-hidden="true" />
                    Home
                </Link>

                <Badge variant="neutral" className="gap-1 font-mono" style={{ fontSize: "10px" }}>
                    <CheckCircle2 size={10} className="shrink-0" aria-hidden="true" />
                    Analysis complete
                </Badge>
            </div>

            {/* ── Main identity block ────────────────────────────────── */}
            <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5">

                {/* Left: name + breadcrumb + meta */}
                <div className="flex flex-col gap-1.5 min-w-0">

                    {/* Owner breadcrumb — muted, mono, small */}
                    {owner && (
                        <p
                            className="text-gray-400 truncate"
                            style={{
                                fontSize: "var(--text-xs)",
                                fontFamily: "var(--font-mono)",
                                lineHeight: "var(--leading-normal)",
                            }}
                        >
                            {owner}&nbsp;/
                        </p>
                    )}

                    {/* Repository name — primary visual anchor */}
                    <h1
                        className="text-gray-900 font-bold truncate"
                        style={{
                            fontSize: "clamp(1.35rem, 2.5vw, var(--text-2xl))",
                            letterSpacing: "var(--tracking-tight)",
                            lineHeight: "var(--leading-tight)",
                        }}
                    >
                        {name}
                    </h1>

                    {/* Meta row — framework · files · branch */}
                    <div
                        className="flex flex-wrap items-center gap-3 text-gray-500 mt-0.5"
                        style={{ fontSize: "var(--text-sm)" }}
                    >
                        {framework && (
                            <span className="flex items-center gap-1">
                                <Code2
                                    size={12}
                                    className="text-gray-400 shrink-0"
                                    aria-hidden="true"
                                />
                                {framework}
                            </span>
                        )}

                        <span className="flex items-center gap-1">
                            <Layers
                                size={12}
                                className="text-gray-400 shrink-0"
                                aria-hidden="true"
                            />
                            {fileCount}&nbsp;{fileCount === 1 ? "file" : "files"}
                        </span>

                        <span className="flex items-center gap-1">
                            <GitBranch
                                size={12}
                                className="text-gray-400 shrink-0"
                                aria-hidden="true"
                            />
                            main
                        </span>
                    </div>
                </div>

                {/* Right: GitHub external link — anchor styled as IconButton ghost */}
                {url && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${fullName} on GitHub`}
                        title={`Open ${fullName} on GitHub`}
                        className="
                            inline-flex shrink-0 items-center justify-center
                            size-9
                            rounded-[var(--radius-md)]
                            text-gray-400
                            border border-transparent
                            hover:text-gray-700
                            hover:bg-gray-100
                            transition-colors
                        "
                        style={{ transitionDuration: "var(--duration-fast)" }}
                    >
                        <ExternalLink size={15} aria-hidden="true" />
                    </a>
                )}
            </div>

        </header>
    );
}

export default RepositoryHeader;