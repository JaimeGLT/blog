import React, { useEffect, useState } from 'react'
import '../css/task.css';
import { useNavigate } from 'react-router-dom';
import spaceIMG from '../img/space.jpg';

const Task = ({ id, datePublication, genres, title }) => {

  const navigate = useNavigate();
  const [ titleMod, setTitleMod ] = useState(title);

  useEffect(() => {
    if(title.length >= 140) {
      setTitleMod(title.slice(0, 115) + '...');
      return
    };
  }, [])

  return (
    <div className='container-task' onClick={() => navigate(`/publicacion/${id}`)}>
        <img src={spaceIMG} alt="Space" />
        <p>Publicado | {datePublication}</p>
        <p className='p-genre'>{genres}</p>
        <h3>{titleMod}</h3>
    </div>
  )
}

export default Task