import { useRepository } from "../../context/RepositoryContext";

function RepositoryStatistics() {
    const { repository } = useRepository();

    if (!repository?.statistics) {
        return null;
    }

    const { statistics } = repository;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
                Repository Statistics
            </h2>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Total Files</span>
                    <span>{statistics.totalFiles}</span>
                </div>

                <div className="flex justify-between">
                    <span>Total Folders</span>
                    <span>{statistics.totalFolders}</span>
                </div>

                <div className="flex justify-between">
                    <span>Total Lines</span>
                    <span>{statistics.totalLines}</span>
                </div>

                <div className="flex justify-between">
                    <span>Average Lines / File</span>
                    <span>{statistics.averageLinesPerFile}</span>
                </div>

                <div className="flex justify-between">
                    <span>Average Dependencies</span>
                    <span>{statistics.averageDependencies}</span>
                </div>

                <div className="flex justify-between">
                    <span>Maximum Dependencies</span>
                    <span>{statistics.maximumDependencies}</span>
                </div>
            </div>

            <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold mb-2">
                    Largest File
                </h3>

                {statistics.largestFile ? (
                    <>
                        <p className="font-medium">
                            {statistics.largestFile.name}
                        </p>

                        <p className="text-sm text-gray-600">
                            {statistics.largestFile.path}
                        </p>

                        <p className="text-sm mt-1">
                            {statistics.largestFile.lines} lines
                        </p>
                    </>
                ) : (
                    <p>No files found.</p>
                )}
            </div>
        </div>
    );
}

export default RepositoryStatistics;