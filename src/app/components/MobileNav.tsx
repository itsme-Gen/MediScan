import React from 'react'
import { Home, Scan, NotepadText, Bot, Stethoscope } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MobileNav: React.FC = () => {
  const navigate = useNavigate()

  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem("saveFormData")
    localStorage.removeItem("saveData")
    localStorage.removeItem("saveImage")
    localStorage.removeItem("medicalHistory")
    navigate(path)
  }

  return (
    <div className="mobile-nav fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-3 z-50 lg:hidden">
      <button
        onClick={() => clearStorageAndNavigate('/dashboard')}
        className="flex flex-col items-center text-secondary hover:text-primary transition"
      >
        <Home className="w-6 h-6" />
        <span className="text-xs">Dashboard</span>
      </button>

      <button
        onClick={() => clearStorageAndNavigate('/scanid')}
        className="flex flex-col items-center text-secondary hover:text-primary transition"
      >
        <Scan className="w-6 h-6" />
        <span className="text-xs">Scan ID</span>
      </button>

      <button
        onClick={() => clearStorageAndNavigate('/records')}
        className="flex flex-col items-center text-secondary hover:text-primary transition"
      >
        <NotepadText className="w-6 h-6" />
        <span className="text-xs">Records</span>
      </button>

      <button
        onClick={() => clearStorageAndNavigate('/chatassistant')}
        className="flex flex-col items-center text-secondary hover:text-primary transition"
      >
        <Bot className="w-6 h-6" />
        <span className="text-xs">Assistant</span>
      </button>
    </div>
  )
}

export default MobileNav
