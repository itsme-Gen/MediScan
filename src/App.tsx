import React, { useState, useEffect, type JSX } from "react";
import Login from "./components/pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Dashboard from "./components/pages/Dashboard";
import ScanID from "./components/pages/ScanID";
import OCR from "./components/pages/OCR";
import AddtoRecords from "./components/pages/AddtoRecords";
import NoResults from "./components/pages/noResult";
import WithResults from "./components/pages/withResults";
import FullRecords from "./components/pages/FullRecords";
import ChatAssistant from "./components/pages/ChatAssistant";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Check if user already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoggedIn(true);
    }
  }, []);



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
          />

          <Route
            path="/login"
            element={<Login onLogin={() => setLoggedIn(true)} />}
          />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/scanid"
            element={
              <ProtectedRoute>
                <ScanID />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ocr"
            element={
              <ProtectedRoute>
                <OCR />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addtorecords"
            element={
              <ProtectedRoute>
                <AddtoRecords />
              </ProtectedRoute>
            }
          />
          <Route
            path="/noresults"
            element={
              <ProtectedRoute>
                <NoResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <WithResults />
              </ProtectedRoute>
            }
          />

           <Route
            path="/fullmedicalrecords"
            element={
              <ProtectedRoute>
                <FullRecords />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chatassistant"
            element={
              <ProtectedRoute>
                <ChatAssistant />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
