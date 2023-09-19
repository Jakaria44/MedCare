import {
  AppRegistration,
  NoteAdd,
  Person,
  RecentActors,
} from "@mui/icons-material";

export const DoctorReg = {
  id: "",
  title: "Doctor Support",
  type: "group",
  children: [
    {
      id: "doctorslist",
      title: "List of Doctors",
      type: "item",
      url: "/doctorslist",
      icon: <RecentActors />,
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
export const Doctor = {
  id: "",
  title: "Doctor Support",
  type: "group",
  children: [
    {
      id: "doctorslist",
      title: "List of Doctors",
      type: "item",
      url: "/doctorslist",
      icon: <RecentActors />,
      breadcrumbs: false,
    },
    {
      id: "doctorprofile",
      title: "My Profile",
      type: "item",
      url: "/doctorprofile",
      icon: <Person />,
      breadcrumbs: false,
    },
  ],
};
export const DoctorAppoint = {
  id: "",
  title: "Doctor Support",
  type: "group",
  children: [
    {
      id: "doctorslist",
      title: "List of Doctors",
      type: "item",
      url: "/doctorslist",
      icon: <RecentActors />,
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
    {
      id: "doctorappoint",
      title: "Appointments",
      type: "item",
      url: "/doctorappoint",
      icon: <NoteAdd />,
      breadcrumbs: false,
    },
  ],
};
