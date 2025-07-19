import React,{useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

const ProtectedRoute = ({children}) => {
    const {user,isAuthenticated,checkAuth} = useAuthStore()

    console.log("---------------User Data--------------",user)

    useEffect(() => {
        checkAuth();
    },[]);

    if(!isAuthenticated){
        return <Navigate to="/login" />;
    }

    return children
}

export default ProtectedRoute