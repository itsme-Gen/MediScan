import axios from "axios";

export const registerPatient = async (data: any) => {
    try{
        const response = await axios.post("http://localhost:8004/registerPatient", data);
        return response;
    }catch(error){
        console.error("Error registering patient:", error);
        throw error;
    }
}