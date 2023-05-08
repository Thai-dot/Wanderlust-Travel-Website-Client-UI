import React, { MouseEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


import Twitter from '../../assets/images/Twitter.svg';
import {
    authAction,
    LoginPayload,
    RegisterPayload
} from '../../features/auth/authSlice';
import Input from './Input';
import { CircularProgress } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import authFirebase from '../../service/firebase/SignInWithProvider/getAuth';

import SignInWithProvider from '../../service/firebase/SignInWithProvider/SignInWithProvider';

interface FormProps {
    name: string;
    type: number;
}

const Form = (props: FormProps) => {
    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = authFirebase.onAuthStateChanged((user) => {
            if (user) {
                setUserAuthenticated(true);
                navigate('/'); // Redirect to home page
            } else {
                setUserAuthenticated(false);
            }
        });

        // Clean up the listener when the component unmounts
        return unsubscribe;
    }, [navigate]);

    if (!userAuthenticated) {
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
