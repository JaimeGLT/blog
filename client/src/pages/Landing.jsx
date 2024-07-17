import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
      Blog
      <Link to='/home'>
        <button>Iniciar</button>
      </Link>
    </div>
  )
}

export default Landing