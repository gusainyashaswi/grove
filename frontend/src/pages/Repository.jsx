import { useRepository } from "../context/RepositoryContext";

function Repository() {
    const { repository } = useRepository();

    console.log(repository);

    return (
        <div>
            Repository
        </div>
    );
}

export default Repository;