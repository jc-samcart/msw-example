import axios from "axios";

axios.defaults.baseURL = "https://localhost:2345/";

export async function createNewBanana(): Promise<any> {
    const response = await axios.post('bananas');

    return response.data;
}

export async function createNewBananaWithData(
    age: number,
): Promise<any> {
    const response = await axios.post('bananas', {age});

    return response.data;
}
