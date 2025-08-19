import React from "react";
import { useForm } from "react-hook-form";

export default function AddOpportunities({ onClose, onSave }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    onSave(data);
    reset();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Opportunity</h2>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Opportunity Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              rows="4"
              {...register("description", { required: "Description is required" })}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 transform transition"
            >
              Save Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
