import React from "react";
import { useForm } from "react-hook-form";
import  {createAxiosInstance} from "../../../axios/axiosInstance"; 
import { useProgress } from "../../../Contexts/ProgressContext.jsx";
import {toast} from "sonner"
import { useNavigate } from "react-router-dom";

export default function AddEvents() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {showProgress, hideProgress} = useProgress();

  const axios = createAxiosInstance(showProgress, hideProgress);

  const onSubmit = (data) => {
    console.log("New Event:", data);
    axios.post('/api/createEvent', data)
      .then(response => {
        console.log("Event added successfully:", response.data);
        toast.success("Event added successfully!");
        reset();
        navigate("/events"); // Redirect to events page after successful submission
        // Optionally, you can show a success message or redirect the user
      })
      .catch(error => {
        console.error("Error adding event:", error);
        toast.error("Failed to add event. Please try again.");
        // Optionally, you can show an error message
      });
    // Here you can make an API call to save the event
    // reset(); // Clear form after submit
  };

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Event</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        {/* Event Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Event Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Event title is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Event Date
          </label>
          <input
            type="date"
            {...register("date", { required: "Event date is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Event Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Event Location
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter event location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Event Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Event Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write a short description..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Event Type
          </label>
          <select
            {...register("type", { required: "Event type is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select type</option>
            <option value="Seminar">Seminar</option>
            <option value="Webinar">Webinar</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200 font-medium"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
