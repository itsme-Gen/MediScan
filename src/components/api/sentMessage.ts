import axios from "axios";

export  const sendMessage = async (data: any) => {
    try{
        const response = await axios.post("http://localhost:5050/chat", data);
        return response;
    }catch(error){
        console.error("Error sending message:", error);
        throw error;
    }
};
