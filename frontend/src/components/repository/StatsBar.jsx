import { Fragment } from "react";
import { useRepository } from "../../context/RepositoryContext";
import StatCard from "./StatCard";

function StatsBar() {
    const { repository } = useRepository();

    if (!repository || !repository.files) {
        return null;
    }

    const fileCount    = repository.files.length;
    const folderCount  = repository.statistics?.totalFolders ?? null;
    const totalLines   = repository.statistics?.totalLines   ?? null;

    const stats = [
        { label: "Files",         value: fileCount.toLocaleString() },
        ...(folderCount !== null
            ? [{ label: "Folders",       value: folderCount.toLocaleString() }]
            : []),
        ...(totalLines !== null
            ? [{ label: "Lines of Code", value: totalLines.toLocaleString() }]
            : []),
    ];

    return (
        <section aria-label="Repository statistics">
            {/* Single shared neumorphic strip — stats sit inside it, divided by hairlines */}
            <div
                className="inline-flex items-stretch rounded-xl overflow-hidden"
                style={{
                    background: "white",
                    boxShadow:
                        "4px 4px 10px rgba(0,0,0,0.05), -3px -3px 7px rgba(255,255,255,0.85)",
                }}
            >
                {stats.map((stat, index) => (
                    <Fragment key={stat.label}>
                        {/* Hairline divider between items */}
                        {index > 0 && (
                            <div
                                className="self-stretch w-px my-2.5"
                                style={{ background: "rgba(0,0,0,0.07)" }}
                                aria-hidden="true"
                            />
                        )}
                        <StatCard label={stat.label} value={stat.value} />
                    </Fragment>
                ))}
            </div>
        </section>
    );
}

export default StatsBar;