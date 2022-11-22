
import { createBrowserRouter } from "react-router-dom";

// components
import HomePage from "../pages/HomePage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    }

])