import React from "react";
import Home from "./landingPage/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompleteProfile from "./landingPage/CompleteProfile";
import Dashboard from "./landingPage/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
