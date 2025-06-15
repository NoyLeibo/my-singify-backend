import express from 'express'
import { taskController } from './task.controller'
import { verifyUserToken } from '../../middlewares/requireAuth.middleware'

const router = express.Router()

router.get('/', verifyUserToken, () => {})
router.post('/', verifyUserToken, taskController.createTask)
router.get('/:id', verifyUserToken, taskController.getTasks)
router.put('/:id', verifyUserToken, () => {})
router.delete('/:id', verifyUserToken, () => {})

export const taskRoutes = router
