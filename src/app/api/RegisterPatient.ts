import axios from "axios";

export const registerPatient = async (data: any) => {
    try{
        const response = await axios.post("http://localhost:3001/api/registerpatient", data);
        return response;
    }catch(error){
        console.error("Error registering patient:", error);
        throw error;
    }
}