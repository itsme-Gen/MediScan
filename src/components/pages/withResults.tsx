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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withResults = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>(null);
  const [medicalHistory, setMedicalHistory] = useState<any>({})

  //Navigate back and clear storage
  const scanAgain = () => {
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveFormData")
    localStorage.removeItem("medicalHistory")
    window.scrollTo(0, 0);
    navigate("/scanid");
  };


  useEffect(() => {
    const saveFormData = localStorage.getItem("saveFormData");
    if (saveFormData) {
      setFormData(JSON.parse(saveFormData)); 
    }

    const medicalHistoryData = localStorage.getItem('medicalHistory') 
    if (medicalHistoryData){
      setMedicalHistory(JSON.parse(medicalHistoryData))
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
          <div className="no-result-card flex flex-cols items-center justify-between w-[90%] border border-green-500 rounded-xl p-5">
            <div className="container flex flex-cols items-center gap-5">
              <div className="icon-container">
                <CircleCheck className="text-green-500 h-20 w-10" />
              </div>
              <div className="text-message">
                <h3 className="font-bold text-xl">Patient Record Found</h3>
                <p className="text-gray-500">
                    Existing patient record has been located and verified.
                </p>
              </div>
            </div>

            <div className="status w-30 p-1 text-center rounded-lg bg-secondary">
              <h3 className="text-sm text-white">Existing Patient</h3>
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
                <h1 className="text-2xl font-semibold">Patient Summary</h1>
                <p className="text-sm text-gray-500">
                  Overview of Existing Patient Records
                </p>
              </div>

              <div className="warning-container flex flex-col gap-3 bg-green-100 p-4 rounded-lg">
                <div className="label flex flex-cols items-center gap-2">
                  <CircleCheck className="text-green-500 h-5" />
                  <h3 className="text-md font-semibold">Patient Verified</h3>
                </div>

                <div className="text-message">
                  <p className="text-sm text-gray-500">
                    Patient record successfully matched and verified.
                  </p>
                </div>
              </div>

              <div className="summary mt-5 flex flex-col gap-5">
                {medicalHistory.data && medicalHistory.data.length > 0 ? (
                  medicalHistory.data.map((record: any) => (
                    <div
                      key={record._id}
                      className="medical-record border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex flex-row justify-between mb-3">
                        <h3 className="text-sm font-medium">Condition Name:</h3>
                        <p className="text-sm font-semibold">{record.condition_name}</p>
                      </div>

                      <div className="flex flex-row justify-between mb-3">
                        <h3 className="text-sm font-medium">Condition Type:</h3>
                        <p className="text-sm font-semibold">{record.condition_type}</p>
                      </div>

                      <div className="flex flex-row justify-between mb-3">
                        <h3 className="text-sm font-medium">Severity:</h3>
                        <p className="text-sm font-semibold">{record.severity}</p>
                      </div>

                      <div className="flex flex-row justify-between mb-3">
                        <h3 className="text-sm font-medium">Status:</h3>
                        <p className="text-sm font-semibold">{record.status}</p>
                      </div>

                      {record.resolution_date && (
                        <div className="flex flex-row justify-between">
                          <h3 className="text-sm font-medium">Resolution Date:</h3>
                          <p className="text-sm font-semibold">
                            {new Date(record.resolution_date).toLocaleDateString()}
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
          </div>


        <div className="button-container flex justify-center border border-gray-300 rounded-lg mb-10 mx-10 p-8">
          <div className="buttons flex gap-5">
            <button
              onClick={scanAgain}
              className="flex flex-cols items-center border border-gray-400 rounded-sm p-3 hover:bg-gray-100"
            >
              <RotateCcw className="h-5" /> Scan Again
            </button>

            <button
              className="flex flex-cols items-center text-white bg-secondary rounded-sm p-3"
                >
             View Full Medical Record
            </button>

            <button></button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default withResults;
