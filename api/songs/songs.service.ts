import axios from 'axios'

const spotifyAccessToken = getSpotifyAccessToken()

async function getSpotifyAccessToken(): Promise<any> {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    null,
    {
      params: { grant_type: 'client_credentials' },
      auth: {
        username: process.env.clientId!,
        password: process.env.clientSecret!,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  )

  return response.data.access_token
}

const getPlaylistById = async (playlistId: string) => {
  if (await spotifyAccessToken) {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${await spotifyAccessToken}`,
        },
      },
    )
    return response.data
  } else {
    throw new Error('Spotify access token is not available')
  }
}

export const songsService = {
  getPlaylistById,
}