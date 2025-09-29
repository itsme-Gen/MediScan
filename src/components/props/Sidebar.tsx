import Button from '@mui/material/Button'
import { Bot, Home, Scan, Search, Stethoscope } from 'lucide-react'
import React from 'react'
import { NotepadText } from 'lucide-react'

const dashboardProps:React.FC = () => {
  return (
    <div className='root-dashboard'>
        <aside className='side-bar flex-shrink-0 h-screen w-70 border-r border-gray-200 p-5'>
            <div className="logo flex flex-col items-center mb-4">
                <Stethoscope className='bg-primary text-white rounded-xl h-15 w-15 p-3 mt-10'/>
                <h1 className='text-xl text-primary font-semibold'>MediScan</h1>
                <h2 className='text-sm text-secondary mb-8'>Medical Record Verification System</h2>
            </div>
            <div className="nav-links w-full">
                <ul className='space-y'>
                    <li className='flex flex-row gap-2 justify-start p-1 m-5'>
                             <Home className='text-secondary w-5 h-5'/>
                            <span className='text-secondary text-md'>Dashboard</span>
                    </li>
                    <li className='flex flex-row gap-2 justify-start p-1 m-5'>
                        <Scan className='text-secondary w-5 h-5'/>
                        <span className='text-secondary text-md'>Scan ID</span>
                    </li>
                    <li className='flex flex-row gap-2 justify-start  p-1 m-5'>
                        <Search className='text-secondary w-5 h-5'/>
                        <span className='text-secondary text-md'>Search</span>
                    </li>
                    <li className='flex flex-row gap-2 justify-start i p-1 m-5'>
                        <NotepadText className='text-secondary w-5 h-5'/>
                        <span className='text-secondary text-md '>Record</span>
                    </li>

                    <li className='flex flex-row gap-2 justify-start p-1 m-5'>
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
