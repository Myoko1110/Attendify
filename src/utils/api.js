import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 60000,
  cors: true,
});

export default instance;
