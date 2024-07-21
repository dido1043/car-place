
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Navigation/Header';

// Views
import Cars from './Views/Cars'
import AllCars from './Views/AllCars';
import Register from "./Views/Register"
// -----

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/cars" element={<Cars />} />
          <Route path="/allCars" element={<AllCars />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
