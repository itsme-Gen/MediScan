import axios from "axios";
import type { LoginForm } from "../models/LoginForm";

export const loginUser = async (data: LoginForm) => {
    try{
        const response = await axios.post("http://localhost:3001/auth/signin", data);    
        return response;
    }catch(error){
        console.error("Error logging in:", error);
        throw error
    }
};