import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import MyFavorites from './pages/MyFavorites';
import MisTasks from './components/MisTasks';
import EditTask from './pages/EditTask';
import TaskDetail from './components/TaskDetail';


function App() {

  const [ isAutenticated, setIsAutenticated ] = useState(false);
  const [ user, setUser ] = useState('');
  console.log(isAutenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/new-password/:token' element={<NewPassword />}/>


        <Route element={<ProtectedRoutes isAutenticated={isAutenticated} setIsAutenticated={setIsAutenticated} setUser={setUser}/>}>
          <Route path='/home' element={<Home isAutenticated={isAutenticated}/>}/>
          <Route path='/publicacion/:id' element={<TaskDetail isAutenticated={isAutenticated} user={user}/>}/>

          <Route element={<VerifyToken />}>
            <Route path='/mi-perfil' element={<Profile user={user} setUser={setUser} isAutenticated={isAutenticated}/>}/>
            <Route path='/subir-publicacion' element={<SubirPublicacion isAutenticated={isAutenticated}/>}/>
            <Route path='/mis-favoritos' element={<MyFavorites isAutenticated={isAutenticated}/>}/> 
            <Route path='/mis-publicaciones' element={<MisTasks isAutenticated={isAutenticated}/>}/>
            <Route path='/editar-publicacion/:id' element={<EditTask/>}/>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
