import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../../features/Auth/pages/Login.jsx";
import Register from "../../features/Auth/pages/Register.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

