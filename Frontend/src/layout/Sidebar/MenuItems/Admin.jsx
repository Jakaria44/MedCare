// assets

import { Feed, People, SsidChart, StickyNote2 } from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Admin = {
  id: "Admin",
  title: "Administration",
  type: "group",
  children: [
    {
      id: "pendingdoctor",
      title: "Doctor Applications",
      type: "item",
      url: "/pendingdoctor",
      icon: <StickyNote2 />,
      breadcrumbs: false,
    },
  ],
};

export default Admin;
