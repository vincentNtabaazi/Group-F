import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AcademicIssuePage from "./AITS_Pages/issuepage";
import StudentDashboard from "./AITS_Pages/StudentDashboard";
import WelcomePage from "./AITS_Pages/WelcomePage";
import LoginPage from "./AITS_Pages/LoginPage";
import LecturerDashboard from "./AITS_Pages/LecturerDashboard";
import Registrardashboard from "./AITS_Pages/Registrardashboard";
import { ToastContainer } from "react-toastify";
import { authContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    document.title = "AITS";
  }, []);

  const isAuthenticated = !!localStorage.getItem("token");
  const { userLoginData } = useContext(authContext);

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes (Accessible without a token) */}
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {/* Protected Routes Based on Role */}
              {userLoginData?.role === "student" && (
                <>
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/student/academic-issues" element={<AcademicIssuePage />} />
                  <Route path="*" element={<Navigate to="/student" />} />
                </>
              )}

              {userLoginData?.role === "lecturer" && (
                <>
                  <Route path="/lecturer" element={<LecturerDashboard />} />
                  <Route path="/lecturer/academic-issues" element={<AcademicIssuePage />} />
                  <Route path="*" element={<Navigate to="/lecturer" />} />
                </>
              )}

              {userLoginData?.role === "registrar" && (
                <>
                  <Route path="/registrar-dashboard" element={<Registrardashboard />} />
                  <Route path="*" element={<Navigate to="/registrar-dashboard" />} />
                </>
              )}
            </>
          )}
        </Routes>
      </Router>

      {/* Global Toast Notifications */}
      <Toaster position="top-right" />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
