import axios from 'axios';




const axiosAuthInstance = axios.create({
    baseURL: "VITE_BASE_URL",
    headers: {
        'Content-Type': 'application/json'
    }
});

// axiosAuthInstance.interceptors.request.use(
//     (config: any) => {
//         // const token = Cookies.get('token');
//         if (token) {
//             const newConfig = {
//                 ...config,
//                 headers: {
//                     ...config.headers,
//                     Authorization: `Bearer ${token}`
//                 }
//             };
//             return newConfig;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default axiosAuthInstance;
