import axios from "axios";

export default axios.create({
  baseURL: "http://medcarebackendfordeploy-production.up.railway.app/api/auth",
  headers: {
    "Content-type": "application/json",
    "x-access-token": localStorage.getItem('token'),
  }
});