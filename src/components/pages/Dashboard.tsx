import React from 'react'
import Sidebar from "../props/Sidebar";
import Appbar from '../props/Appbar';
import { CircleUser ,Home} from 'lucide-react';
import Greetings from '../props/Greetings';
import Card from "../props/Card"
import BarGraph from '../props/BarGraph';

interface LogoutProps{
    onLogout:() => void
}
const Dashboard:React.FC<LogoutProps> = ({onLogout}) => {
  return (
    <div className='dashboard flex h-screen'>

      <Sidebar/>
      
        <div className="main-content flex-1 flex-col ml-70">
            <Appbar
                iconTitle={Home}
                title='Add to Records'
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

            <div className="cards grid grid-cols-4 gap-5 mx-10 justify-center">

              <Card
              label='Patient Scan Today'
              patientNumber={127}
              date={new Date()}
              bgColor = "bg-card1-gradient"
              />

              <Card
              label='Records Verified'
              patientNumber={98}
              date={new Date()}
              bgColor='bg-card2-gradient'
              />

              <Card
              label='Newly Registered'
              patientNumber={15}
              date={new Date}
              bgColor='bg-card3-gradient'
              />

              <Card
                label='Pending Reviews'
                patientNumber={8}
                date={new Date}
                bgColor='bg-card4-gradient'
              />
            </div>

            <div className="bar_graph_containe w-full flex f justify-center mt-10">
              <div className="bar_graph w-full bg-[#f4f4f4] mx-10 my-10 ">
                  <BarGraph/>
              </div>
            </div>
        </div>

    </div>
  )
}

export default Dashboard
