import React from 'react'
import Sidebar from "../props/Sidebar";
import Appbar from '../props/Appbar';
import { CircleUser, Home, Scan, NotepadText, Bot } from 'lucide-react';
import Greetings from '../props/Greetings';
import Card from "../props/Card"
import BarGraph from '../props/BarGraph';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // clear saved data and navigate
  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className='dashboard flex flex-col lg:flex-row h-screen'>
      
      {/* Sidebar */}
      <div className="sidebar hidden lg:block">
        <Sidebar/>
      </div>
      
      {/* Main content */}
      <div className="main-content flex-1 flex flex-col lg:ml-70 overflow-y-auto">
        <Appbar
          iconTitle={Home}
          title='Dashboard'
          icon={CircleUser}
        />

        <div className="greetings px-4 sm:px-6 lg:px-10">
          <Greetings/>
        </div>

        {/* Cards section */}
        <div className="cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mx-4 sm:mx-6 lg:mx-10 mt-6">
          <Card
            label='Patient Scan Today'
            patientNumber={127}
            date={new Date()}
            bgColor="bg-card1-gradient"
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
            date={new Date()}
            bgColor='bg-card3-gradient'
          />

          <Card
            label='Pending Reviews'
            patientNumber={8}
            date={new Date()}
            bgColor='bg-card4-gradient'
          />
        </div>

        {/* Bar graph */}
        <div className="bar_graph_container w-full flex justify-center mt-6 sm:mt-8 mb-25 lg:mt-10 mb-6">
          <div className="bar_graph w-full bg-[#f4f4f4] mx-4 sm:mx-6 lg:mx-10 p-4 sm:p-6 rounded-lg">
            <BarGraph/>
          </div>
        </div>
      </div>

      {/*Mobile Navigation*/}
      <div className="mobile-nav fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-3 z-50 lg:hidden">
        <button
          onClick={() => clearStorageAndNavigate('/dashboard')}
          className={`flex flex-col items-center transition ${
            isActive('/dashboard') ? 'text-primary' : 'text-secondary hover:text-primary'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/scanid')}
          className={`flex flex-col items-center transition ${
            isActive('/scanid') ? 'text-primary' : 'text-secondary hover:text-primary'
          }`}
        >
          <Scan className="w-6 h-6" />
          <span className="text-xs font-medium">Scan ID</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/records')}
          className={`flex flex-col items-center transition ${
            isActive('/records') ? 'text-primary' : 'text-secondary hover:text-primary'
          }`}
        >
          <NotepadText className="w-6 h-6" />
          <span className="text-xs font-medium">Records</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate('/chatassistant')}
          className={`flex flex-col items-center transition ${
            isActive('/chatassistant') ? 'text-primary' : 'text-secondary hover:text-primary'
          }`}
        >
          <Bot className="w-6 h-6" />
          <span className="text-xs font-medium">Assistant</span>
        </button>
      </div>
    </div>
  )
}

export default Dashboard
