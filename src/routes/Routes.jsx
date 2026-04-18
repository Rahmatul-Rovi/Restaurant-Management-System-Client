import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Contact from "../components/Contact";
import FoodCard from "../components/FoodCard";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Cart from "../pages/Cart";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute"; // সিকিউরিটির জন্য
import AllUsers from "../pages/Dashboard/Admin/AllUsers"; 
import AddItems from "../pages/Dashboard/Admin/AddItems";
import ManageItems from "../pages/Dashboard/Admin/ManageItems";
import UserHome from "../pages/Dashboard/UserHome"; // ইউজার ড্যাশবোর্ডের জন্য

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/contact", element: <Contact /> },
            { path: "/foodCard", element: <FoodCard /> },
            { path: "/menu", element: <Menu /> },
            { path: "/signUp", element: <SignUp /> },
            { path: "/login", element: <Login /> },
            { path: "/cart", element: <Cart /> }
        ],
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            // ১. ড্যাশবোর্ডের ডিফল্ট পেজ: সব ইউজার এখানে ল্যান্ড করবে
            {
                index: true,
                element: <Navigate to="/dashboard/userHome" replace />
            },

            // ২. --- User Routes (এখানে শুধু ইউজারের পেজগুলো দাও) ---
            {
                path: "userHome",
                element: <UserHome /> 
            },
            {
                path: "myCart",
                element: <Cart /> 
            },

            // ৩. --- Admin Routes (এখানে শুধু অ্যাডমিনের পেজগুলো দাও, অবশ্যই AdminRoute দিয়ে মুড়িয়ে দিবে) ---
            {
                path: "adminHome",
                element: <AdminRoute><div className="p-10 text-2xl font-bold">Admin Dashboard</div></AdminRoute>
            },
            {
                path: "allUsers",
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "addItems",
                element: <AdminRoute><AddItems /></AdminRoute>
            },
            {
                path: "manageItems",
                element: <AdminRoute><ManageItems /></AdminRoute>
            }
        ]
    }
]);