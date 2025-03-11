import React from "react";

const profileData = {
  personal: {
    Name: "John Doe",
    UniversityId: "123456",
    ContactNo: "+123 456 7890",
    PrimaryEmail: "john.doe@example.com",
    SecondaryEmail: "john.secondary@example.com",
    DateOfBirth: "Jan 1, 1990",
  },
  education: {
    Institution: "XYZ University",
    Degree: "Bachelor of Science",
    Specialization: "Computer Science",
  },
  professional: {
    CurrentOrganization: "ABC Corp",
    Title: "Software Engineer",
    Industry: "Information Technology",
    WorkExperience: "5 years",
    Skills: ["JavaScript", "React", "Node.js", "Python"],
  },
};

const Profile = () => {
  return (
    <div className="p-6 w-full mx-auto space-y-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 w-full">
          {/* Personal Information */}
          <div className="bg-gray-100 p-6 rounded-lg w-full">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            {Object.entries(profileData.personal).map(([key, value]) => (
              <p key={key} className="pb-2"><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</p>
            ))}
          </div>
          
          {/* Educational Information */}
          <div className="bg-gray-100 p-6 rounded-lg w-full">
            <h3 className="text-lg font-semibold mb-2">Educational Information</h3>
            {Object.entries(profileData.education).map(([key, value]) => (
              <p key={key} className="pb-2"><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</p>
            ))}
          </div>
          
          {/* Professional Information */}
          <div className="bg-gray-100 p-6 rounded-lg w-full">
            <h3 className="text-lg font-semibold mb-2">Professional Information</h3>
            {Object.entries(profileData.professional).map(([key, value]) => (
              <p key={key} className="pb-2">
                <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {Array.isArray(value) ? value.join(", ") : value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;