import './index.css'
import './App.css'
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Landing from './components/Landing/LandingPage.jsx';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

function App() {

  return (
    <div>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
    
    </Routes>
      {/* <Login/> */}
    </div>
  );
}

export default App
