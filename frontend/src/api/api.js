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