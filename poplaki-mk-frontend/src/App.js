import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Complaints from "./components/complaints/Complaints";
import Brands from "./components/brands/Brands.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import FileComplaint from "./components/fileComplaint/FileComplaint.js";
import Signup from "./components/signup/SignUp.js";
import Login from "./components/login/Login.js";
import { UserProvider } from "./context/UserContext.js";
import ComplaintsDetails from "./components/complaints/ComplaintsDetails.js";
import Footer from "./components/Footer/Footer.js";
import Landing from "./components/landing/Landing.js";
import ErrorPage from "./components/ErrorPage/ErrorPage.js";
import BrandDetails from "./components/brands/BrandDetails.js";
import UserProfile from "./components/userProfile/UserProfile.js";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/complaints/:id" element={<ComplaintsDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="brand/:id" element={<BrandDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/file-complaint" element={<FileComplaint />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
