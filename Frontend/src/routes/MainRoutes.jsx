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
const PendingApplications = Loadable(
  lazy(() => import("../pages/doctor/PendingApplications"))
);
const AllDoctors = Loadable(lazy(() => import("../pages/doctor/AllDoctors")));
const RegisterDoctor = Loadable(
  lazy(() => import("../pages/doctor/RegisterDoctor"))
);
const DoctorProfile = Loadable(
  lazy(() => import("../pages/doctor/DoctorProfile"))
);

const AppointMents = Loadable(
  lazy(() => import("../pages/appointment/AppointmentPage"))
);
const EditDoctor = Loadable(lazy(() => import("../pages/doctor/EditProfile")));
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
      path: "/doctorList",
      element: <AllDoctors />,
    },
    {
      path: "/registerDoctor",
      element: <RegisterDoctor />,
    },
    {
      path: "/doctorprofile/:id",
      element: <DoctorProfile />,
    },
    {
      path: "/editdoctor/:id",
      element: <EditDoctor />,
    },
    {
      path: "/pendingdoctor",
      element: <PendingApplications />,
    },

    {
      path: "/appointments",
      element: <AppointMents />,
    },
  ],
};
export default MainRoutes;
