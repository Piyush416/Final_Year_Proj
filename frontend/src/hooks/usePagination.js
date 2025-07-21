import { useEffect,useState } from "react";
import axios from "axios";

const usePagination = (baseUrl) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
  
    const fetchData = async (pageNum = 1) => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}?page=${pageNum}`);

        console.log("Using the Pagination")

        setData(res.data.data || []);
        setPage(pageNum);
        setTotalPages(res.data.totalPages || 1); // Make sure your API returns this
      } catch (error) {
        console.error("Pagination fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (baseUrl) fetchData(page);
    }, [baseUrl]);
  
    const goToPage = (p) => {
      if (p >= 1 && p <= totalPages) fetchData(p);
    };
  
    return {
      data,
      page,
      totalPages,
      loading,
      goToPage,
    };
  };

export default usePagination

  