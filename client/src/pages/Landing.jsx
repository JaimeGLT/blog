import { Link } from 'react-router-dom'
import '../css/landing.css';

const Landing = () => {
  return (
    <div className='container-landing'>
      <h1>BLOG</h1>
      <Link to='/home' className='link-home'>
        <button>Iniciar</button>
      </Link>
    </div>
  )
}

export default Landing