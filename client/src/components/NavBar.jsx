import React, { useState } from 'react'
import fotoPerfil from '../img/foto.png'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import searchIMG from '../img/search.png'
import axios from '../api/axios'
import '../css/navBar.css';

const NavBar = ({ isAutenticated, setTasks }) => {

    const [ search, setSearch ] = useState('');
    const [ filter, setFilter ] = useState('');

    const navigate = useNavigate();
    const { pathname } = useLocation();


    const handleSesion = async () => {
        try {
            const res = await axios.post('/logout');
            window.location.reload()
            navigate('/home');
        } catch (error) {
            console.log('');
        }
    }

    const handleChangeSearch = e => {
        setSearch(e.target.value);
    };

    const handleSearch = async (e) => {
        try {
            if(pathname === '/home') {
                const res = await axios.get(`http://localhost:3001/api/public-tasks?name=${search}`);
                setTasks(res.data);
                return;
            } else if(pathname === '/mis-publicaciones') {
                const res = await axios.get(`http://localhost:3001/api/tasks?name=${search}`);
                setTasks(res.data);
                return;
            } else if(pathname === '/mis-favoritos') {
                const res = await axios.get(`http://localhost:3001/api/favorites?name=${search}`);
                setTasks(res.data);
                return;
            }
        } catch (error) {
            setTasks(error.response.data)
        }
    };

    const handleFilter = async (e) => {
        const value = e.target.getAttribute('value');
        try {
            if(pathname === '/home') {
                const taskss = await axios.get(`/public-tasks`);
                const filteredTasks = taskss.data.filter(task => task.genres === value);
                !filteredTasks.length ? setTasks({msg: 'No hay publicaciones con esas características'}) : setTasks(filteredTasks);
            } else if(pathname === '/mis-favoritos') {
                const taskss = await axios.get(`/favorites`);
                const filteredTasks = taskss.data.filter(task => task.genres === value);
                !filteredTasks.length ? setTasks({msg: 'No hay favoritos con esas características'}) : setTasks(filteredTasks);
            } else if(pathname === '/mis-publicaciones') {
                const taskss = await axios.get(`/tasks`);
                const filteredTasks = taskss.data.filter(task => task.genres === value);
                !filteredTasks.length ? setTasks({msg: 'No hay publicaciones con esas características'}) : setTasks(filteredTasks);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav>
                { pathname !== '/subir-publicacion' && pathname !== '/mi-perfil' ? <div className='search-container'>
                    <input type="input" placeholder='Buscar por título' onChange={handleChangeSearch} value={search} />
        
                    <img id='search' onClick={handleSearch} src={searchIMG}/>

                </div>
                    : null }
                <ul className='menu-horizontal'>
            {
                    pathname !== '/subir-publicacion' && pathname !== '/mi-perfil' 
                        ? <>

                            <li className='menu-li' value='seteador'>
                                <p className='p-filter'>Filtrar</p>
                                    <ul className='menu-vertical fecha'>
                                        <p>Fecha</p>
                                        <li value='Más reciente' onClick={handleFilter}>Más reciente</li>
                                        <li value='Más antiguo' onClick={handleFilter}>Más antiguo</li>
                                    </ul>


                                    <ul className='menu-vertical'>
                                        <p>Género</p>
                                        <li value='Tecnologia' onClick={handleFilter}>Tecnología</li>
                                        <li value='Salud y Bienestar' onClick={handleFilter}>Salud y Bienestar</li>
                                        <li value='Viajes' onClick={handleFilter}>Viajes</li>
                                        <li value='Negocios y Finanzas' onClick={handleFilter}>Negocios y Finanzas</li>
                                        <li value='Cocina y Receta' onClick={handleFilter}>Cocina y Receta</li>
                                        <li value='Varios' onClick={handleFilter}>Varios</li>
                                    </ul>
                            </li>
                    </> 
                    : null
            }

                <li className='register-li'>
                    <img id='img-profile' src={fotoPerfil} alt="Perfil" />
                    {
                        isAutenticated ? (
                            <ul className='menu-vertical menu-vertical-hola'>
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