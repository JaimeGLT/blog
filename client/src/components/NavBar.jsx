import React from 'react'
import fotoPerfil from '../img/foto.png'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import '../css/navBar.css';

const NavBar = ({ isAutenticated }) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleSesion = async () => {
        try {
            const res = await axios.post('/logout');
            console.log(res.data);
            window.location.reload()
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav>
                { pathname !== '/subir-publicacion' && pathname !== '/mi-perfil' ? <input type="input" placeholder='nombre'/> : null }
                <ul className='menu-horizontal'>
            {
                pathname !== '/subir-publicacion' && pathname !== '/mi-perfil' 
                    ? <>
                        <li>
                            Fecha
                            <ul className='menu-vertical'>
                                <li>Más reciente</li>
                                <li>Más antiguo</li>
                            </ul>
                        </li>

                        <li>
                            Géneros
                            <ul className='menu-vertical'>
                                <li>Tecnología</li>
                                <li>Salud y Bienestar</li>
                                <li>Viajes</li>
                                <li>Negocios y Finanzas</li>
                                <li>Cocina y Receta</li>
                                <li>Varios</li>
                            </ul>
                        </li>
                    </>
                    : null
            }

                <li>
                    <img src={fotoPerfil} alt="Perfil" />
                    {
                        isAutenticated ? (
                            <ul className='menu-vertical'>
                                <li onClick={() => navigate('/home')}>Inicio</li>
                                <li onClick={() => navigate('/mi-perfil')}>Mi perfil</li>
                                <li onClick={() => navigate('/subir-publicacion')}>Subir publicación</li>
                                <li onClick={() => navigate('/mis-favoritos')}>Mis favoritos</li>
                                <li onClick={() => navigate('/mis-publicaciones')}>Mis publicaciones</li>
                                <li onClick={handleSesion}>Cerrar sesión</li>
                            </ul>
                        ) : (
                            <ul className='menu-vertical'>
                                <li onClick={() => navigate('/register')}>Registrarse</li>
                                <li onClick={() => navigate('/login')}>Iniciar sesión</li>
                            </ul>
                        )
                    }
                </li>
            </ul>
            
        </nav>
    )
}

export default NavBar