import React, { useEffect, useState } from "react";
import api from "../api";
import SaveJobButton from "../components/saveJobButton";
import SearchBar from "../components/searchBar";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized access. Please log in.");
          return;
        }

        const response = await api.get("/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.data) {
          setJobs(response.data.data);
          setFilteredJobs(response.data.data);
        } else {
          setError("Failed to fetch jobs. Try again later.");
        }
      } catch (err) {
        console.error("Error fetching jobs", err);
        setError("An error occurred while fetching jobs.");
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(lowercasedQuery) ||
          job.company.toLowerCase().includes(lowercasedQuery) ||
          job.location.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [query, jobs]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      
      <SearchBar query={query} setQuery={setQuery} placeholder="Search saved jobs..." />
      
      {filteredJobs.length === 0 ? (
        <p className="mt-4">No jobs available at the moment.</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="p-4 bg-white dark:bg-gray-800 shadow rounded">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.type}</p>
              <div className="flex items-center space-x-4 mt-2">
                <a href={`/jobs/${job.id}`} className="text-blue-500">
                  View Details
                </a>
                <SaveJobButton jobId={job.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListPage;
