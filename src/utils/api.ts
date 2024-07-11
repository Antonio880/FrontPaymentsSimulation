import axios from "axios";

export const api = axios.create({
  baseURL:
   "https://d0ef-187-19-197-248.ngrok-free.app",
   headers: {
    'Content-Type': 'application/json'
    }
});