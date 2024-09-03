import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Components/Navigation/Header';

// Views

import AllCars from './Views/AllCars';
import Register from './Views/Register';
import CarPage from './Views/CarPage';
import AddCar from './Views/AddCar';
import NotFoundPage from './Views/NotFoundPage';
import Login from './Views/Login';
import Home from './Views/Home';
import { useNavigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation();
  let navigate = useNavigate();



  useEffect(() => {
    const checkExpirationTime = () => {
      console.log(new Date().getTime() > parseInt(expirationTime, 10));
      const expirationTime = localStorage.getItem('expirationTime');
      if (new Date().getTime() > parseInt(expirationTime, 10)) {
        localStorage.clear();
        navigate('/login')
      }
    };

    setInterval(checkExpirationTime, 60000);


  }, []);



  return (
    <div>
      <Header />
      <Routes>
        {token ? (
          <>
            <Route path="/cars/add" element={<AddCar />} />
            <Route path="/allCars" element={<AllCars />} />
            <Route path="/allCars/cars/:id" element={<CarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
          </>

        )}
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}