import { useEffect, useState } from "react";
import axios from "axios";

const useCommentPagination = (forumId, baseUrl = "/api/get-all-comments") => {
  const [comments, setComments] = useState([]);
  const [title,setTitle] = useState({})
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // you can change this as needed
  const [loading, setLoading] = useState(false);

  const paginatedComments = comments.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(comments.length / pageSize);

  const fetchComments = async () => {
    if (!forumId) return;

    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/${forumId}`);
      //const title = await axios.post()
      console.log("Fetched All Comments:", res.data.data);
      setComments(res.data.data || []);
      setPage(1); // reset to first page on forum change
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [forumId]);

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };

  return {
    comments: paginatedComments,
    totalPages,
    loading,
    goToPage,
    page,
    refetch:() => fetchComments(page)
  };
};

export default useCommentPagination;

