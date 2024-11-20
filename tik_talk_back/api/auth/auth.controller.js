import { firebaseAuth } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

export async function login(req, res) {
    const { email, password } = req.body
    try {
        // Sign in the user with Firebase Authentication
        const user = await firebaseAuth.getUserByEmail(email)

        // Optional: Generate a custom token for frontend use
        const customToken = await firebaseAuth.createCustomToken(user.uid)

        res.json({ user, token: customToken })
    } catch (err) {
        logger.error('Failed to Login', err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}
export async function signup(req, res) {
    const { email, password, fullname, courseType, phone } = req.body

    try {
        // Create a new user with Firebase Authentication
        const userRecord = await firebaseAuth.createUser({
            email,
            password,
            displayName: fullname, // Save the full name in the Firebase user profile
        })

        // Save additional fields in Firestore
        await dbService.collection('users').doc(userRecord.uid).set({
            email,
            fullname,
            courseType,
            phone,
            createdAt: new Date(),
        })

        // Optional: Generate a custom token for frontend use
        const customToken = await firebaseAuth.createCustomToken(userRecord.uid)

        logger.info('User signup successful:', userRecord)
        res.json({ user: userRecord, token: customToken })
    } catch (err) {
        logger.error('Failed to Signup', err)
        res.status(400).send({ err: 'Failed to Signup' })
    }
}

export async function logout(req, res) {
    try {
        // Clear any local login token cookies
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(400).send({ err: 'Failed to logout' })
    }
}
