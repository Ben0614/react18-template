import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import PrivilegeAuth from "@/router/privilege.auth";

const router = createBrowserRouter([
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  ...PrivilegeAuth,
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
