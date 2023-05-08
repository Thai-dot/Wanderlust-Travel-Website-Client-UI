import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import authFirebase from '../../service/firebase/SignInWithProvider/getAuth';

function PrivateRoute() {
    const location = useLocation();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true); // add loading state

    useEffect(() => {
        const unsubscribe = authFirebase.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false); // set loading to false when the user state is updated
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return null; // render nothing while still loading
    }

    console.log(user);

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
}

export default PrivateRoute;
