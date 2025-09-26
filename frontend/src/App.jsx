import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import "./index.css";

function App() {
  return (
    <div className="bg-red-500 w-20 h-20">Test</div>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<h1>Home</h1>} />
    //     <Route path="/signup" element={<Signup />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
