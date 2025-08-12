import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function EditBasicDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

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
  "Diploma in Library Science"
];


  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let profile;
        if (location.state?.profileData) {
          profile = location.state.profileData;
        } else {
          const res = await axios.get(`/api/profile/${id}`);
          profile = res.data.data;
        }

        reset({
          college: profile?.college || "",
          degree: profile?.degree || "",
          branch: profile?.branch || "",
          bio: profile?.bio || "",
          location: profile?.location || "",
          website: profile?.website || "",
          twitter: profile?.twitter || "",
          facebook: profile?.facebook || "",
          linkedin: profile?.linkedin || "",
          skills: Array.isArray(profile?.skills)
            ? profile.skills.join(", ")
            : profile?.skills || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    const loadDropDownItems = async () => {
      try {
        const response = await axios.get(
          "/api/configuration?name=Collegename"
        );
        const mappedItems = response.data.data || [];
        console.log("Dropdown items:", mappedItems);
        setItems(mappedItems);
      } catch (error) {
        console.error("Error fetching college list:", error);
      }
    };

    loadData();
    loadDropDownItems();
  }, [id, location.state, reset]);

  const onSubmit = async (data) => {
    console.log("Updated profile:", data);
    try {
      const payload = {
        ...data,
        skills: data.skills
          ? data.skills.split(",").map((skill) => skill.trim())
          : [],
      };
      await axios.put(`/api/profile`, payload);
      toast.success("Profile updated successfully!");
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
                {...register("college", {
                  required: "College is required",
                })}
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

              {/* <select {...register("branch")}>
  {allBranches.map(branch => (
    <option key={branch} value={branch}>
      {branch}
    </option>
  ))}
</select> */}

             <label className="block col-span-2">
              <span className="font-medium">Branch</span>
              <select
                {...register("branch", {
                  required: "Branch is required",
                })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              >
                <option value="">Select a Branch</option>
               {allBranches.map(branch => (
                <option key={branch} value={branch}>
                {branch}
                </option>
                ))}
              </select>
              {errors.branch && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.branch.message}
                </p>
              )}
            </label>
            {/* Remaining Fields */}
            {[
              
              { label: "Bio", name: "bio", textarea: true },
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
                      required: field.required
                        ? `${field.label} is required`
                        : false,
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
                      required: field.required
                        ? `${field.label} is required`
                        : false,
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
