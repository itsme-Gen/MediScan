import React, { useState } from 'react'
import Sidebar from "../props/Sidebar"
import AppBar from '../props/Appbar'
import {CircleUser, ScanText, 
    SquarePen, User, IdCard, Calendar,RotateCcw,
    Search,
    UserPlus,
    VenusAndMars

} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const OCR = () => {
    const [isdisabled,setDisabled] = useState(true)
    const toggleEdit = () => setDisabled(prev =>!prev)
    const location = useLocation()
    const navigate = useNavigate()
    const {image , extractedData} = location.state || {};

    const {first_name, middle_name, last_name, id_number, date_of_birth , gender} = extractedData || {};

    const [formData,setFormData] = useState({
        firstName: first_name || "",
        middleName: middle_name || "",
        lastName: last_name || "",
        idNumber: id_number || "",
        birthDate: date_of_birth || "",
        gender: gender || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev =>({...prev,[name]:value}));
    }

    const scanAgain = (()=>{
        navigate("/scanid");
    });

    const toAddtoRecords = (() =>{
        navigate("/addtorecords")
    })
  return (
    <div className='ocr-result'>
      <Sidebar/>

      <div className="ocr-content flex-1 flex-cols ml-70">
        <AppBar
            iconTitle={ScanText}
            icon={CircleUser}
            title='OCR Processing'
            firstName='Juan'
            lastName='Dela Cruz'
            role='Doctor'
        />
        <div className="title flex flex-col justify-content items-center mt-5 p-5">
            <h1 className='text-2xl font-bold text-primary'>OCR Result</h1>
            <p className='text-md text-gray-500'>Review and Edit extracted information before proceeding</p>
        </div>

        <div className="grid-container">
            <div className="grid grid-cols-[1fr_2fr] gap-6 mx-15">
                <div className="image-scanned shadow shadow-black-500 p-5 rounded-lg">
                    <h3 className='text-md font-bold'>Original Image</h3>
                    <p className='text-sm text-gray-500'>Scanned patient ID document</p>
                    <div className="image-id">
                        <img src={image} alt="Image of ID" />
                    </div>
                </div>

                <div className="extracted-information shadow shadow-black-500 p-5 rounded-lg">
                    <div className="title flex flex-cols justify-between items-center">
                        <div>
                            <h1 className='text-md font-bold'>Extracted Information</h1>
                            <p className='text-sm text-gray-500'>Verify the accuracy of extracted data</p>
                        </div>

                        <div className="button-container">
                            <button
                                className='bg-white flex flex-row items-center gap-2 px-2 justify-center text-sm p-2 border border-gray-200 rounded-lg' 
                                onClick={toggleEdit}>
                                <SquarePen className='text-black h-5 w-5'/>
                                {isdisabled ? "Edit fields" : "Save Changes" }
                            </button>
                        </div>
                    
                    </div>
                    

                    <div className="input-fields grid grid-cols-2 gap-5 mt-5">
                        <div className="first-name flex flex-col">
                             <label htmlFor="firstName" className='flex flex-row items-center gap-2 mb-1 font-semibold text-sm'><User className='h-4 w-4'/>First Name</label>
                            <input
                                type="text" 
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder='First Name' 
                                disabled={isdisabled} 
                                className={`${isdisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white rounded-lg border border-gray-500 outline-none"}  rounded-lg p-3 `}/>
                        </div>

                        <div className="middle-name flex flex-col">
                             <label htmlFor="middleName" className='flex flex-row items-center gap-2 mb-1 font-semibold text-sm'><User className='h-4 w-4'/>Middle Name</label>
                            <input
                                type="text" 
                                name='middleName'
                                value={formData.middleName}
                                onChange={handleChange}
                                placeholder='Middle Name' 
                                disabled={isdisabled} 
                                className={`${isdisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white rounded-lg border border-gray-500 outline-none"}  rounded-lg p-3 `}/>
                        </div>

                        <div className="last-name flex flex-col">
                             <label htmlFor="lastName" className='flex flex-row items-center gap-2 mb-1 font-semibold text-sm'><User className='h-4 w-4'/>Last Name</label>
                            <input
                                type="text" 
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder='Last Name' 
                                disabled={isdisabled} 
                                className={`${isdisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white rounded-lg border border-gray-500 outline-none"}  rounded-lg p-3 `}/>
                        </div>

                        <div className="id-number flex flex-col">
                            <label htmlFor="idNumber" className='flex flex-row items-center gap-2 mb-1 font-semibold text-sm'> <IdCard className='h-4 w-4'/>ID Number</label>
                             <input 
                                type="text" 
                                name='idNumber'
                                value={formData.idNumber}
                                onChange={handleChange}
                                placeholder='Id Number'
                                disabled={isdisabled} 
                                className={`${isdisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white rounded-lg border border-gray-500 outline-none"}  rounded-lg p-3 `}/>
                        </div>

                        <div className="bird-date flex flex-col">
                            <label htmlFor="birthDate" className='flex flex-row items-center gap-2 mb-1 font-semibold text-sm'> <Calendar className='h4 w-4'/>BirthDate</label>
                            <input type="text" 
                                name='birthDate'
                                value={formData.birthDate}
                                onChange={handleChange}
                                placeholder='10-10-15' 
                                disabled={isdisabled} 
                                className={`${isdisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white rounded-lg border border-gray-500 outline-none"}  rounded-lg  p-3`}/>
                        </div>

                        <div className="gender flex flex-col">
                             <label htmlFor="gender" className='flex flex-row items-center gap-2 mb-1 font-semibold text-sm'><VenusAndMars className='h-4 w-4'/>Gender</label>
                            <input
                                type="text" 
                                name='gender'
                                value={formData.gender}
                                onChange={handleChange}
                                placeholder='Gender' 
                                disabled={isdisabled} 
                                className={`${isdisabled ? "bg-gray-200 cursor-not-allowed" : "bg-white rounded-lg border border-gray-500 outline-none"}  rounded-lg p-3 `}/>
                        </div>

                    </div>
                </div>
            </div>
                 <div className="button-container flex flex-col justify-center items-center mx-15 my-5 border border-gray-300 p-5 rounded-xl">       
                        <div className="buttons grid grid-cols-3 gap-4 w-[50%]">
                            <button onClick={scanAgain} className='border border-gray-400 p-2 rounded-md font-semibold text-sm flex flex-cols items-center justify-center gap-2'>
                                <RotateCcw className='h-4 w-4'/>
                                Scan Again
                            </button>
                            <button 
                                className='bg-primary p-2 rounded-md text-white font-semibold text-sm flex flex-cols items-center justify-center gap-2' >
                                <Search className='h-4 w-4'/>
                                Search Record
                            </button>
                            <button onClick={toAddtoRecords} className='bg-secondary p-2 rounded-md text-white font-semibold text-sm flex flex-cols items-center justify-center gap-1'>
                                <UserPlus className='h-4 w-4'/>
                                Add to Records
                            </button>
                        </div>

                        <div className="sub-text mt-2   ">
                            <p className='text-sm text-gray-500'>Click "Search Record" to verify against existing patient database</p>
                        </div>
                    </div>
        </div>
      </div>
    </div>
  )
}

export default OCR
