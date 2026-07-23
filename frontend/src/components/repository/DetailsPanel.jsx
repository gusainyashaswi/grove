import { useRepository } from "../../context/RepositoryContext";

function DetailsPanel() {
    const { selectedFile } = useRepository();

    if (!selectedFile) {
        return (
            <div>
                <h2>File Details</h2>
                <p>Select a file to inspect.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">

    <div>

        <p className="font-semibold">Name</p>

        <p>{selectedFile.name}</p>

    </div>

    <div>

        <p className="font-semibold">Path</p>

        <p>{selectedFile.path}</p>

    </div>

    <div>

        <p className="font-semibold">Folder</p>

        <p>{selectedFile.folder}</p>

    </div>

    <div>

        <p className="font-semibold">Extension</p>

        <p>{selectedFile.extension}</p>

    </div>

    <div>

        <p className="font-semibold">Lines</p>

        <p>{selectedFile.lineCount}</p>

    </div>

    <div>

        <p className="font-semibold">Type</p>

        <p>{selectedFile.type}</p>

    </div>

    <div>

        <p className="font-semibold">Imports</p>

        <p>{selectedFile.imports.length}</p>

    </div>

    <div>
    <p className="font-semibold">Dependencies</p>

    {selectedFile.dependencies.length > 0 ? (
        <ul className="list-disc ml-5 mt-1">
            {selectedFile.dependencies.map((dependency) => (
                <li key={dependency}>
                    {dependency.split("/").pop()}
                </li>
            ))}
        </ul>
    ) : (
        <p>No internal dependencies</p>
    )}
    </div>

    <div>
    <p className="font-semibold">Used By</p>

    {selectedFile.dependents.length > 0 ? (
        <ul className="list-disc ml-5 mt-1">
            {selectedFile.dependents.map((dependent) => (
                <li key={dependent}>
                    {dependent.split("/").pop()}
                </li>
            ))}
        </ul>
    ) : (
        <p>Not used by any internal file</p>
    )}
    </div>

</div>
    );
}

export default DetailsPanel;