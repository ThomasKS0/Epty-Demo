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
        </div>

        <div className="container" style={{backgroundColor: "red"}}>
          jakd
        </div>

        <div className="container" style={{backgroundColor: "blue"}}>
          jakd
        </div>
        
      </main>

      <Footer />
    </div>
  );
}

export default App;
