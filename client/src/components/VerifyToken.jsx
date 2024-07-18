import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const VerifyToken = () => {

    const cookies = Cookies.get();
    const navigate = useNavigate();

    useEffect(() => {

        if(!cookies.access_token) return navigate('/home');

        const verifyToken = async () => {
            try {
                const res = await axios.get('/verify');
            } catch (error) {
                navigate('/home');
            }
        };
        verifyToken();

    });

  return (
    <Outlet />
  )
}

export default VerifyToken