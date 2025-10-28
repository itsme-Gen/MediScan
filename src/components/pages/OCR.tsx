import React, { useState, useEffect } from 'react';
import Sidebar from "../props/Sidebar";
import AppBar from '../props/Appbar';
import { verify } from '../api/VerifyThePatient';
import { getMedicalHistory } from '../api/getMedicalHistory';
import {
  CircleUser, ScanText, SquarePen, User, IdCard, Calendar,
  RotateCcw, Search, VenusAndMars, Home, NotepadText, Bot, Scan
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();

  // Load saved data
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

  const toggleEdit = () => setDisabled(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const searchRecords = async () => {
    try {
      const response = await verify(formData.idNumber)

      if (!response.data.success) {
        localStorage.setItem("saveFormData", JSON.stringify(formData));
        navigate("/noresults");
      } else {
        localStorage.setItem("saveFormData", JSON.stringify(formData));
        navigate("/results");

        const patientId = response.data.patient._id;
        const medicalHistory = await getMedicalHistory(patientId);
        console.log("Medical History fetched:", medicalHistory.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        console.log("Server Error");
      }
    }
  };

  const scanAgain = () => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    navigate("/scanid");
  };

  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="ocr-page flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar (hidden on mobile) */}
      <div className="sidebar hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col lg:ml-70 overflow-y-auto">
        <AppBar iconTitle={ScanText} icon={CircleUser} title="OCR Processing" />

        <div className="flex flex-col flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">OCR Result</h1>
            <p className="text-gray-500 text-sm">Review and edit extracted information before proceeding</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
            {/* Image Section */}
            <div className="bg-white shadow p-5 rounded-xl">
              <h3 className="text-md font-bold mb-1">Original Image</h3>
              <p className="text-sm text-gray-500 mb-3">Scanned patient ID document</p>
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                {image ? (
                  <img src={image} alt="ID" className="w-full object-cover" />
                ) : (
                  <p className="text-gray-500 text-sm p-4 text-center">No image found.</p>
                )}
              </div>
            </div>

            {/* Extracted Info Section */}
            <div className="bg-white shadow p-5 rounded-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <h3 className="text-md font-bold">Extracted Information</h3>
                  <p className="text-sm text-gray-500">Verify the accuracy of extracted data</p>
                </div>
                <button
                  onClick={toggleEdit}
                  className="mt-3 sm:mt-0 flex items-center gap-2 bg-white text-sm px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <SquarePen className="h-4 w-4" />
                  {isDisabled ? "Edit fields" : "Save Changes"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fields */}
                {[
                  { label: "First Name", name: "firstName", icon: User },
                  { label: "Middle Name", name: "middleName", icon: User },
                  { label: "Last Name", name: "lastName", icon: User },
                  { label: "ID Number", name: "idNumber", icon: IdCard },
                  { label: "Birth Date", name: "birthDate", icon: Calendar },
                ].map((field, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="flex items-center gap-2 mb-1 text-sm font-semibold">
                      <field.icon className="h-4 w-4" /> {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      placeholder={field.label}
                      disabled={isDisabled}
                      className={`p-3 rounded-lg outline-none text-sm ${
                        isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white border border-gray-400"
                      }`}
                    />
                  </div>
                ))}

                {/* Gender */}
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 mb-1 text-sm font-semibold">
                    <VenusAndMars className="h-4 w-4" /> Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={isDisabled}
                    className={`p-3 rounded-lg outline-none text-sm ${
                      isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white border border-gray-400"
                    }`}
                  >
                    <option value="">{formData.gender}</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 mb-30 bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-4 w-full sm:w-1/2">
              <button
                onClick={scanAgain}
                className="border border-gray-400 p-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Scan Again
              </button>
              <button
                onClick={searchRecords}
                className="bg-primary text-white p-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search Record
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Click “Search Record” to verify against the existing patient database.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="mobile-nav fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-3 z-50 lg:hidden">
        <button
          onClick={() => clearStorageAndNavigate('/dashboard')}
          className={`flex flex-col items-center transition ${isActive('/dashboard') ? 'text-primary' : 'text-secondary hover:text-primary'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/scanid')}
          className={`flex flex-col items-center transition ${isActive('/scanid') ? 'text-primary' : 'text-secondary hover:text-primary'}`}
        >
          <Scan className="w-6 h-6" />
          <span className="text-xs font-medium">Scan ID</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/records')}
          className={`flex flex-col items-center transition ${isActive('/records') ? 'text-primary' : 'text-secondary hover:text-primary'}`}
        >
          <NotepadText className="w-6 h-6" />
          <span className="text-xs font-medium">Records</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/chatassistant')}
          className={`flex flex-col items-center transition ${isActive('/chatassistant') ? 'text-primary' : 'text-secondary hover:text-primary'}`}
        >
          <Bot className="w-6 h-6" />
          <span className="text-xs font-medium">Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default OCR;
