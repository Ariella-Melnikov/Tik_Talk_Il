import { config } from '../config/index.js'
import { logger } from '../services/logger.service.js'
import { asyncLocalStorage } from '../services/als.service.js'

export function requireAuth(req, res, next) {
    const alsStore = asyncLocalStorage.getStore()
    const loggedinUser = alsStore?.get('loggedinUser')

    if (!loggedinUser) {
        console.log('Authentication failed: No loggedinUser found in ALS store.')
        return res.status(401).send({ err: 'Not Authenticated' })
    }

    console.log('Authenticated user:', loggedinUser)
    req.loggedinUser = loggedinUser // Attach the user to the request object
    next()
}

export function requireAdmin(req, res, next) {
    const alsStore = asyncLocalStorage.getStore()
    const loggedinUser = alsStore?.get('loggedinUser')

    // Check if a user is logged in
    if (!loggedinUser) {
        console.log('Authorization failed: No loggedinUser found in ALS store.')
        return res.status(401).send({ err: 'Not Authenticated' })
    }

    // Check if the user is an admin
    if (!loggedinUser.isAdmin) {
        logger.warn(`${loggedinUser.fullname} attempted to perform an admin action`)
        return res.status(403).send({ err: 'Not Authorized' })
    }

    console.log('Admin authorized:', loggedinUser)
    req.loggedinUser = loggedinUser // Attach user to the request object
    next()
}
