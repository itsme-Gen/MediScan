import React, { useEffect, useState } from "react";
import Sidebar from "../props/Sidebar";
import Appbar from "../props/Appbar";
import {
  Calendar,
  CircleUser,
  CircleX,
  Home,
  IdCard,
  Plus,
  RotateCcw,
  TriangleAlert,
  User,
  VenusAndMars,
  Scan,
  NotepadText,
  Bot,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NoResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<any>(null);

  // Navigate to registration page
  const register = () => {
    window.scrollTo(0, 0);
    navigate("/addtorecords");
  };

  // Navigate back and clear storage
  const scanAgain = () => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    window.scrollTo(0, 0);
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

  useEffect(() => {
    const saveFormData = localStorage.getItem("saveFormData");
    if (saveFormData) {
      setFormData(JSON.parse(saveFormData));
    }
  }, []);

  return (
    <div className="noresults flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col lg:ml-70 overflow-y-auto">
        <Appbar iconTitle={Home} title="Verification Results" icon={CircleUser} />

        <div className="flex flex-col flex-1 p-4 sm:p-6 lg:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Patient Info</h1>
            <p className="text-md text-gray-500">
              Patient Records Search Completed
            </p>
          </div>

          {/* No Match Found Card */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-3xl border border-yellow-500 bg-yellow-50 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <CircleX className="text-yellow-500 h-12 w-12" />
                <div>
                  <h3 className="font-bold text-lg">No Match Found</h3>
                  <p className="text-gray-500 text-sm">
                    This patient is not in our database. Registration required.
                  </p>
                </div>
              </div>
              <div className="border border-gray-300 text-center rounded-md px-3 py-2 text-sm">
                <span className="font-semibold text-gray-600">New Patient</span>
              </div>
            </div>
          </div>

          {/* Patient Info and Registration Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Scanned Info */}
            <div className="border border-gray-300 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Scanned Information</h2>
              <p className="text-sm text-gray-500 mb-4">
                Data extracted from the ID document
              </p>

              {formData ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <User className="text-gray-500" />
                    <div>
                      <h3 className="font-semibold">
                        {formData.firstName} {formData.middleName}{" "}
                        {formData.lastName}
                      </h3>
                      <p className="text-gray-500 text-sm">Full Name</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <IdCard className="text-gray-500" />
                    <div>
                      <h3 className="font-semibold">{formData.idNumber}</h3>
                      <p className="text-gray-500 text-sm">ID Number</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-500" />
                    <div>
                      <h3 className="font-semibold">{formData.birthDate}</h3>
                      <p className="text-gray-500 text-sm">Birth Date</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <VenusAndMars className="text-gray-500" />
                    <div>
                      <h3 className="font-semibold">{formData.gender}</h3>
                      <p className="text-gray-500 text-sm">Gender</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No scanned data found.</p>
              )}
            </div>

            {/* Registration Required */}
            <div className="border border-gray-300 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                Registration Required
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Complete registration for new patient
              </p>

              <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <TriangleAlert className="text-yellow-500 h-5" />
                  <h3 className="font-semibold text-md">
                    New Patient Registration
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  This patient is not found in our system. Please proceed to new
                  patient registration.
                </p>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Next Steps:</h3>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Complete the medical form</li>
                  <li>Verify insurance information</li>
                  <li>Setup emergency contacts</li>
                  <li>Schedule initial consultation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-24">
            <button
              onClick={scanAgain}
              className="flex items-center justify-center gap-2 border border-gray-400 rounded-md px-5 py-2 hover:bg-gray-100 transition"
            >
              <RotateCcw className="h-5" /> Scan Again
            </button>
            <button
              onClick={register}
              className="flex items-center justify-center gap-2 bg-secondary text-white px-5 py-2 rounded-md hover:bg-primary transition"
            >
              <Plus className="h-5" /> Register New Patient
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-3 z-50 lg:hidden">
        <button
          onClick={() => clearStorageAndNavigate("/dashboard")}
          className={`flex flex-col items-center transition ${
            isActive("/dashboard")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/scanid")}
          className={`flex flex-col items-center transition ${
            isActive("/scanid")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <Scan className="w-6 h-6" />
          <span className="text-xs font-medium">Scan ID</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/records")}
          className={`flex flex-col items-center transition ${
            isActive("/records")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <NotepadText className="w-6 h-6" />
          <span className="text-xs font-medium">Records</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/chatassistant")}
          className={`flex flex-col items-center transition ${
            isActive("/chatassistant")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <Bot className="w-6 h-6" />
          <span className="text-xs font-medium">Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default NoResults;
