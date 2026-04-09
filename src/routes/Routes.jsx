import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Contact from "../components/Contact";
import FoodCard from "../components/FoodCard";
import Menu from "../pages/Menu";
import Login from "../pages/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/foodCard",
                element: <FoodCard/>
            },
            {
                path: "/menu",
                element: <Menu/>
            },
            {
                path: "/signUp",
                
            },
            {
                path: "/signIn",
                element: <Login/>
            }
        ],
    },
]);