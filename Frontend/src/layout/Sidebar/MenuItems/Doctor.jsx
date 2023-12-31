// assets

import { Medication, Person } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Doctor = {
  id: "Doctor",
  title: "Doctor",
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
      id: "doctorProfile",
      title: "My Profile",
      type: "item",
      url: `/doctorProfile/${localStorage.getItem("doctor_id")}`,
      icon: <Person />,
      breadcrumbs: false,
    },
  ],
};

export default Doctor;
