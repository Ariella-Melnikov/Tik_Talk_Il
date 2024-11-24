import { firebaseAuth } from '../services/db/db.service.firebase.js'

export async function requireAuth(req, res, next) {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split('Bearer ')[1]
    if (!token) return res.status(401).send({ err: 'Unauthorized' }) // If no token is provided, block access

    try {
        let decodedToken

        if (process.env.DB_TYPE === 'firebase') {
            // Firebase Authentication
            decodedToken = await firebaseAuth.verifyIdToken(token)
            req.user = decodedToken
        } else if (process.env.DB_TYPE === 'mongo') {
            // MongoDB Session
            const sessionCollection = dbService.collection('sessions')
            const session = await sessionCollection.findOne({ token })

            if (!session) throw new Error('Invalid token')
            req.user = session.user
        }

        next()
    } catch (err) {
        // Handle invalid or expired tokens
        res.status(401).send({ err: 'Unauthorized' })
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
