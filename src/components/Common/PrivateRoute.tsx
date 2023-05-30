import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import authFirebase from '../../service/firebase/SignInWithProvider/getAuth';
import { getCookie } from '../../utils/cookies';
import { isTokenExpired } from '../../utils/jwtFunction';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function PrivateRoute() {
    const location = useLocation();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true); // add loading state

    const currentToken = getCookie('accessToken') ?? '';
    const currentID = getCookie('id') ?? '';

    if (!currentID || isTokenExpired(currentToken)) {
        window.location.href = '/login';
    }

    useEffect(() => {
        const handleBeforeUnload = () => {
            firebase.auth().signOut();
        };

        const handleAuthStateChanged = (user: any) => {
            setUser(user);
            setLoading(false); // set loading to false when the user state is updated

            if (user) {
                // User is signed in, add event listener for beforeunload
                window.addEventListener('beforeunload', handleBeforeUnload);
            } else {
                // User is signed out, remove event listener for beforeunload
                window.removeEventListener('beforeunload', handleBeforeUnload);
            }
        };

        const unsubscribe = authFirebase?.onAuthStateChanged(
            handleAuthStateChanged
        );

        if (isTokenExpired(currentToken)) {
            firebase?.auth().signOut();
        }

        return () => {
            unsubscribe();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [currentToken]);

    if (loading) {
        return null; // render nothing while still loading
    }

    return user && !isTokenExpired(currentToken) && currentID ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
}

export default PrivateRoute;
