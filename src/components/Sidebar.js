import React from 'react'
import NavCard from './NavCard'

const Sidebar = () => {
  return (
    <div className='items-center'>
      <div className=''>
        <div className='avatar'>
          <i className='fas fa-user-circle'></i>
        </div>
        <h3>Name</h3>
      </div>
      <div className=''>
        <NavCard icon='headphones' name='Discover' />
        <NavCard icon='search' name='Search' />
        <NavCard icon='heart' name='Favourites' />
        <NavCard icon='play-circle' name='Playlists' />
        <NavCard icon='align-center' name='Charts' />
      </div>
    </div>
  )
}

export default Sidebar
