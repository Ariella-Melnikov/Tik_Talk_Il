import { firebaseAuth } from '../services/db/db.service.firebase.js'

export async function requireAuth(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (!token) return res.status(401).send({ err: 'Unauthorized' })

    try {
        const decodedToken = await firebaseAuth.verifyIdToken(token) // Verify token with Firebase
        req.user = decodedToken // Attach user info to request object
        console.log('Decoded Token:', decodedToken)
        next()
    } catch (err) {
        console.error('Failed to verify token:', err.message)
        return res.status(401).send({ err: 'Unauthorized - Invalid Token' })
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
