import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { AdminDashboard } from "./components/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
