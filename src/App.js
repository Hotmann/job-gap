import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
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
    // Check localStorage for the user's theme preference
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Update the theme in localStorage whenever it changes
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    // Add or remove the dark class on the root <html> element
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <header className="p-4 flex justify-between items-center">
      <Link to="/jobs">
      <h1 className="text-xl font-bold">Job Gap</h1>
      </Link>
  <div className="flex space-x-6">
    <Link
      to="/jobs/saved"
      className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2"
    >
      Saved Jobs
    </Link>

    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  </div>
</header>


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