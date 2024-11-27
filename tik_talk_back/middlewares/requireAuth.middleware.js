import { firebaseAuth } from '../services/db/db.service.firebase.js'
import { asyncLocalStorage } from '../services/als.service.js' 


export async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send('No authorization header')
    }

    try {
        const token = authHeader.split(' ')[1]
        const decodedToken = await admin.auth().verifyIdToken(token)
        req.user = decodedToken
        next()
    } catch (error) {
        console.error('Auth error:', error)
        res.status(401).send('Unauthorized')
    }
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
