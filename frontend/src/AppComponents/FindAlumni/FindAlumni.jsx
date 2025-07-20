import React, { useState } from "react";

const FindAlumni = () => {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([
    { id: 1, name: "John Doe", role: "Software Engineer", location: "New York, NY", bio: "Passionate about building scalable web applications." },
    { id: 2, name: "Jane Smith", role: "Product Manager", location: "San Francisco, CA", bio: "Focused on delivering great user experiences." },
    { id: 3, name: "Alice Johnson", role: "UI/UX Designer", location: "Remote", bio: "Designing intuitive interfaces with user-centric approaches." },
    { id: 4, name: "Robert Brown", role: "Data Scientist", location: "Seattle, WA", bio: "Specialized in machine learning and big data analytics." },
    { id: 5, name: "Michael Clark", role: "DevOps Engineer", location: "Chicago, IL", bio: "Ensuring smooth CI/CD pipelines and cloud infrastructure." },
    { id: 6, name: "Emma Wilson", role: "Marketing Specialist", location: "Los Angeles, CA", bio: "Crafting compelling marketing strategies for brands." }
  ]);

  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(search.toLowerCase()) ||
    profile.role.toLowerCase().includes(search.toLowerCase()) ||
    profile.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profiles</h1>
      
      {/* Search Box */}
      <input 
        type="text" 
        placeholder="Search profiles..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="mb-6 p-3 w-full max-w-md border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-600">{profile.role}</p>
            <p className="mt-2 text-gray-500">{profile.location}</p>
            <p className="mt-2 text-gray-500">{profile.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindAlumni;
