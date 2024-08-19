import axios from "./axiosInstance";



export const registerRequest = async (user) => {
    try {
        const response = await axios.post("/register", user);
        return response.data; // Retorna los datos que te devuelva el backend, si es necesario
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (user) => {
    try {
        const response = await axios.post("/login", user);
        return response; // Retorna los datos que te devuelva el backend, si es necesario
    } catch (error) {
        console.log(error);
    }
};

export const verifyTokenRequest = async () => {
    try {
        const response= await axios.get("/verify");
        return response.data;
    } catch (error) {
        return error;
    }
}
