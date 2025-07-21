import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
const CreateDiscussion = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };

    console.log(payload)

    try {
      await axios.post("/api/create-discussion-form", payload);
      toast.success("Discussion Created Successfully")
      reset();
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Something Went Wrong")
    //   toast.error("❌ Failed to create discussion.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          🧠 Create a New Discussion
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Future of Blockchain"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              {...register("content", { required: true })}
              rows="5"
              className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Discussion content..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              {...register("tags")}
              type="text"
              className="w-full border border-gray-300 rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., reactjs, mongodb"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Discussion"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscussion;
