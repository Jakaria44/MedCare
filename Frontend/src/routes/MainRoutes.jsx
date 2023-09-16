import { lazy } from "react";

// project imports
import Loadable from "./../ui-component/Loadable";
// main routing
const Structure = Loadable(lazy(() => import("../layout/Structure.jsx")));

const ErrorPage = Loadable(lazy(() => import("./../pages/ErrorPage")));
// ==============================| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <Structure />,
  errorElement: <ErrorPage />,
  children: [],
};
export default MainRoutes;
