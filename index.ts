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
import expressLogger from 'morgan'
// import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(express.json())
app.use(expressLogger('dev'))
// app.use(cookieParser())
app.use(express.static('public'))

const corsOptions = {
  // Make sure origin contains the url your frontend is running on
  origin: [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type'],
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
app.post('/', (req, res) => {
  res.send('API is working!')
})

// app.use('/test', testRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/task', taskRoutes)
// app.use('/spotify', spotifyRoutes)

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
