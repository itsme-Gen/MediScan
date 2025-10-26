import Button from '@mui/material/Button'
import { Bot, Home, Scan, Search, Stethoscope } from 'lucide-react'
import React from 'react'
import { NotepadText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const dashboardProps:React.FC = () => {
    const navigate = useNavigate()

    const toDashboard = (() =>{
        localStorage.removeItem("saveFormData")
        localStorage.removeItem("saveData")
        localStorage.removeItem("saveImage")
        localStorage.removeItem("medicalHistory")
        navigate("/dashboard")
    })

    const toScanId = (() =>{
        localStorage.removeItem("saveFormData")
        localStorage.removeItem("saveData")
        localStorage.removeItem("saveImage")
        localStorage.removeItem("medicalHistory")
        navigate("/scanid")
    })

    const toChatAssistant = (() =>{
        localStorage.removeItem("saveFormData")
        localStorage.removeItem("saveData")
        localStorage.removeItem("saveImage")
        localStorage.removeItem("medicalHistory")
        navigate("/chatassistant")
    })
    
  return (
    <div className='root-dashboard'>
        <aside className='side-bar flex-shrink-0 h-screen w-70 fixed top-0 left-0  border-r border-gray-200 p-5'>
            <div className="logo flex flex-col items-center mb-4">
                <Stethoscope className='bg-primary text-white rounded-xl h-15 w-15 p-3 mt-10'/>
                <h1 className='text-xl text-primary font-semibold'>MediScan</h1>
                <h2 className='text-sm text-secondary mb-8'>Medical Record Verification System</h2>
            </div>
            <div className="nav-links w-full">
                <ul className='space-y'>
                    <li className='flex flex-row gap-2 justify-start p-1 m-5'
                    onClick={toDashboard}
                    >
                        <Home className='text-secondary w-5 h-5'/>
                        <span className='text-secondary text-md'>Dashboard</span>
                    </li>
                    <li className='flex flex-row gap-2 justify-start p-1 m-5'
                        onClick={toScanId}
                    >
                        <Scan className='text-secondary w-5 h-5'/>
                        <span className='text-secondary text-md'>Scan ID</span>
                    </li>
                    <li className='flex flex-row gap-2 justify-start i p-1 m-5'>
                        <NotepadText className='text-secondary w-5 h-5'/>
                        <span className='text-secondary text-md '>Record</span>
                    </li>

                    <li className='flex flex-row gap-2 justify-start p-1 m-5'
                        onClick={toChatAssistant}
                    >
                        <Bot className='text-secondary w-5 h-5'/>
                        <span className='text-secondary text-md'>Assistant</span>
                    </li>
                    
                </ul>
            </div>
        </aside>
    </div>
  )
}

export default dashboardProps
