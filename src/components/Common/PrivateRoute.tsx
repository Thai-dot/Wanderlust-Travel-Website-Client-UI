import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authFirebase } from '../../service/firebase/signInWithProvider/signInWithProvider';


function PrivateRoute() {
  const location = useLocation();
  
  
  return authFirebase.currentUser ? (
      <Outlet />
  ) : (
      <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default PrivateRoute;