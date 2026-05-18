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
import AdminRoute from "../routes/AdminRoute";

import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AddItems from "../pages/Dashboard/Admin/AddItems";
import ManageItems from "../pages/Dashboard/Admin/ManageItems";

import UserHome from "../pages/Dashboard/User/UserHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import Checkout from "../pages/Dashboard/User/Checkout";
import Coverage from "../components/Coverage";
import Payment from "../pages/Payment";
import MyOrders from "../pages/Dashboard/User/MyOrders";
import ManageOrders from "../pages/Dashboard/Admin/ManageOrders";
import OrderChart from "../pages/Dashboard/Admin/OrderChart";
import About from "../components/About";

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
            { path: "/cart", element: <Cart /> },
            {path: "/coverage", element: <Coverage/>},
            {path: "/payment", element: <Payment/>},
            {path: "/about", element: <About/>}
        ],
    },

    // 🔐 USER DASHBOARD
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/user/home" replace />
            },
            {
                path: "user/home",
                element: <UserHome />
            },
            {
                path: "user/cart",
                element: <Cart />
            },
            {
                path: "checkout",
                element: <Payment/>
            },
            {
                path: "orders",
                element: <MyOrders/>
            }
        ]
    },

    // ADMIN DASHBOARD (SEPARATE)
    {
        path: "/admin-dashboard",
        element: (
            <PrivateRoute>
                <AdminRoute>
                    <DashboardLayout />
                </AdminRoute>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/admin-dashboard/home" replace />
            },
            {
                path: "home",
                element: <AdminHome/>
            },
            {
                path: "all-users",
                element: <AllUsers />
            },
            {
                path: "add-items",
                element: <AddItems />
            },
            {
                path: "manage-items",
                element: <ManageItems />
            },
            {
                path: "manage-orders",
                element: <ManageOrders/>
            },
            {
                path: "order-stats",
                element: <OrderChart/>
            }
        ]
    }
]);