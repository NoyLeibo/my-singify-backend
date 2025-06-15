import express from 'express'
import { authController } from './auth.controller'

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/change-password', authController.changePassword)

export const authRoutes = router
