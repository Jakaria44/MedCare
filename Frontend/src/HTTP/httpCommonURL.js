import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/db-api/",
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
    "Authorization": localStorage.getItem('token'),
  }
});