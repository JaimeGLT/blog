import React from 'react'
import Tasks from '../components/Tasks'
import '../css/home.css'

const Home = ({ isAuteticated, user }) => {


  return (
    <div className='container-home'>
      <Tasks isAuteticated={isAuteticated}/>
    </div>
  )
}

export default Home