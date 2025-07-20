import React, { useState } from "react";

const JobPortal = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "New York, NY", description: "We are looking for a skilled React developer to join our team." },
    { id: 2, title: "Backend Developer", company: "CodeFactory", location: "San Francisco, CA", description: "Seeking a Node.js developer with experience in databases." },
    { id: 3, title: "UI/UX Designer", company: "DesignPro", location: "Remote", description: "Passionate designer needed for web and mobile applications." },
    { id: 4, title: "Data Scientist", company: "DataTech", location: "Seattle, WA", description: "Looking for an experienced data scientist with strong analytical skills." },
    { id: 5, title: "Project Manager", company: "BizSolutions", location: "Austin, TX", description: "Seeking an organized and detail-oriented project manager." },
    { id: 6, title: "Cybersecurity Analyst", company: "SecureNet", location: "Chicago, IL", description: "Looking for an expert in network security and risk assessment." },
    { id: 7, title: "Marketing Manager", company: "AdVision", location: "Los Angeles, CA", description: "Seeking a marketing strategist with experience in digital campaigns." },
    { id: 8, title: "DevOps Engineer", company: "CloudTech", location: "Boston, MA", description: "Looking for an experienced DevOps engineer to manage cloud infrastructure." },
    { id: 9, title: "Product Manager", company: "InnovateX", location: "Denver, CO", description: "Responsible for overseeing product development from idea to launch." },
    { id: 10, title: "HR Specialist", company: "PeopleFirst", location: "Miami, FL", description: "Looking for a professional with experience in talent acquisition and employee relations." }
  ]);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="mt-2 text-gray-500">{job.description}</p>

            {/* Apply Button */}
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPortal;