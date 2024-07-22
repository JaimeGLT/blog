import React, { useState } from 'react'
import axios from '../api/axios';
import '../css/forgot-password.css';

const ForgotPassword = () => {

  const [ email, setEmail ] = useState('');
  const [ errors, setErrors ] = useState([]);
  const [ enviado, setEnviado ] = useState('');

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/forgot-password', {email});
      setErrors([]);
      setEnviado(res.data);
    } catch (error) {
      setEnviado('');
      setErrors(error.response.data);
    }
  };

  return (
    <div className='container-forgot-password'>
      <form onSubmit={handleSubmit} className='form-forgot-password'>
        <h2>Olvide mi contraseña</h2>
        {
          errors.length ? errors.map(err => <p className='p-errors' key={2 * Math.random()}>{err}</p>) : errors?.msg ? <p className='p-errors'>{errors.msg}</p> : null
        }
        <p>Ingrese el correo electronico al que enviaremos el enlace para hacer el cambio de contraseña</p>
        <input type="email" placeholder='example123@example.com' value={email} onChange={handleChange}/>
        <button>Enviar Correo</button>

        {
          enviado ? <p>{enviado.msg}</p> : null
        }

      </form>
    </div>
  )
}

export default ForgotPassword