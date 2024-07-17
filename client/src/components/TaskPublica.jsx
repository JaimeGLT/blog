import React, { useState } from "react";
import "../css/task.css";
import axiosMOD from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const TaskMias = ({
    id,
    datePublication,
    description,
    genres,
    title,
    tasks,
    setTasks,
}) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const res = await axiosMOD.delete(`/task/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-task">
            <p>{datePublication}</p>
            <p>{description}</p>
            <p>{genres}</p>
            <p>{title}</p>
            <div>
                <button onClick={handleDelete}>Eliminar</button>
                <button onClick={() => navigate(`/editar-publicacion/${id}`)}>
                    Editar
                </button>
            </div>
        </div>
    );
};

export default TaskMias;
