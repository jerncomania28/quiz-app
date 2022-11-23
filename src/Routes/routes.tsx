
import { createBrowserRouter } from "react-router-dom";

// components
import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const router = createBrowserRouter([
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

    }

])