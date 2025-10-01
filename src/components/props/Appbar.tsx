import { Home } from 'lucide-react'
import React from 'react'

interface appbarProps{
    title:string
    firstName:string
    lastName:string
    role:string
    icon:React.ElementType
    iconTitle: React.ElementType
}

const Appbar:React.FC<appbarProps> = ({title,firstName,lastName,role, icon: Icon , iconTitle: IconTitle}) => {
  return (
    <header className='fixed-top flex justify-center m-5'>
        <nav className='flex items-center h-15 w-[95%] shadow shadow-gray-black rounded-xl p-8'>
            <div className="flex flex-row gap-2 items-center">
                 <IconTitle
                 className="text-primary"
                 />
                 <h1 className='text-lg font-semibold text-primary'>{title}</h1>
            </div>
           

            <div className="icon-container flex item-center ml-auto mr-4">
                <Icon className ="text-primary"/>
            </div>

            <div className="containers flex flex-col">
                <div className="info flex flex row">
                    <h2 className='text-sm font-semibold text-secondary mr-1'>{firstName}</h2>
                    <p className='text-sm font-semibold text-secondary'>{lastName}</p>
                </div>
                <div className="role text-center">
                    <p className='text-sm font-bold text-primary'>{role}</p>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Appbar
