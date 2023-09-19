import { lazy } from "react";

// project imports
import Loadable from "./../ui-component/Loadable";
import Test from "./test";
// main routing
const Structure = Loadable(lazy(() => import("../layout/Structure.jsx")));
const Home = Loadable(lazy(() => import("../pages/Home")));
const AllAmbulance = Loadable(
  lazy(() => import("../pages/ambulance/AllAmbulance"))
);
const RaiseFund = Loadable(
  lazy(() => import("../pages/fundRaisePost/AllPost"))
);
const SinglePost = Loadable(
  lazy(() => import("../pages/fundRaisePost/SinglePost"))
);

const DoctorList = Loadable(lazy(() => import("../pages/doctor/DoctorList")));
const RegisterDoctor = Loadable(
  lazy(() => import("../pages/doctor/RegisterDoctor"))
);
const DoctorProfile = Loadable(
  lazy(() => import("../pages/doctor/DoctorProfile"))
);
const AllBlood = Loadable(lazy(() => import("../pages/blood/AllBlood")));
const ErrorPage = Loadable(lazy(() => import("./../pages/ErrorPage")));
// ==============================| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <Structure />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/ambulance",
      element: <AllAmbulance />,
    },
    {
      path: "/fundpost",
      element: <RaiseFund />,
    },
    {
      path: "/fundpost/:id",
      element: <SinglePost />,
    },
    {
      path: "/bloodpost",
      element: <AllBlood />,
    },
    {
      path: "/doctorslist",
      element: <DoctorList />,
    },
    {
      path: "/registerDoctor",
      element: <RegisterDoctor />,
    },
    {
      path: "/doctorprofile",
      element: <DoctorProfile />,
    },
  ],
};
export default MainRoutes;
