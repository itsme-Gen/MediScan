import axios from "axios";

export const verify = async (idNumber: string) => {
  try {
    const response = await axios.post("http://localhost:3001/verify/patient", {idNumber });
    return response
  } catch (error) {
    console.error("Error verifying ID:", error);
    throw error;
  }
};
