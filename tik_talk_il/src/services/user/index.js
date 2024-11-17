const { VITE_LOCAL, MODE } = import.meta.env

import { userService as local } from './user.service.local.js'
import { userService as remote } from './user.service.remote.js'

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullname: '',
        email: '',
        phone: '',
        courseType: 'General',
        sessionCredits: 0,
        sessions: [],
        isAdmin: false,
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { getEmptyUser, ...service }

// Expose service for debugging in development mode
if (MODE === 'development') {
    window.userService = userService
}
