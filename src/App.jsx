import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
