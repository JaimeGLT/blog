import { useState } from "react"
import axios from '../api/axios';
import { useNavigate, useParams } from "react-router-dom";
import '../css/newPassword.css';

const NewPassword = () => {

    const [ userPassword, setUserPassword ] = useState({
        newPassword: '',
        confirmNewPassword: ''
    })
    const [ errors, setErros ] = useState([]);
    const [ message, setMessage ] = useState('');

    const { token } = useParams();
    const navigate = useNavigate();

    const handleChange = e => {
        const { name } = e.target;

        setUserPassword({
            ...userPassword,
            [name]: e.target.value
        })

    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`/new-password/${token}`, userPassword);
            setErros([]);
            setMessage('Se ha cambiado correctamente la contraseña');
            setTimeout(() => {
                navigate('/login');
            }, 3000)
        } catch (error) {
            setErros(error.response.data);
            setMessage('');
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit} className="form-newPassword">
            <h2>Nueva contraseña</h2>
            {
                errors.length ? errors.map(err => <p className='p-errors' key={4 * Math.random()}>{err}</p>) : errors?.msg ? <p className='p-errors'>{errors.msg}</p> : null
            }

            <input type="password" placeholder='Nueva contraseña' onChange={handleChange} value={userPassword.newPassword} name='newPassword'/>
            <input type="password" placeholder='Confirmar contraseña' onChange={handleChange} value={userPassword.confirmNewPassword} name='confirmNewPassword'/>

            <button>Confirmar</button>
            {
                message ? <p>{message} Redirigiendo en 3 segundos...</p> : null
            }
        </form>
    </div>
  )
}

export default NewPassword