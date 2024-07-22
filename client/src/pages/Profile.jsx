import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import NavBar from '../components/NavBar';
import '../css/profile.css';

const Profile = ({ user, isAutenticated }) => {

    const [ usernamePut, setUsername ] = useState('');
    const [ passwordPut, setPasswordPut ] = useState({
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    console.log(user);
    const [errorsPassword, setErrorsPassword] = useState([]);
    const [errorsUsername, setErrorsUsername] = useState([]);
    const [ clickIn, setClickIn ] = useState('');


    useEffect(() => {
        setUsername(user.username || '')
    }, [user.username])

    const handleChange = e => {
        const { name } = e.target;
        setPasswordPut({
            ...passwordPut,
            [name]: e.target.value
        })
    };

    const handleChangeUser = e => {
        setUsername(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(clickIn === 'user') {
                await axios.put('/user-username', {username: usernamePut});
                setErrorsUsername([]);
                return;
            };
            if(clickIn === 'password') {
                await axios.put('/user-password', passwordPut)
                setErrorsPassword([]);
                return;
            }
        } catch (error) {
            if(clickIn === 'user')setErrorsUsername(error.response.data);
            if(clickIn === 'password') setErrorsPassword(error.response.data);
        }
    };

  return (
    <div className='container-profile'>
        <NavBar isAutenticated={isAutenticated} />
        <form onSubmit={handleSubmit} className='form-info-profile'>
            <div className='container-info-profile'>
                <h2>Informacion de usuario</h2>
                {
                      errorsUsername?.length ? errorsUsername?.map(err => <p className='p-errorss' key={2 * Math.random()}>{err}</p>) : errorsUsername?.msg ? <p className='p-errorss p-error-good'>{errorsUsername.msg}</p> : null
                }
                <h3>Correo electrónico</h3> 
                <p>{user.email}</p>
                <label htmlFor='username'>Nombre de usuario</label>
                <input 
                    type="text" 
                    name='username' 
                    id='username'
                    onChange={handleChangeUser} 
                    value={usernamePut} 
                    placeholder='Nombre de Usuario'
                    />
                <button onClick={() => setClickIn('user')}>Guardar</button>

            </div>

            <div className='container-info-profile'>
                <h2>Cambiar contraseña</h2>
                {
                  errorsPassword?.length ? errorsPassword?.map(err => <p className='p-errorss' key={2 * Math.random()}>{err}</p>) : errorsPassword?.msg ? <p className='p-errorss p-error-good'>{errorsPassword.msg}</p> : null
                }

                <input 
                    type="password" 
                    placeholder='Introducir contraseña actual' 
                    onChange={handleChange} 
                    value={passwordPut.password || ''} 
                    name='password'
                />
                <input 
                    type="password" 
                    placeholder='Introducir nueva contraseña' 
                    onChange={handleChange} 
                    value={passwordPut.newPassword || ''} 
                    name='newPassword'
                />
                <input 
                    type="password" 
                    placeholder='Introducir nueva contraseña de nuevo' 
                    onChange={handleChange} 
                    value={passwordPut.confirmNewPassword || ''}
                    name='confirmNewPassword'
                />
                <button onClick={ () => setClickIn('password') }>Cambiar contraseña</button>
            </div>
        </form>
    </div>
  )
}

export default Profile