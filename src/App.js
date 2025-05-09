import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />

      <main className="container">

        <div style={{textAlign: "center"}}>
          <h1>Welcome to Epty</h1>
        </div>

        <div style={{backgroundColor: "red"}}>
          jakd
        </div>

        <div style={{backgroundColor: "blue"}}>
          jakd
        </div>
        
      </main>

      <Footer />
    </div>
  );
}

export default App;
