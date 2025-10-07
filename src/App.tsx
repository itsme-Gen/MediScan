import React, { useState } from 'react'
import Login from './components/pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Dashboard from "./components/pages/Dashboard"
import ScanID from './components/pages/ScanID';
import OCR from "./components/pages/OCR"
import AddtoRecords from './components/pages/AddtoRecords';

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to = "/login"/>}/>
          {isLoggedIn?(
            <Route path='/dashboard' element={<Dashboard onLogout={()=> setLoggedIn(false)}/>}/>
          ):(
            <Route path='/login' element={<Login onLogin={()=>setLoggedIn(true)}/>} />
          )}
          <Route path="/signup" element={<SignUp />}/>
          <Route path='/scanid' element={<ScanID/>}/>
          <Route path='/ocr' element ={<OCR/>}/>
          <Route path='/addtorecords' element ={<AddtoRecords/>}/>
        </Routes>
      </BrowserRouter>
    </div>


  )
}

export default App;
