
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Cars from './Views/Cars/Cars'
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Link to="/cars"> Cars </Link>
          </ul>
        </nav>
        <Routes>
          <Route path="/cars" element={<Cars/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
