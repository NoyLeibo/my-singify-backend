import express from 'express'
import { userController } from './user.controller'
import { verifyUserToken } from '../../middlewares/requireAuth.middleware'

const router = express.Router()

router.get('/:id', userController.getUser)
router.put('/:id', verifyUserToken, userController.updateUser)
router.delete('/:id', verifyUserToken, userController.removeUser)

export const userRoutes = router
