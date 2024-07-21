import React, { useState, useEffect } from "react";
import axiosMOD from "../api/axios";
import { useNavigate } from "react-router-dom";
import spaceIMG from '../img/space.jpg'
import "../css/task.css";


const TaskMias = ({
    id,
    datePublication,
    genres,
    title,
    tasks,
    setTasks,
}) => {
    const [ titleMod, setTitleMod ] = useState(title);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(title.length >= 90) {
          setTitleMod(title.slice(0, 90) + '...');
          return
        };
      }, [])

    const handleDelete = async () => {
        try {
            const res = await axiosMOD.delete(`/task/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.log('');
        }
    };

    return (
        <div className="container-task">
            <img src={spaceIMG} alt="" />
            <p>Publicado | {datePublication}</p>
            <p className='p-genre'>{genres}</p>
            <h3>{titleMod}</h3>
            <div className="container-btn-taskPublica">
                <button className='btn-delete'onClick={handleDelete}>Eliminar</button>
                <button onClick={() => navigate(`/editar-publicacion/${id}`)}>
                    Editar
                </button>
            </div>
        </div>
    );
};

export default TaskMias;
