import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin"; // তোমার হুকটি ইমপোর্ট করো
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (user && isAdmin) {
        return children;
    }

    // যদি ইউজার অ্যাডমিন না হয়, তাকে হোমপেজে পাঠিয়ে দাও
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;