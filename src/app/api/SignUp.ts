import axios from "axios";
import type { RegisterForm } from "../models/registerForm";

export const registerUser = async (data: RegisterForm) => {
    try{
        const response = await axios.post("http://localhost:3001/auth/signup", data);
        return response;
    }catch(error){
        console.error("Error registering user:", error);
        throw error
    }
}