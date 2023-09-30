// assets

import {
  AirportShuttleOutlined,
  AppRegistration,
  Bloodtype,
  Home,
  ListAlt,
  Message,
  VolunteerActivism,
} from "@mui/icons-material";

// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const Homepage = {
  id: "",
  title: "General",
  type: "group",
  children: [
    {
      id: "",
      title: "Home",
      type: "item",
      url: "/",
      icon: <Home />,
      breadcrumbs: false,
    },
    {
      id: "fundpost",
      title: "Raise Fund",
      type: "item",
      url: "/fundpost",
      icon: <VolunteerActivism />,
      breadcrumbs: false,
    },
    {
      id: "bloodpost",
      title: "Find Blood",
      type: "item",
      url: "/bloodpost",
      icon: <Bloodtype />,
      breadcrumbs: false,
    },
    {
      id: "ambulance",
      title: "Ambulance",
      type: "item",
      url: "/ambulance",
      icon: <AirportShuttleOutlined />,
      breadcrumbs: false,
    },
    {
      id: "chat",
      title: "AI Chatbot",
      type: "item",
      url: "/chat",
      icon: <Message />,
      breadcrumbs: false,
    },
    {
      id: "doctorList",
      title: "Doctors",
      type: "item",
      url: "/doctorList",
      icon: <ListAlt />,
      breadcrumbs: false,
    },

    {
      id: "registerDoctor",
      title: "Register as Doctor",
      type: "item",
      url: "/registerDoctor",
      icon: <AppRegistration />,
      breadcrumbs: false,
    },
  ],
};

export default Homepage;
