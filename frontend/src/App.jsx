import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./global.css";
import 'leaflet/dist/leaflet.css';

import Home from "./components/pages/Home";
import Footer from "./components/layout/Footer";
import NotFound from "./components/pages/NotFound";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Leaflet from "./components/layout/Leaflet";
import ListView from "./components/pages/ListView";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[calc(100vh-160px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapview" element={<Leaflet />} />
          <Route path="/list" element={<ListView />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
