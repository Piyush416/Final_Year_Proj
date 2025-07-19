import React from "react";
import { FaUsers, FaChartLine, FaUserPlus, FaCogs } from "react-icons/fa";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <FaUsers className="text-blue-500 text-3xl" />,
    },
    {
      title: "New Registrations",
      value: "98",
      icon: <FaUserPlus className="text-green-500 text-3xl" />,
    },
    {
      title: "Active Sessions",
      value: "312",
      icon: <FaChartLine className="text-purple-500 text-3xl" />,
    },
    {
      title: "System Health",
      value: "Good",
      icon: <FaCogs className="text-yellow-500 text-3xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">{card.title}</h2>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-full">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* You can add more dashboard components like charts, tables, etc. here */}
      </div>
    </div>
  );
};

export default Dashboard;
