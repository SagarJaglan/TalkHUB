import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const ProtectedRoutes = ({children}) => {
    const { isAuthenticate, screenLoading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!screenLoading && !isAuthenticate) {
            navigate("/login");
        }
    }, [isAuthenticate, screenLoading, navigate]);
    
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoutes
