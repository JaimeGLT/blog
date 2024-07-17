import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import Task from './Task';
import NavBar from './NavBar';
import '../css/Tasks.css';

const Tasks = ({ isAuteticated }) => {

    const [ tasks, setTasks ] = useState([]); 

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get('/public-tasks');
                setTasks(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getTasks();
    }, [])

  return (
    <div className='tasks-container'>
        <NavBar isAuteticated={isAuteticated} />
        <div className='task-container'>
            {
                tasks.map(tarea => <Task key={tarea.id} description={tarea.description} datePublication={tarea.datePublication} title={tarea.title} genres={tarea.genres}/>)
            }

        </div>
    </div>
  )
}

export default Tasks