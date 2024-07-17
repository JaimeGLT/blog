import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axiosMOD from '../api/axios';
import NavBar from './NavBar';


const TaskDetail = ({ isAutenticated, user }) => {

  const [ task, setTask ] = useState({});
  const [ isFavorite, setIsFavorite ] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const getPublicacion = async () => {
      try {
        const res = await axiosMOD.get(`/public-task/${id}`);
        setTask(res.data);
      } catch (error) {
        setTask('Tarea no encontrada')
      }
    };

    const getFavorite = async () => {
      try {
        const res = await axiosMOD.get(`/favorite/${id}`);
        setIsFavorite(true);
      } catch (error) {
        setIsFavorite(false);
      }
    };
    getPublicacion();
    getFavorite();
  }, [])

  const handleFavorite = async () => {
    try {
      const res = await axiosMOD.post(`/favorite/${id}`);
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    try {
      const res = await axiosMOD.delete(`/favorite/${id}`);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
  };


  const handlePathname = () => {
    navigate('/home');
  }

  return (
    <div>
      <NavBar isAuteticated={isAutenticated}/>
      {
        typeof task === 'string' ? <p>Tarea no encontrada</p> 
        : (
          <>
          <p>Esta publicación pertenece a: {user.username}</p>
            {
              isFavorite ? <button onClick={handleDelete}>Eliminar de favoritos</button> 
              : <button onClick={handleFavorite}>Agregar a favoritos</button>
            }

            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.datePublication}</p>
            <p>{task.genres}</p>

            <button onClick={handlePathname}>Volver</button>
          </>
        )
      }
    </div>
  )
}

export default TaskDetail