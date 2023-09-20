import { AppRegistration, NoteAdd, Person } from "@mui/icons-material";

export const DoctorReg = {
  id: "",
  title: "Doctor Support",
  type: "group",
  children: [
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
