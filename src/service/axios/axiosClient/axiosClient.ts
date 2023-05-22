import axios from 'axios';
import { getCookie } from '../../../utils/cookies';

const axiosClientInstance = axios.create({
    baseURL: 'https://localhost:7210',
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
