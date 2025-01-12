import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import SaveJobButton from "../components/saveJobButton";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized access. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const response = await api.get(`jobs/${id}`);
        if (response.data?.success) {
          setJob(response.data.data);
        } else {
          setError("Failed to fetch job details. Try again later.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching job details.");
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!job) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-lg">Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Type: {job.type}</p>
      <p>
        Remote:{" "}
        <span className={job.remote ? "text-green-500" : "text-red-500"}>
          {job.remote ? "Yes" : "No"}
        </span>
      </p>
      <SaveJobButton jobId={job.id} />
    </div>
  );
};

export default JobDetailsPage;
