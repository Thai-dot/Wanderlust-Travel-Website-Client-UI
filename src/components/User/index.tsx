import { CircularProgress } from '@mui/material';
import { useQuery } from 'react-query';
import TextField from '@mui/material/TextField/TextField';
import { InputAdornment, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import React, { useEffect, useState, FormEventHandler } from 'react';
import UserInput from './UserInput';
import axiosClientInstance from '../../service/axios/axiosClient/axiosClient';
import { getCookie } from '../../utils/cookies';
import provinceVN from '../../constant/VietnamDivision/VietnamProvince';
import districtVN from '../../constant/VietnamDivision/VietnamDistrict';
import {
    getDistrictFromProvince,
    getWardFromDistrict
} from '../../constant/dataMapping/Division';
import validate from '../../utils/validation';
import { toISOString } from '../../utils/dateFunction';
import ShowTextForSeconds from '../ShowTextForSeconds/ShowTextForSeconds';
import Error from '../Error/Error';

const User = () => {
    const userID = getCookie('id');

    const initialUser = {
        address: '',
        dateOfBirth: '',
        email: '',
        facebook: '',
        fullName: '',
        gender: '',
        instagram: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: ''
    };
    const [user, setUser] = useState(initialUser);

    const [addLoading, setAddLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchData = () => {
        return axiosClientInstance
            .get(`/api/customers/${userID}`)
            .then((res: any) => res.data);
    };

    const { isLoading, error, data, refetch } = useQuery(
        'MyGetClientCustomerAPI',
        fetchData
    );

    useEffect(() => {
        if (data) {
            setUser({
                address: data?.address,
                city: data?.city,
                dateOfBirth: data?.dateOfBirth,
                district: data?.district,
                email: data?.email,
                facebook: data?.facebook,
                fullName: data?.fullName,
                gender: data?.gender,
                instagram: data?.instagram,
                phoneNumber: data?.phoneNumber,
                ward: data?.ward
            });
        }
    }, [data]);

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setAddLoading(true);
        try {
            axiosClientInstance
                .put(`/api/customers/${userID}/edit`, {
                    address: user.address,
                    dateOfBirth: toISOString(user.dateOfBirth),
                    email: user.email,
                    facebook: user.facebook,
                    fullName: user.fullName,
                    gender: Number(user.gender),
                    instagram: user.instagram,
                    phoneNumber: user.phoneNumber,
                    city: user.city,
                    district: user.district,
                    ward: user.ward
                })
                .then((res: any) => {
                    setSuccessMessage('Updated successfully');
                });

            setAddLoading(false);
        } catch (error) {
            setAddLoading(false);
            console.log(error);
        }
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Error error={error} />;

    return (
        <div className="user">
            <form className="personal-info" onSubmit={handleSubmit}>
                <h5>Thông tin cá nhân</h5>
                <Grid container columnSpacing={2} spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6} md={4}>
                        <TextField
                            name="fullName"
                            title="Họ và tên"
                            type="text"
                            label="Họ và tên"
                            fullWidth
                            error={validate.stringRequiredValidate(
                                user.fullName,
                                127
                            )}
                            helperText={validate.stringRequiredTextValidate(
                                user.fullName,
                                'Full Name',
                                127
                            )}
                            value={user.fullName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Giới tính
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={user.gender}
                                label="Giới tính"
                                name="gender"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Male</MenuItem>
                                <MenuItem value={2}>Female</MenuItem>
                                <MenuItem value={3}>Others</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            name="email"
                            title="Email"
                            type="email"
                            label="Email"
                            fullWidth
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="province">Tỉnh/thành</InputLabel>
                            <Select
                                labelId="label-province"
                                id="label-province"
                                value={user.city}
                                label="Province/City"
                                name="city"
                                onChange={handleChange}
                            >
                                {provinceVN.map((item) => (
                                    <MenuItem value={item.code}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="district">Quận/huyện</InputLabel>
                            <Select
                                labelId="label-district"
                                id="label-district"
                                value={user.district}
                                label="District"
                                name="district"
                                disabled={!user.city}
                                onChange={handleChange}
                            >
                                {getDistrictFromProvince(Number(user.city)).map(
                                    (item) => (
                                        <MenuItem value={item.code}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="ward">Phường/Xã</InputLabel>
                            <Select
                                labelId="label-ward"
                                id="label-ward"
                                value={user.ward}
                                label="Ward"
                                name="ward"
                                disabled={!user.district || !user.city}
                                onChange={handleChange}
                            >
                                {getWardFromDistrict(Number(user.district)).map(
                                    (item) => (
                                        <MenuItem value={item.code}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            name="address"
                            title="Địa chỉ"
                            type="text"
                            label="Địa chỉ"
                            fullWidth
                            value={user.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            name="phoneNumber"
                            title="Số điện thoại"
                            type="text"
                            label="Số điện thoại"
                            fullWidth
                            value={user.phoneNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Ngày sinh"
                                value={user.dateOfBirth}
                                onChange={(newValue: any) =>
                                    setUser({ ...user, dateOfBirth: newValue })
                                }
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            name="facebook"
                            title="Facebook"
                            type="text"
                            label="Facebook"
                            fullWidth
                            value={user.facebook}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            name="instagram"
                            title="Instagram"
                            type="text"
                            label="Instagram"
                            fullWidth
                            value={user.instagram}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                {successMessage && (
                    <ShowTextForSeconds text={successMessage} seconds={3} />
                )}

                <button className="submit-btn" type="submit">
                    {addLoading ? (
                        <CircularProgress color="inherit" size={'16px'} />
                    ) : (
                        'Cập nhật'
                    )}
                </button>
            </form>
        </div>
    );
};

export default User;
