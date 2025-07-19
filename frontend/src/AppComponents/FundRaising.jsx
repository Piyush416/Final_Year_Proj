import { useState } from "react";

// Funding options list
const fundingOptions = [
  "Seed Funding for Scholarship",
  "Seed Funding for Events/Seminars",
  "Seed Funding for Campus Improvement",
  "Funding for Other Activities"
];

const FundraisingOptions = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleOptionClick = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Funding Options</h1>

      {!showForm ? (
        <>
          {/* Funding Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-700 w-full p-4">
            {fundingOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className="bg-gray-100 p-6 rounded-lg text-center shadow-md cursor-pointer hover:bg-blue-100 transition duration-200"
              >
                <p className="font-semibold">{option}</p>
              </div>
            ))}
          </div>

          {/* Motivational Quote */}
          <div className="mt-10 text-center text-gray-600 italic space-y-2">
            <h2 className="text-xl font-semibold">As an alumnus,</h2>
            <h2 className="text-xl font-semibold">your journey has been shaped by this institution.</h2>
            <h2 className="text-xl font-semibold">Now, your contribution can light the path for others—</h2>
            <h2 className="text-xl font-semibold">empowering students, transforming lives,</h2>
            <h2 className="text-xl font-semibold">and building a stronger future for generations to come.</h2>
          </div>



          {/* Impact Info Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="mt-10 space-y-30">
           <div className="bg-gray-100 p-4 rounded shadow">
              <h4 className="font-bold text-gray-700 mb-4"> Scholarships</h4>
              <p className="text-sm text-gray-600">
                Help bright, deserving students achieve their academic dreams by contributing to scholarship programs.
                Your support can remove financial barriers, reward excellence, and ensure that no talented student is left behind due to economic challenges.
                Every contribution brings hope and opportunity.
              </p>
            </div>
            </div>

            <div className="mt-10 space-y-30">
           <div className="bg-gray-100 p-4 rounded shadow">
              <h4 className="font-bold text-gray-600 mb-4"> Campus Development</h4>
              <p className="text-sm text-gray-600">
                Support the growth of modern learning spaces by contributing to the development of classrooms, labs, libraries, and other essential infrastructure. Your donation helps foster a vibrant, technology-enabled campus environment for future generations.
              </p>
            </div>
            </div>

            <div className="mt-10 space-y-30">
            <div className="bg-gray-100 p-4 rounded shadow">
                <h4 className="font-bold text-gray-600 mb-4"> Events & Seminars</h4>
                <p className="text-sm text-gray-600">
                  Help organize academic, cultural, and career development events that inspire learning beyond the classroom. Your support enables interactive seminars, expert talks, and creative platforms that enrich students’ skills, confidence, and overall educational journey.
                </p>
              </div>
              </div>

          </div>

          {/* Contact Info */}
          
          <div className="mt-34 text-center text-sm text-gray-500">
            Need assistance? Contact us at{" "}
            <a href="mailto:support@alumniconnect.edu" className="text-blue-600 underline">
              support@alumniconnect.edu
            </a>
          </div>

        </>
      ) : (
        <ContributionForm selectedCategory={selectedCategory} onBack={() => setShowForm(false)} />
      )}
    </div>
  );
};

const ContributionForm = ({ selectedCategory, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: "Mahfooz Khan", // Replace with dynamic user data if available
    email: "mahfoozkhan0333@gmail.com", // Replace with dynamic user data if available
    phone: "",
    amount: "",
    currency: "INR",
    batchYear: "",
    dedication: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add backend integration here (API call, payment gateway, etc.)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 text-center">Contribute to: {selectedCategory}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Batch / Graduation Year</label>
          <input
            type="text"
            name="batchYear"
            value={formData.batchYear}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Amount to Contribute</label>
          <input
            type="number"
            name="amount"
            min="100"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Dedicate Your Contribution</label>
        <input
          type="text"
          name="dedication"
          value={formData.dedication}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Message to Institution or Students</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FundraisingOptions;
