import { createBrowserRouter } from "react-router-dom";

// pages
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import TestPage from "../pages/TestPage";
import CreateTest from "../pages/CreateTest";

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
        children: [
            {
                path: "test",
                element: <TestPage />
            },
            {
                path: "create-test",
                element: <CreateTest />
            }
        ]
    }
]

export const router = createBrowserRouter(routeConfig);