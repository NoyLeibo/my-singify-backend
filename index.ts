import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { servers } from './src/servers'
import session from 'express-session'
import { testRoutes } from './api/tests/test.routes'
import { dbService } from './services/db.service'
import { userRoutes } from './api/user/user.routes'
import { authRoutes } from './api/auth/auth.routes'
import { taskRoutes } from './api/task/task.routes'

dotenv.config()

const app = express()
app.use(express.json())

const corsOptions = {
  origin: ['http://127.0.0.1:8081', 'http://localhost:8081'],
  credentials: true,
}
app.use(cors(corsOptions))

// cookies usages
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'secret-session-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 5 * 60 * 1000 },
//   }),
// )

app.use('/test', testRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/task', taskRoutes)

const startServer = async () => {
  try {
    console.log('🚀 Starting Server...')

    await dbService.connectToMongoDB()
    await servers.startServer(app)
  } catch (error: any) {
    console.error(`❌ Failed to start server: ${error.message}`)
    process.exit(1)
  }
}

startServer()
