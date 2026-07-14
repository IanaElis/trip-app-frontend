import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Spinner } from "react-bootstrap";

export default function ProtectedRoute({ children, allowedRole }) {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return <Spinner animation="border" className="align-center" />;

    if (!isAuthenticated)
        return <Navigate to="/login" replace />;

    const userRole = isAdmin ? "ADMIN" : "USER";

    if (allowedRole !== userRole) {
        return <Navigate to={userRole === "ADMIN" ? "/users" : "/trips"} replace />;
    }

    return children;

}