import React from 'react'
import '../css/task.css';

const Task = ({ datePublication, description, genres, title }) => {
  return (
    <div className='container-task'>
        <p>{datePublication}</p>
        <p>{description}</p>
        <p>{genres}</p>
        <p>{title}</p>
    </div>
  )
}

export default Task