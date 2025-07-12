import express from 'express'
import { songsController } from './songs.controller'

const router = express.Router()

router.get('/:id', songsController.getPlaylistById)

export const songsRoutes = router