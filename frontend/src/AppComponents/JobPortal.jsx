import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
// import toast from "sonner"
const JobPortal = () => {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState([])
  //   { id: 1, title: "Frontend Developer", company: "TechCorp", location: "New York, NY", description: "We are looking for a skilled React developer to join our team." },
  //   { id: 2, title: "Backend Developer", company: "CodeFactory", location: "San Francisco, CA", description: "Seeking a Node.js developer with experience in databases." },
  // ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios.get("/api/getAllOppurtunities").then((response) => {
      console.log("Job Opportunities:", response.data.data);
      setJobs(response.data.data);
    }).catch((error) => {
      // toast.error("Failed to fetch job opportunities");
      // console.error("Error fetching job opportunities:", error);
    });
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    axios.post("/api/createOppurtunity", data)
      .then((response) => {
        console.log("Opportunity Added:", response.data);
        // toast.success("Opportunity added successfully");
        setJobs((prev) => [...prev, response.data.data]);
        reset();
        setIsModalOpen(false);
      })
      .catch((error) => {
        // toast.error("Failed to add opportunity");
        console.error("Error adding opportunity:", error);
      });

    // setJobs((prev) => [
    //   ...prev,
    //   {
    //     id: prev.length + 1,
    //     title: data.title,
    //     company: data.company,
    //     location: data.location,
    //     description: data.description,
    //   },
    // ]);
    // reset();
    // setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      {/* Top Header with Button */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Job Portal</h1>

        {(user?.role === "Alumni" || user?.role === "admin") && (
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transform transition font-medium cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Add Opportunity
          </button>
        )}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">{job.JobTitle}</h2>
            <p className="text-gray-600">{job.CompanyName} - {job.Location}</p>
            <p className="mt-2 text-gray-500">{job.Description}</p>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full">
                <Link to={job.link}>Apply Now</Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Add Opportunity</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("JobTitle", { required: true })}
                placeholder="Job Title"
                className="w-full p-3 border rounded-lg"
              />
              <input
                {...register("CompanyName", { required: true })}
                placeholder="Company Name"
                className="w-full p-3 border rounded-lg"
              />
              <input
                {...register("Location", { required: true })}
                placeholder="Location"
                className="w-full p-3 border rounded-lg"
              />
              <input 
                {...register("link", { required: true })}
                placeholder="Application Link"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                {...register("Description", { required: true })}
                placeholder="Job Description"
                rows="4"
                className="w-full p-3 border rounded-lg"
              ></textarea>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPortal;
