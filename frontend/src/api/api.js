import axios from "axios";

const API_URL = "http://localhost:3000/api/ai";

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
            knowledge: repository?.knowledge,
        },
        question,
    });

    return response.data;
}