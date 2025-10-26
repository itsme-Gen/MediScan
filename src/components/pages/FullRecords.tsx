import React from "react";
import Sidebar from "../props/Sidebar";
import Appbar from "../props/Appbar";
import {
  CircleUser,
  Download,
  NotepadText,
  SquarePen,
  User,
  Home,
  Scan,
  Bot,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const FullRecords: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fullRecords flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Sidebar (hidden on mobile) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col overflow-y-auto lg:ml-70 bg-white">
        {/* Appbar */}
        <Appbar iconTitle={NotepadText} title="Full Medical Record" icon={CircleUser} />

        {/* Title */}
        <div className="text-center mt-6 px-4 sm:px-6">
          <h3 className="text-2xl font-semibold text-primary">Patient Medical Record</h3>
        </div>

        {/* Patient Summary */}
        <div className="flex justify-center mt-6 mb-10 px-4 sm:px-6">
          <div className="summary flex flex-col sm:flex-row justify-between items-center border border-gray-200 rounded-lg w-full max-w-4xl py-6 px-5 bg-white shadow-sm">
            {/* Patient Info */}
            <div className="patient-info flex items-center gap-4 mb-5 sm:mb-0">
              <User className="text-white bg-secondary rounded-full p-2 h-12 w-12" />

              <div>
                <h3 className="text-xl font-semibold">Juan Martinez Dela Cruz</h3>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">
                    <em>BirthDate:</em>
                  </h3>
                  <p className="text-gray-500 text-sm">
                    <em>January 01, 1990</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 cursor-pointer">
              <div className="flex items-center border border-gray-400 rounded-md p-2 hover:bg-gray-100 transition">
                <SquarePen className="h-4 mr-2" />
                <p className="text-sm font-medium">Update Records</p>
              </div>

              <div className="flex items-center border border-gray-400 rounded-md p-2 hover:bg-gray-100 transition">
                <Download className="h-4 mr-2" />
                <p className="text-sm font-medium">Download Record</p>
              </div>
            </div>
          </div>
        </div>

        {/* Records Grid Placeholder */}
        <div className="px-4 sm:px-6 lg:px-10 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Future medical record cards will go here */}
            <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 shadow-sm text-center">
              <p className="text-gray-500 text-sm">No records yet.</p>
            </div>
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

export default FullRecords;
