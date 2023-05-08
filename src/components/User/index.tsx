import { CircularProgress } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authAction } from '../../features/auth/authSlice';
import UserInput from './UserInput';

const User = () => {
    const dispatch = useAppDispatch();

    const userID = useAppSelector((state) => state.auth.id);

    console.log(userID);

    const [userUpdate, setUserUpdate] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLButtonElement> | undefined
    ) => {
        e?.preventDefault();
        dispatch(authAction.update(userUpdate));
    };
    return (
        <div className="user">
            <form className="personal-info">
                <h5>Personal Information</h5>
                <div className="group-input">
                    <UserInput
                        name="username"
                        title="Username"
                        type="text"
                        disabled={true}
                        handleChange={handleChange}
                    />

                    <UserInput
                        name="email"
                        title="Email"
                        type="email"
                        required={true}
                        value={userUpdate.email}
                        handleChange={handleChange}
                    />
                    <UserInput
                        name="phoneNumber"
                        title="Phone number"
                        type="number"
                        required={true}
                        value={userUpdate.phoneNumber}
                        handleChange={handleChange}
                    />
                </div>
                <div className="group-input">
                    <UserInput
                        name="address"
                        title="Address"
                        type="text"
                        required={true}
                        // value={user?.}
                        handleChange={handleChange}
                    />
                    <UserInput
                        name="fullName"
                        title="Full name"
                        type="text"
                        required={true}
                        value={userUpdate.fullName}
                        handleChange={handleChange}
                    />
                    <UserInput
                        name="_id"
                        title="ID"
                        type="text"
                        required={true}
                        disabled={true}
                        handleChange={handleChange}
                    />
                </div>
                <div className="group-input">
                    <UserInput
                        name="createdAt"
                        title="Created At"
                        type="text"
                        disabled={true}
                        handleChange={handleChange}
                    />
                    <UserInput
                        name="updatedAt"
                        title="Updated At"
                        type="text"
                        disabled={true}
                        handleChange={handleChange}
                    />
                    <UserInput
                        name="role"
                        title="Role"
                        type="text"
                        disabled={true}
                        handleChange={handleChange}
                    />
                </div>
                <button className="submit-btn" onClick={handleSubmit}>
                    {false ? (
                        <CircularProgress color="inherit" size={'16px'} />
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </form>
            <form className="account-info">
                <h5>Change Password</h5>
                <div className="group-input">
                    <UserInput
                        name="currentPassword"
                        title="Current Password"
                        type="text"
                        required={true}
                        handleChange={handleChange}
                    />
                    <UserInput
                        name="newPassword"
                        title="New Password"
                        type="text"
                        required={true}
                        handleChange={handleChange}
                    />
                    <UserInput
                        name="newPasswordAgain"
                        title="New Password Again"
                        type="text"
                        required={true}
                        handleChange={handleChange}
                    />
                </div>
                <button className="submit-btn">Change Password</button>
            </form>
        </div>
    );
};

export default User;
