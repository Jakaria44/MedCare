// assets

import { Medication, Person } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const User = {
  id: "User",
  title: "User",
  type: "group",
  children: [
    {
      id: "appointments",
      title: "Appointments",
      type: "item",
      url: "/appointments",
      icon: <Medication />,
      breadcrumbs: false,
    },
    {
      id: "userprofile",
      title: "My Profile",
      type: "item",
      url: `/userprofile/${localStorage.getItem("user_id")}`,
      icon: <Person />,
      breadcrumbs: false,
    },
  ],
};

export default User;
