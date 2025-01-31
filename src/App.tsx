import { createBrowserRouter } from "react-router-dom";
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

export default router;