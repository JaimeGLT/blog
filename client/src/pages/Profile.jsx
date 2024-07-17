import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

const Profile = ({ user }) => {

    const [ userPut, setUserPut ] = useState({
        username: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        setUserPut({
            username: user.username || '',
            newPassword: '',
            confirmNewPassword: ''
        })
    }, [user])

    const handleChange = e => {
        const { name } = e.target;

        setUserPut({
            ...userPut,
            [name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/user', userPut);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name='username' 
                onChange={handleChange} 
                value={userPut.username} 
                placeholder='Nombre de Usuario'
            />
            <button>Guardar</button>

            <h2>Correo electrónico</h2> 
            <p>{user.email}</p>

            <h2>Cambiar contraseña</h2>
            <input 
                type="password" 
                placeholder='Introducir contraseña actual' 
                onChange={handleChange} 
                value={userPut.password || ''} 
                name='password'
            />
            <input 
                type="password" 
                placeholder='Introducir nueva contraseña' 
                onChange={handleChange} 
                value={userPut.newPassword || ''} 
                name='newPassword'
            />
            <input 
                type="password" 
                placeholder='Introducir nueva contraseña de nuevo' 
                onChange={handleChange} 
                value={userPut.confirmNewPassword || ''}
                name='confirmNewPassword'
             />
            <button>Cambiar contraseña</button>
        </form>
    </div>
  )
}

export default Profile