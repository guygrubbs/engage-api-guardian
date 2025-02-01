import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import SubmissionChecklist from "@/pages/SubmissionChecklist";
import SubmissionFormPage from "@/pages/SubmissionFormPage";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/submission-checklist",
    element: <SubmissionChecklist />,
  },
  {
    path: "/submission-form",
    element: <SubmissionFormPage />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Export the App component that wraps the router with QueryClientProvider
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;