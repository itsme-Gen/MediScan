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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoResults = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>(null);

  //Navigate to registration page
  const register = () => {
    window.scrollTo(0, 0);
    navigate("/addtorecords");
  };

  //Navigate back and clear storage
  const scanAgain = () => {
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveFormData")
    window.scrollTo(0, 0);
    navigate("/scanid");
  };

 
  useEffect(() => {
    const saveFormData= localStorage.getItem("saveFormData");
    if (saveFormData) {
      setFormData(JSON.parse(saveFormData)); 
    }
  }, []);

  return (
    <div className="verification-results">
      <Sidebar />

      <div className="main-content flex-1 flex-col ml-70">
        <Appbar
          iconTitle={Home}
          title="Verification Results"
          firstName="Juan"
          lastName="Dela Cruz"
          role="Doctor"
          icon={CircleUser}
        />

        {/* Header */}
        <div className="text-label text-center mt-5 p-5">
          <h1 className="text-2xl font-bold text-primary">Patient Info</h1>
          <p className="text-md text-gray-500">
            Patient Records Search Completed
          </p>
        </div>

        <div className="container flex justify-center mb-10">
          <div className="no-result-card flex flex-cols items-center justify-between w-[90%] border border-yellow-500 rounded-xl p-5">
            <div className="container flex flex-cols items-center gap-5">
              <div className="icon-container">
                <CircleX className="text-yellow-500 h-20 w-10" />
              </div>
              <div className="text-message">
                <h3 className="font-bold text-xl">No Match found</h3>
                <p className="text-gray-500">
                  This patient is not in our database. Registration required
                </p>
              </div>
            </div>

            <div className="status w-25 border border-gray-400 text-center rounded-lg">
              <h3 className="text-sm">New Patient</h3>
            </div>
          </div>
        </div>

        <div className="grid-container grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 px-10 mb-12">
          <div className="container border border-gray-300 p-5 rounded-lg">
            <div className="scanned-info flex flex-col gap-5">
              <div className="label">
                <h1 className="text-2xl font-semibold">Scanned Information</h1>
                <p className="text-sm text-gray-500">
                  Data extracted from the ID document
                </p>
              </div>

              {formData ? (
                <>
                  <div className="full-name-container flex flex-cols items-center gap-5">
                    <div className="icon-container">
                      <User className="text-gray-500" />
                    </div>
                    <div className="full-name">
                      <h3 className="text-lg font-semibold">
                        {formData.firstName} {formData.middleName}{" "}
                        {formData.lastName}
                      </h3>
                      <p className="text-gray-500 text-sm">Full Name</p>
                    </div>
                  </div>

                  <div className="id-number-container flex flex-cols items-center gap-5">
                    <div className="icon-container">
                      <IdCard className="text-gray-500" />
                    </div>
                    <div className="id-number">
                      <h3 className="text-lg font-semibold">
                        {formData.idNumber}
                      </h3>
                      <p className="text-gray-500 text-sm">ID number</p>
                    </div>
                  </div>

                  <div className="birth-date-container flex flex-cols items-center gap-5">
                    <div className="icon-container">
                      <Calendar className="text-gray-500" />
                    </div>
                    <div className="birth-date">
                      <h3 className="text-lg font-semibold">
                        {formData.birthDate}
                      </h3>
                      <p className="text-gray-500 text-sm">Birth Date</p>
                    </div>
                  </div>

                  <div className="gender-container flex flex-cols items-center gap-5">
                    <div className="icon-container">
                      <VenusAndMars className="text-gray-500" />
                    </div>
                    <div className="gender">
                      <h3 className="text-lg font-semibold">
                        {formData.gender}
                      </h3>
                      <p className="text-gray-500 text-sm">Gender</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No scanned data found.</p>
              )}
            </div>
          </div>

          <div className="container border border-gray-300 p-5 rounded-lg">
            <div className="registration">
              <div className="label mb-5">
                <h1 className="text-2xl font-semibold">Registration Required</h1>
                <p className="text-sm text-gray-500">
                  Complete registration for new patient
                </p>
              </div>

              <div className="warning-container flex flex-col gap-3 bg-yellow-100 p-4 rounded-lg">
                <div className="label flex flex-cols items-center gap-2">
                  <TriangleAlert className="text-yellow-500 h-5" />
                  <h3 className="text-md font-semibold">
                    New Patient Registration
                  </h3>
                </div>

                <div className="text-message">
                  <p className="text-sm text-gray-500">
                    This patient is not found in our system. Please proceed to
                    new patient registration
                  </p>
                </div>
              </div>

              <div className="next-step-container mt-5">
                <h3 className="text-md font-semibold">Next Step:</h3>
                <ul className="list-disc list-inside">
                  <li className="text-gray-600">Complete the medical Form</li>
                  <li className="text-gray-600">
                    Verify Insurance Information
                  </li>
                  <li className="text-gray-600">Setup Emergency Contacts</li>
                  <li className="text-gray-600">
                    Schedule Initial Consultation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="button-container flex justify-center border border-gray-300 rounded-lg mb-10 mx-10 p-8">
          <div className="buttons flex gap-10">
            <button
              onClick={scanAgain}
              className="flex flex-cols items-center border border-gray-400 rounded-sm p-3 hover:bg-gray-100"
            >
              <RotateCcw className="h-5" /> Scan Again
            </button>
            <button
              onClick={register}
              className="flex flex-cols items-center bg-secondary text-white p-3 rounded-sm hover:bg-primary"
            >
              <Plus /> Register new Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoResults;
