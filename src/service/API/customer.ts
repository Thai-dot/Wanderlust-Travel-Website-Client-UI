import axiosClientInstance from '../axios/axiosClient/axiosClient';

const fetchCustomer = (id: number) => {
    return axiosClientInstance
        .get(`/api/customers/${id}`)
        .then((res) => res.data);
};

export default fetchCustomer;
