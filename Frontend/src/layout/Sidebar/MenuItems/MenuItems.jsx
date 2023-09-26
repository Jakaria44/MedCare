import Admin from "./Admin";
import Doctor from "./Doctor";
import Homepage from "./Homepage";
import Normal from "./Normaluser";
export const MenuItems = {
  items:
    localStorage.getItem("role") == "ROLE_ADMIN"
      ? [Homepage, Admin]
      : localStorage.getItem("role") == "ROLE_Normal"
      ? [Homepage, Normal]
      : localStorage.getItem("role") == "ROLE_DOCTOR"
      ? [Homepage, Doctor]
      : [Homepage],
};
