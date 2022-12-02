import { createBrowserRouter } from "react-router-dom";

// pages
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import TestPage from "../pages/TestPage";
import CreateTest from "../pages/CreateTest";
import StartPage from "../pages/StartPage";

import ProfileSection from "../pages/ProfileSection";


// protectedRoutes
import ProtectedRoutes from "./protectedRoutes";


const routeConfig = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/sign-in",
        element: <SignIn />

    },
    {
        path: "/sign-up",
        element: <SignUp />

    },
    {
        path: "/profile",
        element: (
            <ProtectedRoutes>
                <ProfileSection />
            </ProtectedRoutes>
        ),

    },
    {
        path: "/test",
        element: (
            <ProtectedRoutes>
                <TestPage />
            </ProtectedRoutes>
        )
    },
    {
        path: "/test/:courseId",
        element: (
            <ProtectedRoutes>
                <StartPage />
            </ProtectedRoutes>
        )
    },
    {
        path: "/create-test",
        element: (
            <ProtectedRoutes>
                <CreateTest />
            </ProtectedRoutes>
        )
    }
]

export const router = createBrowserRouter(routeConfig);