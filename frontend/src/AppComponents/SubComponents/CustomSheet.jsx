import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formatDistanceToNow } from "date-fns";
import useCommentPagination from "../../hooks/useCommentPagination";
import axios from "axios";

const sheetVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const getInitials = (first, last) => {
  return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
};

const CustomSheet = ({ isOpen, onClose, forumId,title,content,tags }) => {
  const {
    comments,
    totalPages,
    loading,
    goToPage,
    page,
    meta,
    refetch
  } = useCommentPagination(forumId);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        documentId: forumId,
        content: data.text,
      };

      const res = await axios.post("/api/add-comment", payload);
      if (res.status === 200 || res.data.success) {
        reset(); 
        await refetch()
        goToPage(page); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Side Sheet */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:max-w-[800px] bg-white z-50 shadow-xl overflow-y-auto rounded-l-3xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sheetVariants}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">📚 View Discussion</h2>
              <button onClick={onClose} aria-label="Close Sheet">
                <X className="h-6 w-6 text-gray-500 hover:text-gray-700 transition" />
              </button>
            </div>

            {/* Body Content */}
            <div className="p-6">
              {loading ? (
                <p className="text-center text-gray-500 animate-pulse">Loading...</p>
              ) : (
                <>
                  {/* Meta Info */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-600 leading-relaxed">{content}</p>
                    <p className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-3.5 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </p>

                  </div>

                  {/* Add Comment Input */}
                  <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                    <textarea
                      {...register("text", { required: true })}
                      placeholder="Write your comment..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Add Comment
                    </button>
                  </form>

                  {/* Comments */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">💬 Comments</h3>
                    {comments?.length === 0 ? (
                      <p className="text-gray-400 italic">No comments yet.</p>
                    ) : (
                      <ul className="space-y-4">
                        {comments.map((comment) => (
                          <li
                            key={comment._id}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-start gap-3"
                          >
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                              {getInitials(
                                comment.authorId?.FirstName,
                                comment.authorId?.LastName
                              )}
                            </div>

                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{comment.text}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                By{" "}
                                <span className="font-medium">
                                  {comment.authorId?.FirstName} {comment.authorId?.LastName}
                                </span>{" "}
                                • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex gap-4 mt-6 justify-center items-center text-sm text-gray-600">
                      <button
                        onClick={() => goToPage(page - 1)}
                        disabled={page <= 1}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                      >
                        Prev
                      </button>
                      <span>
                        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                      </span>
                      <button
                        onClick={() => goToPage(page + 1)}
                        disabled={page >= totalPages}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomSheet;
