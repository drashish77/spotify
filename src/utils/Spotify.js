// import spotify from '../utils/secret'
// const accessUrl = `https://accounts.spotify.com/authorize?client_id=${spotify.client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${spotify.redirect_uri}`
// window.location = accessUrl

const clientId = 'client_id' // Insert client ID here.
const redirectUri = 'http://localhost:3000/' // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1]
      const expiresIn = Number(expiresInMatch[1])
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000)
      window.history.pushState('Access Token', null, '/') // This clears the parameters, allowing us to grab a new access token when it expires.
      localStorage.setItem('access_token', accessToken)
      return accessToken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
      window.location = accessUrl
    }
  },

  releaseThisWeek() {
    const accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/browse/new-releases`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return []
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }))
      })
  },

  featured() {
    const accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return []
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }))
      })
  },

  browseGenres() {
    const accessToken = Spotify.getAccessToken()

    return fetch(`https://api.spotify.com/v1/browse/categories`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonResponse) => {
        // console.log(jsonResponse.categories.items)

        if (!jsonResponse.categories) {
          return []
        }
        return jsonResponse.categories.items
        // jsonResponse.categories.items.map((genre) => ({
        //    id: genre.id,
        //    name: genre.name,
        //    icons: genre.icons[0].url,
        //    album: genre.album.name,
        //    uri: genre.uri,
        //  }))
      })
  },
}
export const browseGenres = () => {
  const accessToken = Spotify.getAccessToken()

  // const accessToken = localStorage.getItem('access_token')
  return fetch(`https://api.spotify.com/v1/browse/categories`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      return response.json()
    })
    .then(
      (jsonResponse) => jsonResponse.categories && jsonResponse.categories.items
    )
}
export const newReleases = () => {
  const accessToken = Spotify.getAccessToken()

  // const accessToken = localStorage.getItem('access_token')
  return fetch(`https://api.spotify.com/v1/browse/new-releases`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      return response.json()
    })
    .then((jsonResponse) => jsonResponse.albums && jsonResponse.albums.items)
}
export const featuredPlaylist = () => {
  const accessToken = Spotify.getAccessToken()

  return fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      return response.json()
    })
    .then(
      (jsonResponse) => jsonResponse.playlists && jsonResponse.playlists.items
    )
}
export default Spotify
