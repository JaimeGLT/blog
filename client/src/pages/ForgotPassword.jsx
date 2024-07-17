import React, { useState } from 'react'
import axios from '../api/axios';

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
      setEnviado(res.data);
    } catch (error) {
      setEnviado('');
      setErrors(error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
          errors.length ? errors.map(err => <p key={2 * Math.random()}>{err}</p>) : errors?.msg ? <p>{errors.msg}</p> : null
        }
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