import React from "react";
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ProfileSections({ profileData }) {

    const navigate = useNavigate();
  const profile = profileData?.profile || {};

  const { register, handleSubmit } = useForm({
    defaultValues: {
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
    },
  });


  const handleEditChanges = () => {
    navigate(`/edit-profile/${profileData.userProfile._id}`, {
      state: { profileData },
    });
    // Logic to handle edit changes, e.g., navigate to edit page
    //console.log("Edit button clicked");
  };

  const onSubmit = (data) => {
    console.log("Updated profile:", data);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 flex flex-row">
          Profile Details <Edit className="ml-2 cursor-pointer" onClick={() => handleEditChanges()}/>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {[
              { label: "College", name: "college" },
              { label: "Degree", name: "degree" },
              { label: "Branch", name: "branch" },
              { label: "Bio", name: "bio", textarea: true },
              { label: "Location", name: "location" },
              { label: "Website", name: "website" },
              { label: "Twitter", name: "twitter" },
              { label: "Facebook", name: "facebook" },
              { label: "LinkedIn", name: "linkedin" },
              { label: "Skills (comma separated)", name: "skills" },
            ].map((field, index) => (
              <label
                key={index}
                className={`block col-span-2 ${
                  !field.textarea ? "" : "row-span-2"
                }`}
              >
                <span className="font-medium">{field.label}</span>
                {field.textarea ? (
                  <textarea
                    {...register(field.name)}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                    rows="3"
                  />
                ) : (
                  <input
                    {...register(field.name)}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  />
                )}
              </label>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
