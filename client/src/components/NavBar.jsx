import React from 'react'
import '../css/navBar.css';
import fotoPerfil from '../img/foto.png'
import { useNavigate } from 'react-router-dom';

const NavBar = ({ isAuteticated }) => {
    console.log(isAuteticated)
    const navigate = useNavigate();

    return (
        <nav>
            <input type="input" placeholder='nombre'/>
            <ul className='menu-horizontal'>
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
                <li>
                    <img src={fotoPerfil} alt="Perfil" />
                    {
                        isAuteticated ? (
                            <ul className='menu-vertical'>
                                <li onClick={() => navigate('/mi-perfil')}>Mi perfil</li>
                                <li onClick={() => navigate('/subir-publicacion')}>Subir publicación</li>
                                <li onClick={() => navigate('/mis-favoritos')}>Mis favoritos</li>
                                <li onClick={() => navigate('/login')}>Cerrar sesión</li>
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