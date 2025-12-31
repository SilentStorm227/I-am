import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

import Home from "./Pages/Home";
import Chains1 from "./Pages/Chains1"
import Navbar from './Pages/Navbar';
import Custom from "./Pages/Custom";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Cart from "./Pages/Cart";
import CustomOrders from "./Pages/Customorders";

function App() {
  return (
    <>

      <Router>

        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/1' element={<Chains1 />} />
          <Route path='/custom-order' element={<Custom />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Sign-in' element={<Signin />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/custom-orders' element={<CustomOrders />} />
        </Routes>

      </Router>

    </>
  )
}

export default App
