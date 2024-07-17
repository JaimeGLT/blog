import axios from 'axios';

const axiosMOD = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001/api'
});

export default axiosMOD;