import AuthLayout from "@/layouts/AuthLayout";
import SignUp from "@/pages/Auth/SignUp";
import SignIn from "@/pages/Auth/SignIn";

export default [
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signUp",
        element: <SignUp />,
      },
      {
        path: "/auth/signIn",
        element: <SignIn />,
      },
    ],
  },
];
