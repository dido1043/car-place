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
import AddReview from './Views/AddReview'; 
import { useNavigate } from 'react-router-dom';
import RentRequests from './Views/RentRequests';
import AdminPage from './Views/AdminPage';
import Users from './Views/Users';
import ServiceRecords from './Views/ServiceRecords';
import SortedCarsByPrice from './Views/SortedCarsByPrice';
import AboutUs from './Views/AboutUs';
import AddServiceRecord from './Views/AddServiceRecord';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  const location = useLocation();
  let navigate = useNavigate();

  const checkExpirationTime = () => {
    console.log('checking expiration time')
    const expirationTime = localStorage.getItem('tokenExpiration')
    if (!expirationTime) {
      return
    }

    if (new Date().getTime() > parseInt(expirationTime, 10)) {
      localStorage.clear()
      navigate('/')
      window.location.reload(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkExpirationTime, 60000);
    //window.location.reload(true);
    return () => {
      clearInterval(interval)
    };
  }, [])

  return (
    <div>
      <Header />
      <Routes>
        {token ? (
          <>
            {role == "Admin" ?
              <>
                <Route path="/" element={<Home/>} />
                <Route path="/cars/add" element={<AddCar/>} />
                <Route path="/allCars" element={<AllCars/>} />
                <Route path="/allCars/cars/:id" element={<CarPage/>} />
                <Route path="/allCars/cars/rentrequests" element={<RentRequests />} />
                <Route path="/allCars/cars/sorted" element={<SortedCarsByPrice/>}/>
                <Route path="/allCars/cars/serviceRecords/all/:carId" element={<ServiceRecords/>}/>
                <Route path="/allCars/cars/serviceRecords/add/:carId" element={<AddServiceRecord/>}/>
                <Route path="/about" element={<AboutUs/>}/>
                <Route path="/users" element={<Users/>} />
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="*" element={<NotFoundPage/>} />
              </> :
              <>
                <Route path="/" element={<Home/>}/>
                <Route path="/allCars" element={<AllCars/>}/>
                <Route path="/allCars/cars/:id" element={<CarPage/>}/>
                <Route path="/allCars/cars/reviews/add/:carId" element = {<AddReview/>}/>
                <Route path="/allCars/cars/serviceRecords/all/:carId" element={<ServiceRecords/>}/>
                <Route path="/allCars/cars/sorted" element={<SortedCarsByPrice/>}/>
                <Route path="/about" element={<AboutUs/>}/>
                <Route path="*" element={<NotFoundPage/>} /> 
              </>
            }
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs/>}/>
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