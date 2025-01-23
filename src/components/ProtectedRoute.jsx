import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const sessionActive = localStorage.getItem("sessionActive") === "true";
    const location = useLocation(); // Captures the current route

    useEffect(() => {
        if (!sessionActive) {
            // If the session is not active, navigate back to login
            <Navigate to="/" replace state={{ from: location }} />;
        }
    }, [sessionActive, location]);

    return sessionActive ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;