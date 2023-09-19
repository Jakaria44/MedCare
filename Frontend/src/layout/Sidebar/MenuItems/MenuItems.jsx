import Admin from "./Admin";
import { Doctor, DoctorAppoint, DoctorReg } from "./Doctor";
import Homepage from "./Homepage";
export const MenuItems = {
  items:
    localStorage.getItem("role") == "ROLE_Admin"
      ? [Homepage, Admin]
      : localStorage.getItem("role") == "ROLE_Normal"
      ? [Homepage, DoctorAppoint]
      : localStorage.getItem("role") == "ROLE_Doctor"
      ? [Homepage, Doctor]
      : [Homepage, DoctorReg],
};
