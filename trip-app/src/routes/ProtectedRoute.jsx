import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, requiredRole }) {
    const { isAuthenticated, isAdmin, loading} = useAuth();

    if (loading)
        return <>Loading...</>;
    

    if (!isAuthenticated)
        return <Navigate to="/login" replace />;

     if (requiredRole === "ADMIN" && !isAdmin){
        return <Navigate to="/trips" replace />;
    }else{
        return <Navigate to="/users" replace/>
    }



    return children;

}