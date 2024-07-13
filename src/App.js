
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const postRegister = async () => {
    const data = {
      "email": "testUser@dsa.bg",
      "password": "pAsSds32123"
    };
    try {

      const response = await fetch('https://localhost:7290/register',
        {
          method: 'POST',
          headers: { 
           'Content-Type': 'application/json',
           'Accept': '*/*' 
          },
          body: JSON.stringify(data)
          
        }
      )
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div
          className="App-link"
        >
          <button onClick={postRegister}> Register </button>

        </div>
      </header>
    </div>
  );
}

export default App;
