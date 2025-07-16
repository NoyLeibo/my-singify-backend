import axios from 'axios'

const spotifyAccessToken = getSpotifyAccessToken()


async function getSpotifyAccessToken(): Promise<any> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
  throw new Error('Missing Spotify clientId or clientSecret in environment variables');
}
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    null,
    {
      params: { grant_type: 'client_credentials' },
      auth: {
        username: clientId,
        password: clientSecret!,
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