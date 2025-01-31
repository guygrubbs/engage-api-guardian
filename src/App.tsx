import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import SubmissionChecklist from "@/pages/SubmissionChecklist";
import SubmissionFormPage from "@/pages/SubmissionFormPage";

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
]);

export default router;