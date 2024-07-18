import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import Task from '../components/Task';
import NavBar from '../components/NavBar';
import '../css/Tasks.css';

const MyFavorites = ({ isAutenticated }) => {

    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get('/favorites');
                setTasks(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getTasks();
    }, [])

  return (
    <div className='tasks-container'>
        <NavBar isAutenticated={isAutenticated} />
        <div className='task-container'>
            {
                tasks.msg ? <p>{tasks.msg}</p> : tasks.map(tarea => <Task key={tarea.id} id={tarea.id} description={tarea.description} datePublication={tarea.datePublication} title={tarea.title} genres={tarea.genres}/>)
            }

        </div>
    </div>
  )
}

export default MyFavorites;