import { RouterProvider } from "react-router-dom";
import { router } from './app.routes.jsx';
import { AuthProvider } from "./features/Auth/auth.context.jsx";
import InterviewProvider from "./features/interview/interview.context.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
