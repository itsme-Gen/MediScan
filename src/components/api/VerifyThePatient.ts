import axios from "axios";

export const verify = async (idNumber: string) => {
  try {
    const response = await axios.post("http://localhost:8005/verify", {idNumber });
    return response
  } catch (error) {
    console.error("Error verifying ID:", error);
    throw error;
  }
};
