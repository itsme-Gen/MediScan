import axios from "axios";

export const fetchUser = async (id: string) => {
    try{
        const response = await axios.get(`http://localhost:9000/employee/${id}`, {
            headers: {
                Authorization: `Bearer ${id}`
            }
        });
        return response;
    }catch(error){
        console.error("Error fetching user:", error);
        throw error;
    }
};
