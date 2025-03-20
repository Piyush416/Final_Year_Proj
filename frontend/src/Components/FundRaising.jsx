import React from "react";

const fundingOptions = [
  "Seed Funding for Scholarship",
  "Seed Funding for Events/Seminars",
  "Seed Funding for Campus Improvement",
  "Funding for Other Activities"
];

const FundraisingOptions = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full h-screen">
      <h2 className="text-xl font-semibold mb-4 text-center">Funding Options</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-700 w-full p-4">
        {fundingOptions.map((option, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg text-center shadow-md">
            <p className="font-semibold">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundraisingOptions;