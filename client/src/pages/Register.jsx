import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import '../css/register.css';

const Register = () => {

  const [ userRegister, setUserRegister ] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [ errors, setErrors ] = useState([]);

  const navigate = useNavigate();

  const handleChange = e => {
    const { name } = e.target;

    setUserRegister({
      ...userRegister,
      [name]: e.target.value
    });

  };

  const handleSubmit = async e => {

    e.preventDefault();

    try {
      const res = await axios.post('/register', userRegister);
      setErrors({ msg: 'Se han guardado los cambios' })
      navigate('/login');
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div className='container-register'>
      <h2>REGISTRO</h2>
      <form onSubmit={handleSubmit} className='form-register'>
        {
          errors?.length ? errors?.map(err => <p className='p-errors' key={2 * Math.random()}>{err}</p>) : errors?.msg ? <p className='p-errors p-error-good'>{errors.msg}</p> : null
        }
        <input type="text" placeholder='Nombre de Usuario' onChange={handleChange} value={userRegister.username} name='username'/>
        <input type="email" placeholder='Correo Electrónico' onChange={handleChange} value={userRegister.email} name='email'/>
        <input type="password" placeholder='Contraseña' onChange={handleChange} value={userRegister.password} name='password'/>

        <button>Registrarse</button>

        <div className='ir-login'>
          <p>¿Ya tienes una cuenta?</p>
          <Link to='/login' className='to-login'>
            <span>Inicia sesión</span>
          </Link>
        </div>

      </form>
    </div>
  )
}

export default Register