import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosMOD from "../api/axios";
import '../css/editTask.css';

const EditTask = () => {

    const [ task, setTask ] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await axiosMOD.get(`/task/${id}`);
                setTask(res.data);
            } catch (error) {
                setTask('Tarea no encontrada');
            }
        };

        getTask();
    }, [])


    const handleChange = (e) => {
        const { name } = e.target;

        setTask({
            ...task,
            [name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosMOD.put(`/task/${id}`, task);
            navigate('/mis-publicaciones');
        } catch (error) {
            console.log('');
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axiosMOD.delete(`/task/${id}`);
            navigate('/mis-publicaciones');
        } catch (error) {
            console.log('');
        }
    };

    return (
        <div className='container-editTask'>
            <h2>EDITAR PUBLICACIÓN</h2>
            {
                typeof task === 'string' ? <p>La publicacion no fue encontrada</p> 
                : (
                    <>
                        <form onSubmit={handleSubmit} className='form-editTask'>
                            <input 
                                type="text" 
                                onChange={handleChange} 
                                placeholder="Ingresar nuevo título"
                                name='title'
                                value={task.title || ''}
                                className='input-form'
                            />
                            <textarea 
                                className='input-form'
                                onChange={handleChange} 
                                placeholder="Ingresar la nueva descripción"
                                name='description'
                                value={task.description || ''}
                                rows='15'
                                cols='10'
                            />
                            <p>Fecha de publicacion: {task?.datePublication}</p>
                            <select name="genres" id="select" onChange={handleChange} value={task.genres}>
                                <option value="Tecnologia">Tecnología</option>
                                <option value="Salud y Bienestar">Salud y Bienestar</option>
                                <option value="Viajes">Viajes</option>
                                <option value="Negocios y Finanzas">Negocios y Finanzas</option>
                                <option value="Cocina y Receta">Cocina y Receta</option>
                                <option value="Varios">Varios</option>
                            </select>
                            <div className="container-btn-edit">
                                <button onClick={handleDelete}>Eliminar</button>
                                <button>Guardar Cambios</button>
                            </div>
                        </form>
                    </>

                )
            }
        </div>
    );
};

export default EditTask;
