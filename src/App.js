
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Navigation/Header';


// Views
import Cars from './Views/Cars'
import AllCars from './Views/AllCars';
import Register from "./Views/Register"
import CarPage from "./Views/CarPage"
import AddCar from './Views/AddCar';
import NotFoundPage from './Views/NotFoundPage';
import Login from './Views/Login';

// -----

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path='/'/>
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/add" element={<AddCar />} />
          <Route path="/allCars" element={<AllCars />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allCars/cars/:id" element={<CarPage />} />
        
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
