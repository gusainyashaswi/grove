import { useRepository } from "../../context/RepositoryContext";

function RepositoryStructure() {
    const { repository } = useRepository();

    if (!repository || !repository.structure) {
        return null;
    }

    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">
                Repository Structure
            </h2>

            <h3>
                Framework: {repository.structure.framework}
            </h3>

            <ul className="space-y-2">
                {Object.entries(repository.structure.folders).map(([folder, count]) => (
                    <li
                        key={folder}
                        className="flex justify-between"
                    >
                        <span>{folder}</span>
                        <span>{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RepositoryStructure;