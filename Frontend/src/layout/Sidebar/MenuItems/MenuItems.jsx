import Admin from "./Admin";
import Homepage from "./Homepage";
export const MenuItems = {
  items:
    localStorage.getItem("role") == "admin" ? [Homepage, Admin] : [Homepage],
};
