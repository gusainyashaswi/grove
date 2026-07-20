import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export async function analyzeRepository(repositoryUrl) {

    const response = await api.post("/analyze", {
        repositoryUrl,
    });

    return response.data;
}