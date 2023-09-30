import axios from "axios";

export default axios.create({
  // baseURL: "https://medcarefinalapi-production.up.railway.app/api",
  baseURL: "https://medcarefinalapi-production.up.railway.app/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": localStorage.getItem('token'),
  }
});