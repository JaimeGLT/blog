import axios from 'axios';

const axiosMOD = axios.create({
    withCredentials: true,
    baseURL: `${import.meta.env.VITE_BACKEND_URL}api` || 'http://localhost:3001/api'
});

export default axiosMOD;