import { CircleUser, Image, Camera, ImageUp, Zap, Check, CircleAlert, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import Appbar from '../props/Appbar';
import Sidebar from "../props/Sidebar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScanID = () => {
    const [image, setImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    //Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setSelectedFile(file);
            setErrorMessage(null);
            setSuccessMessage(null);
        }
    };

    //Handle Classification + OCR
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
            // Classify the uploaded image
            const classifyResponse = await axios.post("http://localhost:5050/classify", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const { prediction } = classifyResponse.data;
            console.log("Classification Result:", prediction);

            // Not an ID → stop and reset
            if (prediction !== "ID") {
                setErrorMessage(" The uploaded image is not a valid ID. Please try again.");
                setSelectedFile(null);
                setImage(null);
                setLoading(false);
                return;
            }

            // ID detected
            setSuccessMessage(" ID detected! Extracting information please wait...");

            // Extract info 
            const ocrResponse = await axios.post("http://127.0.0.1:5000/extract-info", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Extracted Info:", ocrResponse.data);

            // Check if response contains data or error
            if (ocrResponse.data.error) {
                setErrorMessage(" OCR failed: " + ocrResponse.data.error);
            } else {
                setSuccessMessage(" OCR extraction complete!");
                // Navigate to results page with extracted data
                localStorage.setItem("saveData",JSON.stringify(ocrResponse.data))
                localStorage.setItem("saveImage",image!)
                navigate("/ocr");
            }

        } catch (error) {
            console.error("Error during classification or extraction:", error);
            setErrorMessage(" Failed to process the image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='scanId flex h-screen'>
            <Sidebar />
            <div className="main-content flex-1 flex-col ml-70">
                <Appbar
                    iconTitle={Camera}
                    title='Scan ID'
                    firstName='Juan'
                    lastName='Dela Cruz'
                    role='Doctor'
                    icon={CircleUser}
                />

                {/* Header */}
                <div className="instruction text-center mt-5 p-5">
                    <h1 className='text-2xl font-bold text-primary'>Scan Patient ID</h1>
                    <p className='text-md text-gray-500'>
                        Capture or upload a patient identification document for verification
                    </p>
                </div>

                <div className="container grid grid-cols-2 gap-5 px-15 py-10">
                    {/* Upload Image Section */}
                    <div className="upload_image flex flex-col shadow shadow-black-500 rounded-lg p-5">
                        <div className="title">
                            <div className="flex flex-row items-center gap-2">
                                <Camera />
                                <h1 className='text-xl font-bold'>Capture a Photo</h1>
                            </div>

                            <p className='text-sm text-gray-500 mb-5'>
                                Use your device Camera or Upload an existing image ID
                            </p>

                            {image ? (
                                <div className="image-preview flex justify-center items-center">
                                    <img src={image} alt="Image ID" className='rounded-lg max-h-80 shadow-md' />
                                </div>
                            ) : (
                                <div className="no-image-css text-center">
                                    <Image className="h-10 w-20 text-gray-500 mx-auto" />
                                    <h3 className='text-md font-semibold'>No Image Uploaded</h3>
                                    <p className='text-sm text-gray-500'>
                                        Choose an option below to get started!
                                    </p>
                                </div>
                            )}

                            <div className="button-container grid grid-cols-2 mt-5 gap-2">
                                <input
                                    type="file"
                                    id='upload-image'
                                    accept='image/*'
                                    className='hidden'
                                    onChange={handleFileChange}
                                />

                                <label
                                    htmlFor="upload-image"
                                    className='bg-primary flex flex-row text-white text-md rounded-sm p-2 items-center justify-center gap-2 cursor-pointer hover:bg-blue-700 transition'
                                >
                                    <ImageUp className='h-5 w-5' /> Upload Image
                                </label>

                                <button
                                    className='border border-gray rounded-sm text-md text-black flex flex-row justify-center items-center gap-2 hover:bg-gray-100 transition'
                                >
                                    <Camera className='h-5 w-5' />
                                    Take A Photo
                                </button>
                            </div>

                            {/*Error Message */}
                            {errorMessage && (
                                <div className="bg-red-100 text-red-700 p-3 mt-4 rounded-md text-center text-sm font-semibold">
                                    {errorMessage}
                                </div>
                            )}

                            {/*Success Message */}
                            {successMessage && (
                                <div className="bg-green-100 text-green-700 p-3 mt-4 rounded-md text-center text-sm font-semibold">
                                    {successMessage}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* OCR Section */}
                    <div className="ocr-processing shadow shadow-black-500 rounded-lg p-5">
                        <div className="title">
                            <div className="flex flex-row items-center gap-2">
                                <Zap />
                                <h1 className='text-xl font-bold'>OCR Processing</h1>
                            </div>
                            <p className='text-sm text-gray-500'>
                                Extract data from the captured or uploaded image
                            </p>

                            {image ? (
                                <div className="successfull-message flex flex-col">
                                    <div className="successfull-text bg-green-200 flex flex-col items-center justify-center mt-5 p-5 rounded-xl">
                                        <Check className='text-green-500 bg-green-300 rounded-full h-10 w-10' />
                                        <h3 className='text-md font-semibold'>Ready to Process</h3>
                                        <p className='text-sm text-gray-500'>
                                            Click below to verify and extract text from the ID
                                        </p>
                                    </div>

                                    <div className="button-container w-full flex items-center justify-center mt-5">
                                        <button
                                            className='bg-primary text-white p-2 rounded-md w-full flex items-center justify-center gap-2'
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

                                    <div className="tips bg-blue-100 mt-5 p-4 rounded-lg">
                                        <h3 className='text-md font-semibold'>Tips for best result:</h3>
                                        <ul className='list-disc list-inside text-sm'>
                                            <li className='text-gray-500'>Ensure good lighting on the ID</li>
                                            <li className='text-gray-500'>Keep the ID flat and straight</li>
                                            <li className='text-gray-500'>Avoid shadows and reflections</li>
                                            <li className='text-gray-500'>Make sure all text is clearly visible</li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-image-preview mt-5">
                                    <div className="no-image-css text-center">
                                        <CircleAlert className="h-10 w-20 text-gray-500 mx-auto" />
                                        <h3 className='text-md font-semibold'>No Image to process</h3>
                                        <p className='text-sm text-gray-500'>
                                            Capture or upload an ID image first
                                        </p>
                                    </div>

                                    <div className="tips bg-blue-100 mt-5 p-4 rounded-lg">
                                        <h3 className='text-md font-semibold'>Tips for best result:</h3>
                                        <ul className='list-disc list-inside text-sm'>
                                            <li className='text-gray-500'>Ensure good lighting on the ID</li>
                                            <li className='text-gray-500'>Keep the ID flat and straight</li>
                                            <li className='text-gray-500'>Avoid shadows and reflections</li>
                                            <li className='text-gray-500'>Make sure all text is clearly visible</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScanID;
