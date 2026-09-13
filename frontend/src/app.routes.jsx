import { createBrowserRouter } from "react-router-dom";
import Login from "./features/Auth/pages/Login.jsx";
import Register from "./features/Auth/pages/Register.jsx";
import Protected from "./features/Auth/Protected.jsx";
import Home from "./features/marketing/pages/Home.jsx";
import About from "./features/marketing/pages/About.jsx";
import Service from "./features/interview/pages/Service.jsx";
import Feedback from "./features/marketing/pages/Feedback.jsx";
import Contact from "./features/marketing/pages/Contact.jsx";
import Interview from "./features/interview/pages/Interview.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/service",
    element: (
      <Protected>
        <Service />
      </Protected>
    )
  },
  {
    path: "/feedback",
    element: <Feedback />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/interview/:interviewId",
    element: (
      <Protected>
        <Interview />
      </Protected>
    )
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "*",
    element: <Home />
  }
]);
