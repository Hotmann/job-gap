import React, { useState } from "react";
import api from "../api";

const SaveJobButton = ({ jobId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSaveJob = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized access. Please log in.");
        return;
      }

      const response = await api.post(`jobs/save/${jobId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success) {
        setIsSaved(true);
      } else {
        setError(response.data?.message || "Failed to save the job.");
      }
    } catch (err) {
      console.error("Error saving job", err);
      setError("An error occurred while saving the job.");
    }
  };

  return (
    <div>
      <button
        className={`px-4 py-2 rounded ${
          isSaved ? "bg-gray-500" : "bg-blue-500"
        } text-white dark:bg-blue-700 dark:disabled:bg-gray-500`}
        onClick={handleSaveJob}
        disabled={isSaved}
      >
        {isSaved ? "Saved" : "Save Job"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SaveJobButton;
