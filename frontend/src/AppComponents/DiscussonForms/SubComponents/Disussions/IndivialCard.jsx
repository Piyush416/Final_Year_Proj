import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMENTS_PER_PAGE = 2;

// Sample data generator
const generateComments = (texts) =>
  texts.map((text) => ({
    text,
    timestamp: new Date(Date.now() - Math.random() * 100000000),
  }));

const initialForums = [
  {
    id: 1,
    topic: "The Future of AI",
    description:
      "AI is rapidly reshaping industries, from autonomous vehicles to healthcare diagnostics. What opportunities and challenges do you foresee?",
    comments: generateComments([
      "AI will reduce human error in medicine.",
      "There are risks in over-reliance on automation.",
      "AI ethics need stronger enforcement.",
      "Machine learning should be taught in school.",
      "Will AI replace software engineers?",
      "Deepfakes are concerning.",
      "AI-driven hiring can reduce bias—or amplify it.",
      "What about AGI?",
      "How do we keep it regulated?",
      "ChatGPT is amazing!",
    ]),
  },
  
];

const DiscussionForum = () => {
  const [forums, setForums] = useState(initialForums);
  const [newComments, setNewComments] = useState({});
  const [currentPage, setCurrentPage] = useState({});

  const addComment = (forumId) => {
    const comment = newComments[forumId]?.trim();
    if (comment) {
      const newEntry = { text: comment, timestamp: new Date() };

      setForums((prev) =>
        prev.map((forum) =>
          forum.id === forumId
            ? { ...forum, comments: [...forum.comments, newEntry] }
            : forum
        )
      );

      setNewComments({ ...newComments, [forumId]: "" });

      const total = forums.find((f) => f.id === forumId)?.comments.length + 1;
      setCurrentPage((prev) => ({
        ...prev,
        [forumId]: Math.ceil(total / COMMENTS_PER_PAGE),
      }));
    }
  };

  const getPaginatedComments = (comments, page) => {
    const start = (page - 1) * COMMENTS_PER_PAGE;
    return comments.slice(start, start + COMMENTS_PER_PAGE);
  };

  const renderAvatar = (text) => {
    const initials = text.charAt(0).toUpperCase();
    return (
      <div className="w-9 h-9 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
        {initials}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Discussion Forums</h1>

        {forums.map((forum) => {
          const page = currentPage[forum.id] || 1;
          const totalPages = Math.ceil(forum.comments.length / COMMENTS_PER_PAGE);
          const commentsToShow = getPaginatedComments(forum.comments, page);

          return (
            <div
              key={forum.id}
              className="bg-white shadow-xl border border-gray-200 rounded-2xl mb-12 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                {/* Left: Add Comment */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{forum.topic}</h2>
                    <p className="text-gray-600 mt-2">{forum.description}</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Add a Comment</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Write a comment..."
                        value={newComments[forum.id] || ""}
                        onChange={(e) =>
                          setNewComments({ ...newComments, [forum.id]: e.target.value })
                        }
                      />
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                        onClick={() => addComment(forum.id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Comments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Comments</h3>
                  <AnimatePresence mode="popLayout">
                    {commentsToShow.length > 0 ? (
                      <ul className="space-y-4">
                        {commentsToShow.map((comment, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-start gap-3 bg-gray-50 p-3 rounded-md border border-gray-200 text-sm"
                          >
                            {renderAvatar(comment.text)}
                            <div>
                              <p className="text-gray-800">{comment.text}</p>
                              <span className="text-gray-500 text-xs">
                                {new Date(comment.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No comments yet. Be the first!</p>
                    )}
                  </AnimatePresence>

                  {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => ({
                            ...prev,
                            [forum.id]: Math.max(1, (prev[forum.id] || 1) - 1),
                          }))
                        }
                        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        Prev
                      </button>
                      <span className="text-sm text-gray-600">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => ({
                            ...prev,
                            [forum.id]: Math.min(totalPages, (prev[forum.id] || 1) + 1),
                          }))
                        }
                        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscussionForum;
