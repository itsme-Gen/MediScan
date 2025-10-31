import axios from "axios";
import type { LoginForm } from "../Models/LoginForm";

export const loginUser = async (data: LoginForm) => {
    try{
        const response = await axios.post("http://localhost:8001/signin", data);    
        return response;
    }catch(error){
        console.error("Error logging in:", error);
        throw error
    }
};