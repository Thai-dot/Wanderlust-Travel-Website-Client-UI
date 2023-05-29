import React, { MouseEvent, useState, useEffect } from 'react';

import Twitter from '../../assets/images/Twitter.svg';

import Input from './Input';
import { CircularProgress } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import authFirebase from '../../service/firebase/SignInWithProvider/getAuth';

import SignInWithProvider from '../../service/firebase/SignInWithProvider/SignInWithProvider';

import { getCookie } from '../../utils/cookies';
import { isTokenExpired } from '../../utils/jwtFunction';

interface FormProps {
    name: string;
    type: number;
}

const Form = (props: FormProps) => {
    const token = getCookie('accessToken');

    const navigate = useNavigate();
    if (!isTokenExpired(token ?? '')) {
        navigate('/');
    }

    if (isTokenExpired(token ?? '')) {
        return (
            <div
                className="user-form"
                style={{ marginTop: '5rem', marginBottom: '5rem' }}
            >
                <h2>Sign in</h2>

                <div className="social-login">
                    <SignInWithProvider />
                </div>
            </div>
        );
    }
    return <CircularProgress />;
};

export default Form;
