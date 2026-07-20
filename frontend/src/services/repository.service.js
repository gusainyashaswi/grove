import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export async function analyzeRepository(url) {
    const response = await api.post("/analyze", {
        url,
    });

    return response.data;
}