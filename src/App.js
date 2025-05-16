import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />

      <main>

        <div style={{textAlign: "center"}}>
          <h1>Welcome to Epty</h1>
          <p>Find propertie</p>
        </div>

        <div className="mainpagecontainer" style={{backgroundColor: "#2C2C2C", height: "200px"}}>
          <h2>Find properties</h2>
          <p>Find propertie</p>
          <button>jakd</button>
        </div>

        <div className="mainpagecontainer" style={{backgroundColor: "#423130", height: "200px"}}>
          <h2>Find buyers today</h2>
          <p>Find buyers</p>
          <button>jakd</button>
        </div>
        
        <div className="mainpagecontainer" style={{backgroundColor: "#121212", height: "200px"}}>
          <h2>How it works</h2>
          <p>dmedmedk dedoemdk ekdeodmoe ddmomde dkednie dk e</p>
        </div>

        
      </main>

      <Footer />
    </div>
  );
}

export default App;
