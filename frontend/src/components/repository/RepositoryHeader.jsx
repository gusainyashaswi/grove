import { useRepository } from "../../context/RepositoryContext";
import { ExternalLink } from "lucide-react";
import GroveLeaf from "../GroveLeaf";

function RepositoryHeader() {
    const { repository } = useRepository() || {};

    const name = repository?.fullName ?? (repository?.owner && repository?.name ? `${repository.owner}/${repository.name}` : repository?.name ?? "facebook/react");
    const framework = repository?.structure?.framework ?? "React";
    const url = repository?.url ?? `https://github.com/${name}`;

    return (
        <header className="w-full flex flex-col md:flex-row md:items-end justify-between gap-5 pb-2">
            <div className="flex flex-col">
                <div className="eyebrow flex items-center gap-2 mb-2">
                    <GroveLeaf size={16} />
                    <span>// repository overview</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
                    {name}
                </h1>
            </div>

            <div className="flex items-center gap-3 flex-wrap self-start md:self-end mt-1 md:mt-0">
                <span className="badge badge-neutral">{framework}</span>
                <span className="badge badge-accent">
                    <span className="dot live" />
                    Healthy
                </span>
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                >
                    <span>Open on GitHub</span>
                    <ExternalLink size={14} />
                </a>
            </div>
        </header>
    );
}

export default RepositoryHeader;