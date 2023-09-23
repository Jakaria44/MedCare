import AuthStructure from "../pages/Authentication/AuthStructure";
// project imports

// const Structure = Loadable(lazy(() => import("../layout/Structure.jsx")));
// const SignIn = Loadable(lazy(() => import("../pages/Authentication/SignIn")));
// const SignUp = Loadable(lazy(() => import("../pages/Authentication/SignUp")));
// const ForgotPassword = Loadable(
//   lazy(() => import("../pages/Authentication/ForgotPassword"))
// );
// const ConfirmOTP = Loadable(
//   lazy(() => import("../pages/Authentication/ConfirmOTP"))
// );
// const ErrorPage = Loadable(lazy(() => import("./../pages/ErrorPage")));
// const AuthStructure = Loadable(
//   lazy(() => import("../pages/Authentication/AuthStructure"))
// );

import ConfirmOTP from "../pages/Authentication/ConfirmOTP";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import ResetPassword from "../pages/Authentication/ResetPassword";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import ErrorPage from "./../pages/ErrorPage";

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <AuthStructure />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/confirm-otp/:mail",
      element: <ConfirmOTP />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
  ],
};

export default AuthenticationRoutes;
