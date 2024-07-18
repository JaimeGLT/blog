import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import Task from './Task';
import NavBar from './NavBar';
import '../css/Tasks.css';

const Tasks = ({ isAutenticated }) => {

    const [ tasks, setTasks ] = useState([]); 

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get('/public-tasks');
                setTasks(res.data);
            } catch (error) {
                setTasks([])
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
                !tasks.length ? <p>Todabía no se han creado publicaciones...</p> 
                : tasks?.map(tarea => <Task key={tarea.id} id={tarea.id} description={tarea.description} datePublication={tarea.datePublication} title={tarea.title} genres={tarea.genres}/>)
            }

        </div>
    </div>
  )
}

export default Tasks