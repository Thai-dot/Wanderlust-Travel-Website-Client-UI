import axios from 'axios';
import { getCookie } from '../../../utils/cookies';


const backend_host = process.env.REACT_APP_BACKEND_HOST;

console.log(backend_host);

const axiosClientInstance = axios.create({
    baseURL: backend_host,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClientInstance.interceptors.request.use(
    (config: any) => {
        const token = getCookie('accessToken');
        if (token) {
            const newConfig = {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${token}`
                }
            };
            return newConfig;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClientInstance;
