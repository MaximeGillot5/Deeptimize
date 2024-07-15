import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login, Forgot, Help, Upload, Results, Account } from './pages/';
import "./App.css"
import { useEffect, useRef, useState } from "react";

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/forgot" element={<Forgot />} /> */}
          <Route path="/help" element={<Help />} />
          {/* <Route path="/account" element={<Account />} /> */}
          <Route path="/upload" element={<Upload />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
