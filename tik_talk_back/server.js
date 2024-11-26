import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables

import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.js'
// import { requireAuth } from './middlewares/requireAuth.middleware.js'
import { userRoutes } from './api/user/user.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { submissionRoutes } from './api/submission/sub.routes.js'
import { sessionRoutes } from './api/session/session.routes.js'
import { questionRoutes } from './api/questions/questions.routes.js'

// import { setupSocketAPI } from './services/socket.service.js'
// import { reviewRoutes } from './api/review/review.routes.js'
const app = express()
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())
app.use(setupAsyncLocalStorage)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5173'],
        credentials: true,
    }
    app.use(cors(corsOptions))
}
// Add error handling for CORS
app.use((err, req, res, next) => {
    if (err.name === 'CORSError') {
        res.status(403).json({ error: 'CORS error', message: err.message })
    } else {
        next(err)
    }
})

// app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/submissions', submissionRoutes)
app.use('/api/questions', questionRoutes)
// app.use('/api/review', reviewRoutes)

// setupSocketAPI(server)

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

import { logger } from './services/logger.service.js'
const port = process.env.PORT || 3030

server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})
