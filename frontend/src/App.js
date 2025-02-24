import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import StockList from './components/StockList.js';

import Details from "./pages/Details.js";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import PortfolioPage from "./pages/PortfolioPage.js";
import "./style.css";  // Importing global styles
import Login from "./components/Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';



const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
};


const App = () => {
  return (
    <>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stocks" element={<StockList />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        

        
        
      </Routes>
    </> 
      
  );
};

export default App;
