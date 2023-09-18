import axios from "axios";

export default axios.create({
  baseURL: "https://medcarefinalapi-production.up.railway.app/",
  headers: {
    "Content-type": "multipart/form-data",
    "Authorization": localStorage.getItem('token'),
  }
});