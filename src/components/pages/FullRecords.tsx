import React from 'react'
import Sidebar from "../props/Sidebar";
import Appbar from '../props/Appbar';
import { CircleUser , Download, NotepadText, SquarePen, User} from 'lucide-react';



const FullRecords:React.FC= () => {
  return (
    <div className='fullRecords flex h-screen'>

      <Sidebar/>
      
        <div className="main-content flex-1 flex-cols ml-70">
            <Appbar
                iconTitle={NotepadText}
                title='Full Medical Record'
                icon={CircleUser}
            />

        <div className="title text-center m-10">
            <h3 className='text-2xl font-semibold text-primary'>Patient Medical Record</h3>
        </div>

        <div className="container flex justify-center">
            <div className="summary flex flex-cols justify-between border border-gray-200 rounded-lg w-[90%] py-10 px-5">
            <div className="patient-info flex flex-cols items-center gap-5">
                <div className="icon-container">
                    <User className='text-white bg-secondary rounded-full p-2 h-15 w-15'/>
                </div>

                <div className="patient-info">
                    <h3 className='text-2xl font-semibold'>Juan Martinez Dela Cruz</h3>

                    <div className="flex flex-cols items-center gap-2">
                        <h3><em>BirthDate:</em></h3>
                        <p className='text-gray-500'><em>January 01, 1990</em></p>
                    </div>
                </div>

            </div>

            <div className="button-container flex items-center gap-5 cursor-pointer">
                <div className='flex flex-cols items-center border border-gray-500 rounded-sm p-1 hover:bg-gray-200 '> 
                <SquarePen className='h-4'/>
                <p className='text-sm'>Update Records</p>
                </div>

                <div className='flex flex-cols items-center border border-gray-500 rounded-sm p-1 hover:bg-gray-200 '> 
                <Download className='h-4'/>
                <p className='text-sm'>Download Record</p>
                </div>
            </div>
            </div>
        </div>

        <div className="container">
            <div className="grid-container">
                
            </div>
        </div>
            

        </div>

    </div>
  )
}

export default FullRecords
