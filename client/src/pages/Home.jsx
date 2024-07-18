import React from 'react'
import Tasks from '../components/Tasks'
import '../css/home.css'

const Home = ({ isAutenticated }) => {


  return (
    <div className='container-home'>
      <Tasks isAutenticated={isAutenticated}/>
    </div>
  )
}

export default Home