import express from 'express'
import { authController } from './auth.controller'

const router = express.Router()

router.post('/signup', authController.signup)
// router.post('/login', authController.login)
router.options('/login', (req, res) => {
  console.log('BODY:', req.body)
  res.send('ok')
})

router.post('/change-password', authController.changePassword)

export const authRoutes = router
