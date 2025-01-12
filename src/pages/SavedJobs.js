import React, { useEffect, useState } from "react";
import api from "../api";
import SearchBar from "../components/searchBar";

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized access. Please log in.");
          return;
        }

        const response = await api.get("jobs/saved");
        if (response.data?.success) {
          setSavedJobs(response.data.data);
          setFilteredJobs(response.data.data);
        } else {
          setError("Failed to fetch saved jobs.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching saved jobs.");
      }
    };

    fetchSavedJobs();
  }, []);

  useEffect(() => {
    const filtered = savedJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [query, savedJobs]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
      <SearchBar query={query} setQuery={setQuery} placeholder="Search saved jobs..." />
      {error && <p className="text-red-500">{error}</p>}
      {filteredJobs.length === 0 ? (
        <p>No saved jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
          <div key={job.id} className="mb-4 border-b pb-4">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Type: {job.type}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedJobsPage;
