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
import AllUsers from "../pages/Dashboard/Admin/AllUsers"; 
import AddItems from "../pages/Dashboard/Admin/AddItems";

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
            {
                index: true,
                element: <Navigate to="/dashboard/adminHome" replace />
            },

            // --- User Routes ---
            {
                path: "userHome",
                element: <div className="text-2xl font-bold p-10">Welcome to your Dashboard, Brother!</div>
            },
            {
                path: "myCart",
                element: <Cart /> 
            },

            // --- Admin Routes ---
            {
                path: "adminHome",
                element: <div className="text-2xl font-bold p-10 text-orange-600">Admin Home: Dashboard Overview</div>
            },
            {
                path: "allUsers",
                element: <AllUsers /> 
            },
            {
                path: "addItems",
                element: <AddItems/>
            }
        ]
    }
]);