import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

import Home from "./Pages/Home";
import Chains1 from "./Pages/Chains1"
import Navbar from './Pages/Navbar';

function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/1' element={<Chains1 />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
