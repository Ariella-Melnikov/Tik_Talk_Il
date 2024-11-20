const { VITE_LOCAL, MODE } = import.meta.env

import { authService as local } from './auth.service.local.js'
import { authService as remote } from './auth.service.remote.js'

const service = VITE_LOCAL === 'true' ? local : remote

export const authService = { ...service }

// Expose service for debugging in development mode
if (MODE === 'development') {
    window.authService = authService
}
