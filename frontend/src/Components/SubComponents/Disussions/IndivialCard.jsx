import React, { useState } from "react";

const DiscussionForum = () => {
  const [forums, setForums] = useState([
    { id: 1, topic: "The Future of AI", description: "AI is evolving rapidly, transforming industries from healthcare to finance. What are your thoughts on its future impact?", comments: ["AI will create new job opportunities!", "We should be cautious about AI ethics."] },
    { id: 2, topic: "Renewable Energy", description: "Renewable energy sources are key to a sustainable future. How can we accelerate their adoption?", comments: ["Government incentives can help.", "Solar energy is becoming more affordable."] },
    { id: 3, topic: "Space Exploration", description: "The race to Mars and beyond is heating up. Should humanity prioritize space colonization?", comments: ["Space exploration fuels technological advancements.", "We should focus on fixing Earth first."] }
  ]);
  const [newComments, setNewComments] = useState({});

  const addComment = (forumId) => {
    if (newComments[forumId]?.trim() !== "") {
      setForums(forums.map(forum => 
        forum.id === forumId 
          ? { ...forum, comments: [...forum.comments, newComments[forumId]] }
          : forum
      ));
      setNewComments({ ...newComments, [forumId]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Discussion Forums</h1>
      {forums.map((forum) => (
        <div key={forum.id} className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl w-full mb-6">
          <h2 className="text-xl font-semibold">{forum.topic}</h2>
          <p className="text-gray-600 mt-2">{forum.description}</p>
          
          {/* Comment Input */}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write a comment..."
              value={newComments[forum.id] || ""}
              onChange={(e) => setNewComments({ ...newComments, [forum.id]: e.target.value })}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => addComment(forum.id)}
            >
              Post
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Comments</h3>
            {forum.comments.length > 0 ? (
              <ul className="space-y-3">
                {forum.comments.map((comment, index) => (
                  <li key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionForum;
