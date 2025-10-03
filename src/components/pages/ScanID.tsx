import { CircleUser, Image , Camera,ImageUp, Zap, Check ,CircleAlert} from 'lucide-react'
import React, { useState } from 'react'
import Appbar from '../props/Appbar'
import Sidebar from "../props/Sidebar"
import Greetings from '../props/Greetings'
import { useNavigate } from 'react-router-dom'

const ScanID = () => {
    const [preview , setPreview]  = useState<string | null>(null);
    const navigate = useNavigate()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0]
        if(file){
            setPreview(URL.createObjectURL(file));
        }
    }

  return (
    <div className='scanId flex h-screen'>
        <Sidebar/>
        <div className="main-content flex-1 flex-col ml-70">
            <Appbar
                iconTitle={Camera}
                title='Scan ID'
                firstName='Juan'
                lastName='Dela Cruz'
                role='Doctor'
                icon={CircleUser}
            />

            <div className="instruction text-center mt-5 p-5">
                <h1 className='text-2xl font-bold text-primary'>Scan Patient ID</h1>
                <p className='text-md text-gray-500'>Capture or upload a patient identification document for verification</p>
            </div>

            <div className="container grid grid-cols-2 gap-5 px-15 py-10">

                <div className="upload_image flex flex-col shadow shadow-black-500 rounded-lg p-5">
                    <div className="title">
                        <div className="flex flex-row items-center gap-2">
                            <Camera/>
                            <h1 className='text-xl font-bold'>Capture a Photo</h1>
                        </div>

                        <p className='text-sm text-gray-500 mb-5'>Use your device Camera or Upload an existing image ID</p>

                        {preview ?(
                            <div className="image-preview flex justify-center items center">
                                <img src= {preview} alt="Image ID" />
                            </div>
                        ):(
                            <div className="no-image-css">
                                <Image className="h-10 w-20 text-gray-500"/>
                                <h3 className='text-md font-semibold'>No Image Uploaded</h3>
                                <p className='text-sm text-gray-500'>Choose an option below to get started!</p>
                            </div>
                        )}

                        <div className="button-container grid grid-cols-2 mt-5 gap-2">
                            <input type="file"
                                id='upload-image' 
                                accept='image/*' 
                                className='hidden'
                                onChange={handleFileChange}
                            />

                            <label htmlFor="upload-image" 
                                className='bg-primary flex flex-row text-white text-md rounded-sm p-2 items-center justify-center gap-2'>
                                <ImageUp
                                className='h-5 w-5'
                                />Upload Image
                            </label>

                            <button className='border border-gray rounded-sm text-md text-black flex flex-row justify-center items-center gap-2'>
                                <Camera
                                className='h-5 w-5'
                                />
                                Take A Photo
                            </button>

                        </div>

                    </div>
                </div>

                <div className="ocr-processing shadow shadow-black-500 rounded-lg p-5">
                    <div className="title">
                        <div className="flex flex-row items-center gap-2">
                            <Zap/>
                             <h1 className='text-xl font-bold'>OCR Processing</h1>
                        </div>
                        <p className='text-sm text-gray-500'>Extract data from the captured or upload image</p>

                        {preview ?(
                            <div className="successfull-message flex flex-col">
                                <div className="successfull-text bg-green-200 flex flex-col items-center justify-center mt-5 p-5 rounded-xl">
                                    <Check className='text-green-500 bg-green-300 rounded-full h-10 w-10'
                                    />
                                    <h3 className='text-md font-semibold'>Ready to Process </h3>
                                    <p className='text-sm text-gray-500'>Click below to extract text from the ID</p>
                                </div>

                                <div className="button-container w-full flex items-center justify-center mt-5">
                                    <button className='bg-primary text-white p-2 rounded-md w-full'
                                    onClick={() =>{
                                        navigate("/ocr");
                                        window.scrollTo(0,0)
                                    }}
                                    >
                                    Start OCR Processing
                                    </button>
                                </div>

                                <div className="tips bg-blue-100 mt-5 p-4 rounded-lg">
                                    <h3 className='text-md font-semibold'>Tips for best Result:</h3>
                                    <ul className='list-disc list-inside'>
                                        <li className='text-sm text-gray-500' >Ensure good lighting on the ID</li>
                                        <li className='text-sm text-gray-500' >Keep the ID flat and straight</li>
                                        <li className='text-sm text-gray-500' >Avoid shadow and reflections</li>
                                        <li className='text-sm text-gray-500' >Make sure all text is clearly visible</li>
                                    </ul>
                                </div>
                            </div>
                        
                        ):(
                            <div className="no-image-preview mt-5">
                                <div className="no-image-css">
                                    <CircleAlert className="h-10 w-20 text-gray-500"/>

                                    <h3 className='text-md font-semibold'>No Image to process</h3>

                                    <p className='text-sm text-gray-500'>
                                        Captured or Upload an ID image first
                                    </p>
                                </div>
                                 <div className="tips bg-blue-100 mt-5 p-4 rounded-lg">
                                    <h3 className='text-md font-semibold'>Tips for best Result:</h3>
                                    <ul className='list-disc list-inside text-sm'>
                                        <li className='text-gray-500 text-sm'>Ensure good lighting on the ID</li>
                                        <li className='text-gray-500 text-sm'>Keep the ID flat and straight</li>
                                        <li className='text-gray-500 text-sm'>Avoid shadow and reflections</li>
                                        <li className='text-gray-500 text-sm'>Make sure all text is clearly visible</li>
                                    </ul>
                                </div>
                            </div>
                          
                        )}
                    </div>
                </div>
            </div>
        </div>


    </div>
  )
}

export default ScanID
