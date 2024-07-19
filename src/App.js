
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Cars from './Views/Cars/Cars'
import Header from './Components/Navigation/Header';
function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
