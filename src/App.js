import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header"
import LoginPage from "./pages/LoginPage";
import JobListPage from "./pages/JobListPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import SavedJobsPage from "./pages/SavedJobs";

const isAuthenticated = () => localStorage.getItem("token") !== null;

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs" element={<ProtectedRoute element={<JobListPage />} />} />
        <Route path="/jobs/:id" element={<ProtectedRoute element={<JobDetailsPage />} />} />
        <Route path="/jobs/saved" element={<ProtectedRoute element={<SavedJobsPage />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;