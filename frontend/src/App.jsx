import React from "react";
import Home from "./landingPage/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompleteProfile from "./landingPage/CompleteProfile";
import Dashboard from "./landingPage/Dashboard";
<<<<<<< HEAD
=======
import OrderParcel from "./landingPage/orderParcel";
import SearchingPage from "./landingPage/SearchingPage";
>>>>>>> main

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
=======
          <Route path="/order-parcel" element={<OrderParcel />} />
          <Route path="/searching" element={<SearchingPage />} />
>>>>>>> main
        </Routes>
      </Router>
    </>
  );
}

export default App;
