import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomSheet from "../SubComponents/CustomSheet";
import usePagination from "../../hooks/usePagination";
import PaginationControls from "../../hooks/PaginationControls";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Trash2Icon } from "lucide-react";
import {toast} from "sonner"

const DiscussionForum = () => {

  const {user,isAuthenticated,checkAuth} = useAuthStore()

  const {
    data: forums,
    page,
    totalPages,
    loading,
    goToPage,
  } = usePagination("/api/get-all-discussion-form");

  const [selectedForum, setSelectedForum] = useState(null);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [loadingForum, setLoadingForum] = useState(false);
  const [forumId,setForumId] = useState("")
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [tags,setTags] = useState([])
  const openSheet = async (forumId) => {
    setLoadingForum(true);
    setSheetOpen(true);
    setForumId(forumId)

    try {
      const res = await axios.get(`/api/get-discussion-form/${forumId}`);
      console.log(res.data.data)
      setTitle(res.data.data.title)
      setContent(res.data.data.content)
      setSelectedForum(res.data.data);
      setTags(res.data.data.tags)
    } catch (error) {
      console.error("Failed to fetch discussion detail:", error);
      setSelectedForum(null);
    } finally {
      setLoadingForum(false);
    }
  };

  const handleDelete = (forumId) =>{
     axios.delete(`api/delete-discussion-form/${forumId}`).
                then((res) => {
                  console.log("Delete")
                  toast.success("Deleted Successfully")
                  goToPage(page)
                  setLoadingForum(true)
                  }).catch((error) => {
                  toast.error("Something went wrong")
                  setLoadingForum(false);
                  }).finally(() => {
                    setLoadingForum(false);
                  })

  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="p-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Discussion Forums</h1>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-base transition-all cursor-pointer">
            <Link to="/discussions/create-discussion">Create Discussion or Thread</Link>
          </Button>
        </div>
        

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
           <div className="flex flex-col justify-around">
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {forums.map((forum) => (
                <div
                  key={forum._id}
                  //onClick={() => openSheet(forum._id)}
                  className="bg-white hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300 p-6 rounded-2xl shadow-lg cursor-pointer border border-gray-200"
                >
                  {user.role === "admin" 
                  && <>
                    <div className="flex justify-end">
                      < Trash2Icon color="red" onClick={() => handleDelete(forum._id)}/>
                    </div>
                  </>}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">{forum.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{forum.content}</p>
                  <p className="flex flex-wrap gap-2 mt-2">
                      {forum.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-3.5 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </p>
                  <div className="mt-4 text-indigo-600 font-medium text-sm" onClick={() => openSheet(forum._id)} >
                    View Discussion →
                  </div>
                </div>
              ))}
            </div>
            <div>
            <PaginationControls page={page} totalPages={totalPages} goToPage={goToPage} />
            </div>
           </div>

          </>
        )}
      </div>

      <CustomSheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)} forumId={forumId} title={title} content={content} tags={tags}>  
      </CustomSheet>

    </div>
  );
};

export default DiscussionForum;
