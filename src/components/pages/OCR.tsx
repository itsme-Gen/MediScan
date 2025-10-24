import React, { useState, useEffect } from 'react';
import Sidebar from "../props/Sidebar";
import AppBar from '../props/Appbar';
import { 
  CircleUser, ScanText, SquarePen, User, IdCard, Calendar, 
  RotateCcw, Search, UserPlus, VenusAndMars 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OCR = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    idNumber: "",
    birthDate: "",
    gender: "",
  });

  const navigate = useNavigate();

  //Load saved data from localStorage only once
  useEffect(() => {
    const savedImage = localStorage.getItem("saveImage");
    const savedData = localStorage.getItem("saveData");

    if (savedImage) setImage(savedImage);

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData({
          firstName: parsedData.first_name || "",
          middleName: parsedData.middle_name || "",
          lastName: parsedData.last_name || "",
          idNumber: parsedData.id_number || "",
          birthDate: parsedData.date_of_birth || "",
          gender: parsedData.gender || "",
        });
      } catch (error) {
        console.error("Error parsing savedData:", error);
      }
    }
  }, []);

  // Toggle editable fields
  const toggleEdit = () => setDisabled(prev => !prev);

  //Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //Search for patient records
  const searchRecords = async () => {
    try {
      const response = await axios.post("http://localhost:9090/verify", {
        idNumber: formData.idNumber,
      });

      if (!response.data.success) {
        localStorage.setItem("saveFormData", JSON.stringify(formData))
        console.log("Save Data", formData)
        navigate("/noresults");
        console.log("Patient Not Found");
      } else {
        localStorage.setItem("saveFormData", JSON.stringify(formData))
        console.log("Save Data", formData)
        navigate("/results")

        const patientId = response.data.patient._id

        console.log("This is the id",patientId)
        

        const medicalHistory = await axios.get(`http://localhost:5000/medicalhistory/patients/${patientId}`)
        localStorage.setItem("medicalHistory", JSON.stringify(medicalHistory.data))
        console.log("Medical History",medicalHistory.data)
      }
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        console.log("Server Error");
      }
    }
  };

  // Navigation handlers
  const scanAgain = (() =>{
    localStorage.removeItem("saveFormData")
    localStorage.removeItem("saveData")
    localStorage.removeItem("saveImage")
    localStorage.removeItem("medicalHistory")
    navigate("/scanid")
  });

  return (
    <div className="ocr-result">
      <Sidebar />

      <div className="ocr-content flex-1 flex-cols ml-70">
        <AppBar
          iconTitle={ScanText}
          icon={CircleUser}
          title="OCR Processing"
        />

        <div className="title flex flex-col justify-content items-center mt-5 p-5">
          <h1 className="text-2xl font-bold text-primary">OCR Result</h1>
          <p className="text-md text-gray-500">
            Review and Edit extracted information before proceeding
          </p>
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-6 mx-15">
          {/*Scanned Image */}
          <div className="image-scanned shadow shadow-black-500 p-5 rounded-lg">
            <h3 className="text-md font-bold">Original Image</h3>
            <p className="text-sm text-gray-500">Scanned patient ID document</p>
            <div className="image-id mt-3">
              {image ? (
                <img src={image} alt="Image of ID" className="rounded-lg w-full" />
              ) : (
                <p className="text-gray-500 text-sm">No image found.</p>
              )}
            </div>
          </div>

          {/*Extracted Information */}
          <div className="extracted-information shadow shadow-black-500 p-5 rounded-lg">
            <div className="title flex flex-cols justify-between items-center">
              <div>
                <h1 className="text-md font-bold">Extracted Information</h1>
                <p className="text-sm text-gray-500">Verify the accuracy of extracted data</p>
              </div>

              <div className="button-container">
                <button
                  className="bg-white flex flex-row items-center gap-2 px-2 justify-center text-sm p-2 border border-gray-200 rounded-lg"
                  onClick={toggleEdit}
                >
                  <SquarePen className="text-black h-5 w-5" />
                  {isDisabled ? "Edit fields" : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="input-fields grid grid-cols-2 gap-5 mt-5">
              {/* First Name */}
              <div className="first-name flex flex-col">
                <label
                  htmlFor="firstName"
                  className="flex flex-row items-center gap-2 mb-1 font-semibold text-sm"
                >
                  <User className="h-4 w-4" /> First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white border border-gray-500"
                  } rounded-lg p-3 outline-none`}
                />
              </div>

              {/* Middle Name */}
              <div className="middle-name flex flex-col">
                <label
                  htmlFor="middleName"
                  className="flex flex-row items-center gap-2 mb-1 font-semibold text-sm"
                >
                  <User className="h-4 w-4" /> Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Middle Name"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white border border-gray-500"
                  } rounded-lg p-3 outline-none`}
                />
              </div>

              {/* Last Name */}
              <div className="last-name flex flex-col">
                <label
                  htmlFor="lastName"
                  className="flex flex-row items-center gap-2 mb-1 font-semibold text-sm"
                >
                  <User className="h-4 w-4" /> Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white border border-gray-500"
                  } rounded-lg p-3 outline-none`}
                />
              </div>

              {/* ID Number */}
              <div className="id-number flex flex-col">
                <label
                  htmlFor="idNumber"
                  className="flex flex-row items-center gap-2 mb-1 font-semibold text-sm"
                >
                  <IdCard className="h-4 w-4" /> ID Number
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="ID Number"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white border border-gray-500"
                  } rounded-lg p-3 outline-none`}
                />
              </div>

              {/* Birth Date */}
              <div className="birth-date flex flex-col">
                <label
                  htmlFor="birthDate"
                  className="flex flex-row items-center gap-2 mb-1 font-semibold text-sm"
                >
                  <Calendar className="h-4 w-4" /> Birth Date
                </label>
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  placeholder="10-10-2015"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white border border-gray-500"
                  } rounded-lg p-3 outline-none`}
                />
              </div>

              {/* Gender */}
              <div className="gender flex flex-col">
                <label
                  htmlFor="gender"
                  className="flex flex-row items-center gap-2 mb-1 font-semibold text-sm"
                >
                  <VenusAndMars className="h-4 w-4" /> Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white border border-gray-500"
                  } rounded-lg p-3 outline-none`}
                >
                  <option value="">{formData.gender}</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="button-container flex flex-col justify-center items-center mx-15 my-5 border border-gray-300 p-5 rounded-xl">
          <div className="buttons grid grid-cols-2 gap-4 w-[50%]">
            <button
              onClick={scanAgain}
              className="border border-gray-400 p-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Scan Again
            </button>

            <button
              onClick={searchRecords}
              className="bg-primary p-2 rounded-md text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search Record
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Click "Search Record" to verify against existing patient database
          </p>
        </div>
      </div>
    </div>
  );
};

export default OCR;
