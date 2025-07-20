import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DiscussionForum = () => {

  const navigate = useNavigate();

  const [forums,] = useState([
    { id: 1, topic: "The Future of AI", description: "AI is evolving rapidly, transforming industries from healthcare to finance. What are your thoughts on its future impact?", comments: ["AI will create new job opportunities!", "We should be cautious about AI ethics."] },
    { id: 2, topic: "Renewable Energy", description: "Renewable energy sources are key to a sustainable future. How can we accelerate their adoption?", comments: ["Government incentives can help.", "Solar energy is becoming more affordable."] },
    { id: 3, topic: "Space Exploration", description: "The race to Mars and beyond is heating up. Should humanity prioritize space colonization?", comments: ["Space exploration fuels technological advancements.", "We should focus on fixing Earth first."] }
  ]);

  const handleClick = (data) => {
    navigate(`/discussions/${data}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Discussion Forums</h1>
      {forums.map((forum) => (
        <div key={forum.id} className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl w-full mb-6 cursor-pointer" onClick={() => handleClick(forum.id)}>
          <h2 className="text-xl font-semibold">{forum.topic}</h2>
          <p className="text-gray-600 mt-2" >{forum.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DiscussionForum;