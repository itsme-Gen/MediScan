import axios from "axios";
import type { RegisterForm } from "../Models/registerForm";

export const registerUser = async (data: RegisterForm) => {
    try{
        const response = await axios.post("http://localhost:8000/register", data);
        return response;
    }catch(error){
        console.error("Error registering user:", error);
        throw error
    }
}