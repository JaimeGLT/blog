import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axiosMOD from '../api/axios';
import NavBar from './NavBar';
import spaceIMG from '../img/space.jpg'
import '../css/taskDetail.css';


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
      console.log('');
    }
  }

  const handleDelete = async () => {
    try {
      const res = await axiosMOD.delete(`/favorite/${id}`);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log('');
    }
  };


  const handlePathname = () => {
    navigate('/home');
  }

  return (
    <div>
      <NavBar isAutenticated={isAutenticated}/>
      
        <div className='container-taskDetail'>
          {
              typeof task === 'string' ? <p>Tarea no encontrada</p> 
              : (
                <>
                    <p className='p-genres'>{task.genres}</p>
                    <h2>{task.title}</h2>
                  
                    <div className='container-creador'>
                      <p>{user.username} | </p>
                      {
                        !isAutenticated ? null : isFavorite ?  <button id='is-not-fav' onClick={handleDelete}>Eliminar de favoritos</button> 
                        : <button id='is-fav' onClick={handleFavorite}> Agregar a favoritos</button>
                      }
                    </div>

                  <p className='p-datePublication'> {task.datePublication}</p>
                  <img src={spaceIMG} alt="" />
                  <p className='p-description'>{task.description}</p>
      
                  <button className='button-volver' onClick={handlePathname}>Volver</button>
                </>
              )
          }
        </div>
      
    </div>
  )
}

export default TaskDetail