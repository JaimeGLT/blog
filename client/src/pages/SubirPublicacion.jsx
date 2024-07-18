import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const SubirPublicacion = ({ isAutenticated }) => {

    const [ dateNow, setDateNow ] = useState('');
    const [task, setTask] = useState({
        title: '',
        description: '',
        genres: ''
    });
    const [ errors, setErrors ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const date = new Date();
        const dateString = new Date().toString();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const day = dateString.split(' ')[2];

        const fullDate = `${month}/${day}/${year}`
        setDateNow(fullDate);
    }, [])

    
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/task', task);
            navigate('/home');
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const handleChange = (e) => {
        const { name } = e.target;

        setTask({
            ...task,
            [name]: e.target.value
        })
    };


  return (
    <div>
        <NavBar isAutenticated={isAutenticated}/>
        <form onSubmit={handleSubmit}>

            {
                errors.length ? errors.map(err => <p key={2*Math.random()}>{err}</p>) : errors.msg ? errors.msg : null
            }

            <input type="text" placeholder='Título' onChange={handleChange} value={task.title} name='title'/>
            <input type="text" placeholder='Descripción' onChange={handleChange} value={task.description} name='description'/>
            <p>Fecha de Publicacion: {dateNow}</p>
            <label htmlFor='select'>Elige un género</label>
            <select name="genres" id="select" onChange={handleChange}>
                <option value="">Seleccionar...</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Salud y Bienestar">Salud y Bienestar</option>
                <option value="Viajes">Viajes</option>
                <option value="Negocios y Finanzas">Negocios y Finanzas</option>
                <option value="Cocina y Receta">Cocina y Receta</option>
                <option value="Varios">Varios</option>
            </select>

            <button>Crear Publicacion</button>
        </form>
    </div>
  )
}

export default SubirPublicacion