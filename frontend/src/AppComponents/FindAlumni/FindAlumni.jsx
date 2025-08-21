import React, { useEffect, useState } from "react";
import { createAxiosInstance } from "../../axios/axiosInstance";
import { useProgress } from "../../Contexts/ProgressContext";
import { motion } from "framer-motion"; // ✅ animation
import { useNavigate } from "react-router-dom";

const FindAlumni = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [isCollegeOpen, setIsCollegeOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);

  const { showProgress, hideProgress } = useProgress();
  const axios = createAxiosInstance(showProgress, hideProgress);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const result = await axios.get("/api/configuration?name=Collegename");
        setColleges(result.data.data || []);
      } catch (error) {
        console.error("Something went wrong while fetching colleges", error);
      }
    };

    const fetchAllProfiles = async () => {
      try {
        const result = await axios.get("/api/getProfiles");
        setProfiles(result.data.data || []);
      } catch (error) {
        console.error("Something went wrong while fetching profiles", error);
      }
    };

    fetchColleges();
    fetchAllProfiles();
  }, []);

  const selectCollege = async (collegeId) => {
    setSelectedCollege(collegeId === selectedCollege ? "" : collegeId);
    setIsCollegeOpen(false);
    setLoading(true);

    await axios
      .get(`/api/configuration/getDegreeDropDownList/${collegeId}`)
      .then((response) => {
        setBranches(response.data.data.branches || []);
      })
      .catch((error) => console.log("Error", error))
      .finally(() => setLoading(false));
  };

  const selectBranch = async (branch) => {
    setSelectedBranch(branch);
    setIsBranchOpen(false);

    if (!branch || !selectedCollege) {
      alert("Please select both College and Branch");
      return;
    }

    await axios
      .post("/api/getProfileDetailsBasedOnBranchAndCollege", {
        selectedCollege,
        selectedBranch: branch,
      })
      .then((response) => setProfiles(response.data.data))
      .catch((error) => console.log("Error", error));
  };

  const handleResetChanges = async () => {
    try {
      setSelectedCollege("");
      setSelectedBranch("");
      const result = await axios.get("/api/getProfiles");
      setProfiles(result.data.data || []);
    } catch (error) {
      console.error("Something went wrong while fetching profiles", error);
    }
  };

  const ViewAlumniProfile = (id) => {
    navigate(`/find-Alumnies/View-Profile/${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-6 tracking-tight">
        🎓 Find Alumni
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search profiles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 p-3 w-full max-w-lg border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Filters */}
      <div className="flex flex-row w-full max-w-4xl justify-between space-x-4 mb-8">
        {/* College Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => setIsCollegeOpen(!isCollegeOpen)}
            className="w-full border border-gray-300 rounded-xl p-3 flex justify-between items-center bg-white shadow-md hover:shadow-lg transition"
          >
            <span className="text-gray-700">
              {selectedCollege
                ? colleges.find((c) => c._id === selectedCollege)?.name
                : "🏫 Filter by College"}
            </span>
            <span className={`${isCollegeOpen ? "rotate-180" : ""} transition`}>
              ⌄
            </span>
          </button>

          {isCollegeOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-h-48 overflow-y-auto">
              {colleges.map((college) => (
                <label
                  key={college._id}
                  className="flex items-center space-x-2 p-2 hover:bg-indigo-50 cursor-pointer rounded"
                >
                  <input
                    type="radio"
                    name="college"
                    checked={selectedCollege === college._id}
                    onChange={() => selectCollege(college._id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <span>{college.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Branch Dropdown */}
        <div className="relative flex-1">
          <button
            onClick={() => setIsBranchOpen(!isBranchOpen)}
            className="w-full border border-gray-300 rounded-xl p-3 flex justify-between items-center bg-white shadow-md hover:shadow-lg transition"
          >
            <span className="text-gray-700">
              {selectedBranch || "📘 Filter by Branch"}
            </span>
            <span className={`${isBranchOpen ? "rotate-180" : ""} transition`}>
              ⌄
            </span>
          </button>

          {isBranchOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-h-48 overflow-y-auto">
              {branches.map((branch) => (
                <label
                  key={branch}
                  className="flex items-center space-x-2 p-2 hover:bg-indigo-50 cursor-pointer rounded"
                >
                  <input
                    type="radio"
                    name="branch"
                    checked={selectedBranch === branch}
                    onChange={() => selectBranch(branch)}
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <span>{branch}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className="flex items-center">
          <button
            onClick={handleResetChanges}
            className="text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-full shadow-md transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Profiles Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        {profiles && profiles.length > 0 ? (
          profiles
            .filter((profile) =>
              `${profile?.userId?.FirstName} ${profile?.userId?.LastName}`
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((profile) => (
              <motion.div
                key={profile._id}
                layout
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition"
                onClick={() => ViewAlumniProfile(profile._id)}
              >
                <h2 className="text-xl font-bold text-indigo-800">
                  {profile?.userId?.FirstName} {profile?.userId?.LastName}
                </h2>
                <p className="text-gray-600">{profile?.college}</p>
                <p className="text-gray-600">{profile?.branchName}</p>
                <p className="mt-2 text-gray-500">{profile?.location}</p>
                <p className="mt-2 text-sm text-gray-500 italic">
                  {profile?.bio}
                </p>
              </motion.div>
            ))
        ) : (
          <div className="col-span-full flex justify-center items-center py-10">
            <p className="text-gray-500 text-lg font-medium">
              🚫 No Profiles Matched.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FindAlumni;
