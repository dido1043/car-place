
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Cars from './Views/Cars/Cars'
import AllCars from './Views/Cars/AllCars';
import Header from './Components/Navigation/Header';
function App() {
  return (
   
    <Router>
      <div>
      <h1 className='text-3xl font-bold '>Car Place</h1>
        <Header/>
        <Routes>
          <Route path="/cars" element={<Cars />} />
          <Route path="/allCars" element={<AllCars />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
