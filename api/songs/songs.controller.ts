import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { songsService } from './songs.service'

async function getPlaylistById(
  request: Request,
  response: Response,
): Promise<any> {
  const { id } = request.params

  try {
    const playlist = await songsService.getPlaylistById(id)
    console.log(`Playlist fetched successfully: ${playlist}`)

    response.status(StatusCodes.OK).send(playlist)
  } catch (error: any) {
    console.error(`Error fetching playlist: ${error.message}`)
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message })
  }
}

export const songsController = { getPlaylistById }