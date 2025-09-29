import React from 'react'
import Sidebar from "../props/Sidebar";
import Appbar from '../props/Appbar';
import { CircleUser } from 'lucide-react';
import Greetings from '../props/greetings';

interface LogoutProps{
    onLogout:() => void
}
const Dashboard:React.FC<LogoutProps> = ({onLogout}) => {
  return (
    <div className='dashboard flex h-screen'>

      <Sidebar/>
      
        <div className="navbar flex-1 flex-col">
            <Appbar
                title='Dashboard'
                firstName='Juan'
                lastName='Dela Cruz'
                role='Doctor'
                icon={CircleUser}
            />

            <div className="greetings">
                <Greetings
                firstName='Juan'
                role='Doctor'
                />
            </div>
        </div>

    </div>
  )
}

export default Dashboard
