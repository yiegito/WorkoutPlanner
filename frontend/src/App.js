import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Home from './pages/Home'
import Info from './pages/Info';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';
function App() {
  const [message, setMessage] = useState("");
  useEffect(() =>{
    fetch("https://workoutplanner-live.onrender.com")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  },[])
  const { user } = useAuthContext()

  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={user ? <Home/> : <Navigate to="/login/"/>}
          />
          <Route
            path="/info"
            element={<Info/>}
          />
          <Route
            path="/signup"
            element={!user ? <Signup/> : <Navigate to="/"/>}
          />
          <Route
            path="/login"
            element={!user ? <Login/> : <Navigate to="/"/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
