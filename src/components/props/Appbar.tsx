import React, { useEffect, useRef, useState } from "react";
import { Home, Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppbarProps {
  title: string;
  firstName: string;
  lastName: string;
  role: string;
  icon: React.ElementType;
  iconTitle: React.ElementType;
  onLogout?: () => void; 
}

const Appbar: React.FC<AppbarProps> = ({
  title,
  firstName,
  lastName,
  role,
  icon: Icon,
  iconTitle: IconTitle,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout click
  const handleLogout = () => {
    // Clear token + user info from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");

    // Optional: Notify parent (Dashboard) if prop provided
    if (onLogout) {
      onLogout();
    }

    // Redirect to login page
    navigate("/login");

    // Close menu
    setMenuOpen(false);
  };

  return (
    <header className="fixed-top flex justify-center m-5 z-50">
      <nav className="flex items-center h-15 w-[95%] shadow shadow-gray-black rounded-xl p-8 bg-white relative">
        {/* Left Section - Title */}
        <div className="flex flex-row gap-2 items-center">
          <IconTitle className="text-primary" />
          <h1 className="text-lg font-semibold text-primary">{title}</h1>
        </div>

        {/* Right Section - Menu */}
        <div className="flex items-center ml-auto relative" ref={menuRef}>
          {/* User Icon Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          >
            <Icon className="text-primary" />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 border border-gray-200 z-50 animate-fade-in"
              style={{ left: "20%", top: "100%" }}
            >
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4 mr-2 text-primary" /> Profile
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 h-4 mr-2 text-primary" /> Settings
              </button>
              <hr className="my-1" />
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2 text-red-600" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="containers flex flex-col ml-3">
          <div className="info flex flex-row">
            <h2 className="text-sm font-semibold text-secondary mr-1">
              {firstName}
            </h2>
            <p className="text-sm font-semibold text-secondary">{lastName}</p>
          </div>
          <div className="role text-center">
            <p className="text-sm font-bold text-primary">{role}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Appbar;
