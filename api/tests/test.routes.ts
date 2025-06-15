import express from 'express'
import { testController } from './test.controller'

const router = express.Router()

router.post('/', testController.createTestUser)

export const testRoutes = router
