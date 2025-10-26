import React, { useEffect, useState } from "react";
import Sidebar from "../props/Sidebar";
import Appbar from "../props/Appbar";
import {
  Calendar,
  CircleCheck,
  CircleUser,
  Home,
  IdCard,
  RotateCcw,
  User,
  VenusAndMars,
  NotepadText,
  Scan,
  Bot
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const WithResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<any>(null);
  const [medicalHistory, setMedicalHistory] = useState<any>({});

  // Navigate back and clear storage
  const scanAgain = () => {
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("medicalHistory");
    window.scrollTo(0, 0);
    navigate("/scanid");
  };

  const viewMedicalRecord = () => {
    navigate("/fullmedicalrecords");
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

    const medicalHistoryData = localStorage.getItem("medicalHistory");
    if (medicalHistoryData) {
      setMedicalHistory(JSON.parse(medicalHistoryData));
    }
  }, []);

  return (
    <div className="with-results flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col overflow-y-auto lg:ml-70">
        <Appbar iconTitle={Home} title="Verification Results" icon={CircleUser} />

        {/* Header */}
        <div className="text-center mt-5 px-4 sm:px-6">
          <h1 className="text-2xl font-bold text-primary">Patient Info</h1>
          <p className="text-md text-gray-500">
            Patient Records Search Completed
          </p>
        </div>

        {/* Result Card */}
        <div className="flex justify-center mt-6 mb-10 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full max-w-3xl border border-green-500 rounded-xl p-5 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <CircleCheck className="text-green-500 h-10 w-10" />
              <div>
                <h3 className="font-bold text-xl">Patient Record Found</h3>
                <p className="text-gray-500">
                  Existing patient record has been located and verified.
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 text-center sm:text-right">
              <div className="bg-secondary text-white px-3 py-1 rounded-lg text-sm">
                Existing Patient
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-10 mb-10">
          {/* Scanned Info */}
          <div className="border border-gray-300 p-5 rounded-lg bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Scanned Information</h2>
            <p className="text-sm text-gray-500 mb-5">
              Data extracted from the ID document
            </p>

            {formData ? (
              <>
                <div className="flex items-center gap-4 mb-3">
                  <User className="text-gray-500" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {formData.firstName} {formData.middleName}{" "}
                      {formData.lastName}
                    </h3>
                    <p className="text-gray-500 text-sm">Full Name</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <IdCard className="text-gray-500" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {formData.idNumber}
                    </h3>
                    <p className="text-gray-500 text-sm">ID Number</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <Calendar className="text-gray-500" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {formData.birthDate}
                    </h3>
                    <p className="text-gray-500 text-sm">Birth Date</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <VenusAndMars className="text-gray-500" />
                  <div>
                    <h3 className="text-lg font-semibold">{formData.gender}</h3>
                    <p className="text-gray-500 text-sm">Gender</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-500">No scanned data found.</p>
            )}
          </div>

          {/* Patient Summary */}
          <div className="border border-gray-300 p-5 rounded-lg bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Patient Summary</h2>
            <p className="text-sm text-gray-500 mb-4">
              Overview of Existing Patient Records
            </p>

            <div className="bg-green-100 p-4 rounded-lg mb-5 flex items-center gap-3">
              <CircleCheck className="text-green-500 h-5" />
              <h3 className="text-md font-semibold">Patient Verified</h3>
            </div>

            <div className="flex flex-col gap-4">
              {medicalHistory.data && medicalHistory.data.length > 0 ? (
                medicalHistory.data.map((record: any) => (
                  <div
                    key={record._id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Condition Name:</h3>
                      <p className="text-sm font-semibold">
                        {record.condition_name}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Condition Type:</h3>
                      <p className="text-sm font-semibold">
                        {record.condition_type}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Severity:</h3>
                      <p className="text-sm font-semibold">{record.severity}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Status:</h3>
                      <p className="text-sm font-semibold">{record.status}</p>
                    </div>
                    {record.resolution_date && (
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">
                          Resolution Date:
                        </h3>
                        <p className="text-sm font-semibold">
                          {new Date(
                            record.resolution_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No medical history found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mb-20 px-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scanAgain}
              className="flex items-center justify-center border border-gray-400 rounded-md p-3 hover:bg-gray-100 w-full sm:w-auto"
            >
              <RotateCcw className="h-5 mr-2" /> Scan Again
            </button>

            <button
              onClick={viewMedicalRecord}
              className="flex items-center justify-center text-white bg-secondary rounded-md p-3 w-full sm:w-auto"
            >
              View Full Medical Record
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-3 z-50 lg:hidden">
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

export default WithResults;
