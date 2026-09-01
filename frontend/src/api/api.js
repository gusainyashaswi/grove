import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${API_BASE_URL}/api/ai`;

export async function explainFile(repository, file) {
    const response = await axios.post(`${API_URL}/explain-file`, {
        repository: {
            structure: repository.structure,
            entryPoint: repository.entryPoint,
        },
        file,
    });

    return response.data;
}

export async function summarizeRepository(repository) {
    const response = await axios.post(
        `${API_URL}/repository-summary`,
        {
            repository: {
                structure: repository.structure,
                statistics: repository.statistics,
                health: repository.health,
                entryPoint: repository.entryPoint,
                knowledge: repository.knowledge,
            },
        }
    );

    return response.data;
}

export async function askRepositoryQuestion(repository, question) {
    const response = await axios.post(`${API_URL}/repository-question`, {
        repository: {
            owner: repository?.owner,
            name: repository?.name,
            knowledge: repository?.knowledge,
        },
        question,
    });

    return response.data;
}