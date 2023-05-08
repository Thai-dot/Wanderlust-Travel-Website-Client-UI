import axios from 'axios';

const axiosClientInstance = axios.create({
    baseURL: 'https://localhost:7210',
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClientInstance;
