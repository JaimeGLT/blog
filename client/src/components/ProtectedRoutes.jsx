import { useEffect } from "react"
import { Outlet } from "react-router-dom";
import axios from '../api/axios';

const ProtectedRoutes = ({ setIsAutenticated, setUser }) => {


    useEffect(() => {

      const verifyToken = async () => {
        try {
            const res = await axios.get('/verify');
              setUser(res.data);
              setIsAutenticated(true);
              return;
            } catch (error) {
              setIsAutenticated(false);
              console.log(error);
            }
      }
      
      verifyToken();

    }, []);

  return (
    
    <Outlet />
  )
}

export default ProtectedRoutes