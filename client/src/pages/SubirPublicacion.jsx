import React, { useEffect, useState } from 'react'

const SubirPublicacion = () => {

    const [ dateNow, setDateNow ] = useState('');
    const [] = useState({
        title: '',
        description: '',
        genres: ''
    });

    useEffect(() => {
        const date = new Date();
        const dateString = new Date().toString();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const day = dateString.split(' ')[2];

        const fullDate = `${month}/${day}/${year}`
        setDateNow(fullDate);
    }, [])

    
    const handleSubmit = async e => {
        e.preventDefault();

    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Título' onChange={handleChange} name={task.title}/>
            <input type="text" placeholder='Título' onChange={handleChange} name={task.title}/>
            <p>Fecha de Publicacion: {dateNow}</p>
            <input type="text" placeholder='Título' onChange={handleChange} name={task.title}/>

            <button>Crear Publicacion</button>
        </form>
    </div>
  )
}

export default SubirPublicacion