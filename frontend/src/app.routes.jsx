import { createBrowserRouter } from "react-router-dom";
import Login from "./features/Auth/pages/Login.jsx";
import Register from "./features/Auth/pages/Register.jsx";
import Protected from "./features/Auth/Protected.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
  path: "/",
  element: (
    <Protected>
      <div>
        <h1>Home page</h1>
      </div>
    </Protected>
  )
}

 
]);

