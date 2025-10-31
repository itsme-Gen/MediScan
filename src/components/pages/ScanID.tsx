import {
  CircleUser,
  Image,
  Camera,
  ImageUp,
  Zap,
  Check,
  CircleAlert,
  Loader2,
  Home,
  Scan,
  NotepadText,
  Bot,
} from "lucide-react";
import React, { useState } from "react";
import Appbar from "../props/Appbar";
import { classify } from "../api/classify";
import { extract } from "../api/Ocr";
import Sidebar from "../props/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";

const ScanID = () => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear storage and navigate
  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  };

  // Handle Classification + OCR
  const handleClassify = async () => {
    if (!selectedFile) {
      setErrorMessage("⚠️ Please upload an image first!");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Classify uploaded image
      const classifyResponse = await classify(formData);
      const { prediction } = classifyResponse.data;
      console.log("Classification Result:", prediction);

      if (prediction !== "ID") {
        setErrorMessage("The uploaded image is not a valid ID. Please try again.");
        setSelectedFile(null);
        setImage(null);
        setLoading(false);
        return;
      }

      setSuccessMessage("ID detected! Extracting information, please wait...");

      // Extract info
      const ocrResponse = await extract(formData);
      console.log("Extracted Info:", ocrResponse.data);

      if (ocrResponse.data.error) {
        setErrorMessage("OCR failed: " + ocrResponse.data.error);
      } else {
        setSuccessMessage("OCR extraction complete!");
        localStorage.setItem("saveData", JSON.stringify(ocrResponse.data));
        localStorage.setItem("saveImage", image!);
        navigate("/ocr");
      }
    } catch (error) {
      console.error("Error during classification or extraction:", error);
      setErrorMessage("Failed to process the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanId flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="sidebar hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col lg:ml-70 overflow-y-auto">
        <Appbar iconTitle={Camera} title="Scan ID" icon={CircleUser} />

        {/* Header */}
        <div className="instruction text-center mt-5 px-4 sm:px-6 lg:px-10">
          <h1 className="text-2xl font-bold text-primary">Scan Patient ID</h1>
          <p className="text-md text-gray-500">
            Capture or upload a patient identification document for verification
          </p>
        </div>

        {/* Main Container */}
        <div className="container grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 px-4 sm:px-6 lg:px-10 py-10 items-start">
          {/* Upload Section */}
          <div className="upload_image h-full flex flex-col shadow-md rounded-lg p-10 bg-white">
            <div className="title">
              <div className="flex flex-row items-center gap-2">
                <Camera />
                <h1 className="text-xl font-bold">Capture a Photo</h1>
              </div>

              <p className="text-sm text-gray-500 mb-5">
                Use your device camera or upload an existing image ID
              </p>

              {image ? (
                <div className="image-preview flex justify-center items-center">
                  <img
                    src={image}
                    alt="Image ID"
                    className="rounded-lg max-h-80 shadow-md"
                  />
                </div>
              ) : (
                <div className="no-image-css text-center">
                  <Image className="h-10 w-20 text-gray-500 mx-auto" />
                  <h3 className="text-md font-semibold">No Image Uploaded</h3>
                  <p className="text-sm text-gray-500">
                    Choose an option below to get started!
                  </p>
                </div>
              )}

              <div className="button-container grid grid-cols-1 sm:grid-cols-2 mt-5 gap-3">
                {/* Upload from file */}
                <input
                  type="file"
                  id="upload-image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <label
                  htmlFor="upload-image"
                  className="bg-primary flex flex-row text-white text-md rounded-md p-2 items-center justify-center gap-2 cursor-pointer hover:bg-blue-700 transition"
                >
                  <ImageUp className="h-5 w-5" /> Upload Image
                </label>

                {/* Capture from camera */}
                <input
                  type="file"
                  id="capture-photo"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <label
                  htmlFor="capture-photo"
                  className="border border-gray-300 rounded-md p-2 text-md text-black flex flex-row justify-center items-center gap-2 hover:bg-gray-100 transition cursor-pointer"
                >
                  <Camera className="h-5 w-5" />
                  Take A Photo
                </label>
              </div>

              {errorMessage && (
                <div className="bg-red-100 text-red-700 p-3 mt-4 rounded-md text-center text-sm font-semibold">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="bg-green-100 text-green-700 p-3 mt-4 rounded-md text-center text-sm font-semibold">
                  {successMessage}
                </div>
              )}
            </div>
          </div>

          {/* OCR Section */}
          <div className="ocr-processing h-full shadow-md rounded-lg p-5 bg-white self-stretch mb-20">
            <div className="title">
              <div className="flex flex-row items-center gap-2">
                <Zap />
                <h1 className="text-xl font-bold">OCR Processing</h1>
              </div>
              <p className="text-sm text-gray-500">
                Extract data from the captured or uploaded image
              </p>

              {image ? (
                <div className="successfull-message flex flex-col">
                  <div className="successfull-text bg-green-200 flex flex-col items-center justify-center mt-5 p-5 rounded-xl">
                    <Check className="text-green-500 bg-green-300 rounded-full h-10 w-10" />
                    <h3 className="text-md font-semibold">Ready to Process</h3>
                    <p className="text-sm text-gray-500">
                      Click below to verify and extract text from the ID
                    </p>
                  </div>

                  <div className="button-container w-full flex items-center justify-center mt-5">
                    <button
                      className="bg-primary text-white p-2 rounded-md w-full flex items-center justify-center gap-2"
                      onClick={handleClassify}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5" /> Processing...
                        </>
                      ) : (
                        "Start OCR Processing"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-image-preview mt-5">
                  <div className="no-image-css text-center">
                    <CircleAlert className="h-10 w-20 text-gray-500 mx-auto" />
                    <h3 className="text-md font-semibold">No Image to process</h3>
                    <p className="text-sm text-gray-500">
                      Capture or upload an ID image first
                    </p>
                  </div>
                </div>
              )}

              <div className="tips bg-blue-100 mt-5 p-4 rounded-lg">
                <h3 className="text-md font-semibold">Tips for best result:</h3>
                <ul className="list-disc list-inside text-sm">
                  <li className="text-gray-500">Ensure good lighting on the ID</li>
                  <li className="text-gray-500">Keep the ID flat and straight</li>
                  <li className="text-gray-500">Avoid shadows and reflections</li>
                  <li className="text-gray-500">Make sure all text is clearly visible</li>
                </ul>
              </div>
            </div>
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

export default ScanID;
