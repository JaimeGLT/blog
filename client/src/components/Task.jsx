import React from 'react'
import '../css/task.css';
import { useNavigate } from 'react-router-dom';

const Task = ({ id, datePublication, description, genres, title }) => {

  const navigate = useNavigate();

  return (
    <div className='container-task'>
        <p>{title}</p>
        <p>{datePublication}</p>
        <p>{description}</p>
        <p>{genres}</p>
        <button onClick={() => navigate(`/publicacion/${id}`)}>Ver Publicación</button>
    </div>
  )
}

export default Task