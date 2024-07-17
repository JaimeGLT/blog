import React from 'react'
import MisTasks from '../components/MisTasks'

const MisPublicaciones = ({ isAutenticated }) => {
  return (
    <div>
        <MisTasks isAutenticated={isAutenticated}/>
    </div>
  )
}

export default MisPublicaciones