import { useRepository } from "../../context/RepositoryContext";
import { ExternalLink } from "lucide-react";
import GroveLeaf from "../GroveLeaf";

function RepositoryHeader() {
    const { repository } = useRepository() || {};

    const name = repository?.fullName ?? (repository?.owner && repository?.name ? `${repository.owner}/${repository.name}` : repository?.name ?? "facebook/react");
    const framework = repository?.structure?.framework ?? "React";
    const url = repository?.url ?? `https://github.com/${name}`;

    return (
        <header className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="flex flex-col">
                <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    {/* Shared leaf — anchors the view transition from the loading page */}
                    <div
                        style={{
                            background: "rgba(255,255,255,0.40)",
                            backdropFilter: "blur(12px) saturate(200%)",
                            WebkitBackdropFilter: "blur(12px) saturate(200%)",
                            border: "1px solid rgba(255,255,255,0.6)",
                            borderRadius: "50%",
                            width: 36,
                            height: 36,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            boxShadow: "0 4px 14px rgba(59,111,237,0.14)",
                        }}
                    >
                        <GroveLeaf size={20} />
                    </div>
                    <span>// repository overview</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                    {name}
                </h1>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <span className="badge badge-neutral">{framework}</span>
                <span className="badge badge-accent">
                    <span className="dot live" />
                    Healthy
                </span>
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                >
                    <span>Open on GitHub</span>
                    <ExternalLink size={14} />
                </a>
            </div>
        </header>
    );
}

export default RepositoryHeader;