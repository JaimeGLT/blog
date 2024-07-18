import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

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
      setErrors(null);
      navigate('/login');
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
          errors?.length ? errors?.map(err => <p key={2 * Math.random()}>{err}</p>) : errors?.msg ? <p>{errors.msg}</p> : null
        }
        <input type="text" placeholder='Nombre de Usuario' onChange={handleChange} value={userRegister.username} name='username'/>
        <input type="email" placeholder='Correo Electrónico' onChange={handleChange} value={userRegister.email} name='email'/>
        <input type="password" placeholder='Contraseña' onChange={handleChange} value={userRegister.password} name='password'/>

        <button>Register</button>

        <div>
          <p>¿Ya tienes una cuenta?</p>
          <Link to='/login'>
            <span>Inicia sesión</span>
          </Link>
        </div>

      </form>
    </div>
  )
}

export default Register