import './App.css'
import { browseGenres, featuredPlaylist, newReleases } from './utils/Spotify'
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Header from './components/Header'
import Gallery from './components/Gallery/NewReleaseGallery'
import FeaturedGallery from './components/Gallery/FeaturedGallery'
import GenreGallery from './components/Gallery/GenreGallery'
function App() {
  const [genres, setGenres] = useState([])
  const [newRelease, setNewRelease] = useState([])
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let fetchedGenre = await browseGenres()
      let fetchedNewRelease = await newReleases()
      let fetchedFeatured = await featuredPlaylist()
      setGenres(fetchedGenre)
      setNewRelease(fetchedNewRelease)
      setFeatured(fetchedFeatured)
    }
    fetchData()
  }, [])

  return (
    <div className='App'>
      <div className='flex'>
        <div className='bg-indigo-600 text-white' style={{ width: '15vw' }}>
          <Sidebar />
        </div>
        <div className='' style={{ width: '85vw' }}>
          <div className='bg-red-200' style={{ height: '15vh' }}>
            <Header />
          </div>
          <div className='my-20'>
            <Gallery heading='Released This week' data={newRelease} />
          </div>
          <div className=''>
            <FeaturedGallery heading='Featured playlists' data={featured} />
          </div>
          <div className='my-20'>
            <GenreGallery heading='Browse' data={genres} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
