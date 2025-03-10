import React, { useState } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Tech Innovations Conference", type: "Seminar", date: "April 15, 2025", location: "New York, NY", description: "Join industry leaders to discuss the future of technology." },
    { id: 2, title: "AI & Machine Learning Webinar", type: "Webinar", date: "May 10, 2025", location: "Online", description: "Explore the latest trends in AI with top experts." },
    { id: 3, title: "Startup Growth Strategies", type: "Seminar", date: "June 5, 2025", location: "San Francisco, CA", description: "Learn how to scale your startup effectively." },
    { id: 4, title: "Cybersecurity Trends 2025", type: "Webinar", date: "July 20, 2025", location: "Online", description: "Understand emerging threats and security best practices." },
    { id: 5, title: "Cloud Computing Summit", type: "Seminar", date: "August 30, 2025", location: "Chicago, IL", description: "Insights on cloud technologies and enterprise solutions." },
    { id: 6, title: "Digital Marketing Mastery", type: "Webinar", date: "September 12, 2025", location: "Online", description: "Unlock powerful digital marketing strategies." }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.type} - {event.location}</p>
            <p className="mt-2 text-gray-500">{event.date}</p>
            <p className="mt-2 text-gray-500">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
