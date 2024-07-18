import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {

    const [ userLogin, setUserLogin ] = useState({
        email: '',
        password: ''
    });

    const [ errors, setErrors ] = useState([]);

    const navigate = useNavigate();

    const handleChange = e => {
        const { name } = e.target;

        setUserLogin({
            ...userLogin,
            [name]: e.target.value
        })

    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', userLogin);
            setErrors([]);
            navigate('/home')
        } catch (error) {
            setErrors(error.response.data);
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            {
                errors.length ? errors.map(err => <p key={3 * Math.random()}>{ err }</p>) : errors?.msg ? <p>{errors.msg}</p> : null
            }
            <input type="email" name='email' onChange={handleChange} value={userLogin.email} placeholder='Correo electrónico'/>
            <input type="password" name='password' onChange={handleChange} value={userLogin.password} placeholder='Contraseña'/>

            <Link to='/forgot-password'>
                <p>Olvidé mi contraseña</p>
            </Link>

            <button>Login</button>

            <div>
                <p>¿Aún no tienes una cuenta?</p>
                <Link to='/register'>
                    <span>Regístrate</span>
                </Link>
            </div>

        </form>
    </div>
  )
}

export default Login