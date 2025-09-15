import axios from "axios";

// Fix for backend port - ensure we use port 5001 not 5173
const BASE_URL = "http://localhost:5001/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
