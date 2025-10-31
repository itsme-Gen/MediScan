import axios from "axios";

export const getMedicalHistory = async (patientId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8003/medicalhistory/patients/${patientId}`
    );
    localStorage.setItem("medicalHistory", JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.error("Error fetching medical history:", error);
    throw error;
  }
};
