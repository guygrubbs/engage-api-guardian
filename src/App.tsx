import { createBrowserRouter } from "react-router-dom";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import SubmissionChecklist from "@/pages/SubmissionChecklist";
import SubmissionFormPage from "@/pages/SubmissionFormPage";
import Pricing from "@/pages/Pricing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
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
]);

export default router;