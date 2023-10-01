// assets

import {
  AppRegistration,
  Bloodtype,
  Home,
  VolunteerActivism,
} from "@mui/icons-material";
import { FaAmbulance } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { SiChatbot } from "react-icons/si";
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
      icon: <FaAmbulance size="20px" />,
      breadcrumbs: false,
    },
    {
      id: "chat",
      title: "AI Chatbot",
      type: "item",
      url: "/chat",
      icon: <SiChatbot size="20px" />,
      breadcrumbs: false,
    },
    {
      id: "doctorList",
      title: "Doctors",
      type: "item",
      url: "/doctorList",
      icon: <FaUserDoctor size="20px" />,
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
