import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './pages/Home';
import Landing from './pages/Landing';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import Profile from './pages/Profile';
import SubirPublicacion from './pages/SubirPublicacion';
import VerifyToken from './components/VerifyToken';


function App() {

  const [ isAutenticated, setIsAutenticated ] = useState(false);
  const [ user, setUser ] = useState('');


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/new-password/:token' element={<NewPassword />}/>


        <Route element={<ProtectedRoutes isAutenticated={isAutenticated} setIsAutenticated={setIsAutenticated} setUser={setUser}/>}>
          <Route path='/home' element={<Home isAuteticated={isAutenticated} user={user}/>}/>

          <Route element={<VerifyToken />}>
            <Route path='/mi-perfil' element={<Profile user={user} setUser={setUser}/>}/>
            <Route path='/subir-publicacion' element={<SubirPublicacion />}/>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
