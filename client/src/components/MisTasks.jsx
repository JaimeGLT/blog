import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskMias from "../components/TaskPublica";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import add from '../img/add-white.png'
import "../css/Tasks.css";

const MisTasks = ({ isAutenticated }) => {
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await axios.get("/tasks");
                setTasks(res.data);
            } catch (error) {
                setTasks(error.response.data);
            }
        };
        getTasks();
    }, []);

    return (
        <div className="tasks-container">
            <NavBar isAutenticated={isAutenticated} setTasks={setTasks}/>
            <div className="task-container">
                {tasks.msg ? (
                    <p>{tasks.msg}</p>
                ) : (
                    tasks.map((tarea) => (
                        <TaskMias
                            key={tarea.id}
                            id={tarea.id}
                            description={tarea.description}
                            datePublication={tarea.datePublication}
                            title={tarea.title}
                            genres={tarea.genres}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                    ))
                )}
                <img className='add-publication' src={add} alt="Agregar publicación" onClick={() => navigate('/subir-publicacion')}/>
            </div>
        </div>
    );
};

export default MisTasks;
