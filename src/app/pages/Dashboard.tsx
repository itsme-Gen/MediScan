import React from 'react'
import Sidebar from "../components/Sidebar";
import Appbar from '../components/Appbar';
import {
  CircleUser,
  Home,
  Scan,
  NotepadText,
  Bot,
  Activity,
  AlertTriangle,
  Clock3,
  TrendingUp,
} from 'lucide-react';
import Greetings from '../components/Greetings';
import Card from "../components/Card"
import BarGraph from '../components/BarGraph';
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
  const todaySummary = [
    {
      label: "Check-ins",
      value: 42,
      note: "avg 6 per hour",
      icon: Clock3,
      bg: "bg-primary/10",
      color: "text-primary",
    },
    {
      label: "Waiting for triage",
      value: 8,
      note: "median wait 6 min",
      icon: Activity,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "Discharges",
      value: 12,
      note: "before 5 pm",
      icon: Home,
      bg: "bg-emerald-50",
      color: "text-emerald-700",
    },
  ];

  const alerts = [
    {
      title: "Abnormal vitals flagged",
      detail: "2 patients need clinician review",
      badge: "High",
      toneBg: "bg-rose-50",
      toneText: "text-rose-700",
    },
    {
      title: "Meds expiring soon",
      detail: "4 prescriptions within 7 days",
      badge: "Action",
      toneBg: "bg-amber-50",
      toneText: "text-amber-700",
    },
    {
      title: "Telehealth slots",
      detail: "80% of today's slots are booked",
      badge: "Monitor",
      toneBg: "bg-sky-50",
      toneText: "text-sky-700",
    },
  ];

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

        {/* Analytics and insights */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5 mx-4 sm:mx-6 lg:mx-10 mt-8 lg:mt-10 mb-10">
          <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Patient load</p>
                <p className="text-xs text-gray-500">Last 8 weeks, by channel</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1">
                <TrendingUp className="h-4 w-4" />
                +12% vs prior
              </span>
            </div>
            <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-2 sm:p-3">
              <BarGraph />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Today at a glance</p>
                <span className="text-xs text-gray-500">Autorefreshes</span>
              </div>
              <div className="mt-4 space-y-3">
                {todaySummary.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-10 w-10 rounded-lg flex items-center justify-center ${item.bg}`}>
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.note}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <p className="text-sm font-semibold text-gray-900">Alerts</p>
              </div>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                {alerts.map((alert) => (
                  <div
                    key={alert.title}
                    className="flex items-start justify-between rounded-lg border border-gray-100 px-3 py-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{alert.title}</p>
                      <p className="text-xs text-gray-500">{alert.detail}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold rounded-full px-3 py-1 ${alert.toneBg} ${alert.toneText}`}
                    >
                      {alert.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
