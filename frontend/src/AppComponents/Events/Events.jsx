import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";
import { createAxiosInstance } from "../../axios/axiosInstance";
import { useProgress } from "../../Contexts/ProgressContext.jsx";
const EventsPage = () => {
  const navigate = useNavigate();

  const { user } = useAuthStore();


  const [events, setEvents] = useState([]);
  const { showProgress, hideProgress } = useProgress();
  const axios = createAxiosInstance(showProgress, hideProgress);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/getAllEvents');
        console.log("Fetched Events:", response.data.data);
        setEvents(response.data.data);
        toast.success("Events Fetched Successfully")
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to fetch events. Please try again.");
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
     <div className="w-full max-w-6xl mb-8 flex flex-row justify-between items-center">
       <h1 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h1>
      {(user?.role === "Alumni" || user?.role === "admin")  && (
        <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200" onClick={() => navigate("/events/add-events")}>
          Add Event
        </button>
      </div>
      )}
     </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="">{event.type} - {event.location}</p>
            <p className="mt-2"> {new Date(event.date).toLocaleDateString("en-GB", {
               year: "numeric",
               month: "long",
               day: "numeric",
            })}</p>
            <p className="mt-2">{event.description}</p>
            <p className="mt-2 ">{event.authorId.FirstName} {event.authorId.LastName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
