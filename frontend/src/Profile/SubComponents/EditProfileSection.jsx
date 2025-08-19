import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../../Contexts/ProgressContext.jsx";
import { createAxiosInstance } from "../../axios/axiosInstance.js";

export default function EditBasicDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [data,setData] = useState({});
  const navigate = useNavigate();
  const { showProgress, hideProgress } = useProgress();
  const axiosInstance = createAxiosInstance(showProgress, hideProgress);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const allBranches = [
    // Engineering
    "Computer Science",
    "Information Technology",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication",
    "Automobile Engineering",
    "Chemical Engineering",
    "Mechatronics Engineering",
    "Biomedical Engineering",
    "Robotics and Automation",

    // Medical
    "MBBS",
    "Physiotherapy",
    "Nursing",
    "Pharmacy",
    "Ayurveda",
    "Homeopathy",
    "Medical Laboratory Technology",
    "Radiology and Imaging",
    "Optometry",
    "Public Health",

    // Commerce
    "B.Com (General)",
    "B.Com (Accounting & Finance)",
    "B.Com (Taxation)",
    "BBA",
    "BBA (International Business)",
    "M.Com",
    "MBA",

    // Arts
    "BA English",
    "BA Psychology",
    "BA Sociology",
    "BA Political Science",
    "BA History",
    "BA Economics",
    "Fine Arts",

    // Library / Information Science
    "Bachelor of Library Science (B.Lib.Sc.)",
    "Master of Library Science (M.Lib.Sc.)",
    "Diploma in Library Science",
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/api/profile`);
        console.log("Profile Data in Edit:", res.data.data.profile);
        const profile = res.data.data.profile || {};
        setData(profile);

        reset({
          college: profile?.college || "",
          degree: profile?.degree || "",
          branchName: profile?.branchName || "",
          bio: profile?.bio || "",
          location: profile?.location || "",
          website: profile?.website || "",
          twitter: profile?.socialLinks.twitter || "",
          facebook: profile?.socialLinks.facebook || "",
          linkedin: profile?.socialLinks.linkedin || "",
          skills: Array.isArray(profile?.skills)
            ? profile.skills.join(", ")
            : profile?.skills || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.info("No profile data found. Please update your profile first.");
        //toast.error("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    const loadDropDownItems = async () => {
      try {
        const response = await axiosInstance.get("/api/configuration?name=Collegename");
        const mappedItems = response.data.data || [];
        setItems(mappedItems);
      } catch (error) {
        console.error("Error fetching college list:", error);
      }
    };

    loadData();
    loadDropDownItems();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        skills: data.skills
          ? data.skills.split(",").map((skill) => skill.trim())
          : [],
      };
      await axiosInstance.put(`/api/updateprofile`, payload);
      toast.success("Profile updated successfully!");
      navigate(`/show-profile`);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Edit Profile Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* College Dropdown */}
            <label className="block col-span-2">
              <span className="font-medium">College</span>
              <select
                {...register("college", { required: "College is required" })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              >
                <option value="">Select a college</option>
                {items.map((item, idx) => (
                  <option key={idx} value={item.value || item.name}>
                    {item.label || item.name}
                  </option>
                ))}
              </select>
              {errors.college && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.college.message}
                </p>
              )}
            </label>

            {/* Branch Dropdown */}
            <label className="block col-span-2">
              <span className="font-medium">Branch</span>
              <select
                {...register("branchName", { required: "Branch is required" })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              >
                <option value="">Select a Branch</option>
                {allBranches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              {errors.branchName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.branchName.message}
                </p>
              )}
            </label>

            {/* Other fields */}
            {[
             
              { label: "Location", name: "location" },
              {
                label: "Website",
                name: "website",
                pattern: /^https?:\/\/.+/,
                errorMsg: "Must be a valid URL",
              },
              {
                label: "Twitter",
                name: "twitter",
                pattern: /^https?:\/\/.+/,
                errorMsg: "Must be a valid URL",
              },
              {
                label: "Facebook",
                name: "facebook",
                pattern: /^https?:\/\/.+/,
                errorMsg: "Must be a valid URL",
              },
              {
                label: "LinkedIn",
                name: "linkedin",
                pattern: /^https?:\/\/.+/,
                errorMsg: "Must be a valid URL",
              },
              { label: "Skills (comma separated)", name: "skills" },
               { label: "Bio", name: "bio", textarea: true }
            ].map((field, index) => (
              <label
                key={index}
                className={`block col-span-2 ${
                  field.textarea ? "row-span-2" : ""
                }`}
              >
                <span className="font-medium">{field.label}</span>
                {field.textarea ? (
                  <textarea
                    {...register(field.name, {
                      pattern: field.pattern
                        ? {
                            value: field.pattern,
                            message: field.errorMsg,
                          }
                        : undefined,
                    })}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                    rows="3"
                  />
                ) : (
                  <input
                    {...register(field.name, {
                      pattern: field.pattern
                        ? {
                            value: field.pattern,
                            message: field.errorMsg,
                          }
                        : undefined,
                    })}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  />
                )}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name].message}
                  </p>
                )}
              </label>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg text-white ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
