import { firebaseAuth } from '../../services/db/db.service.firebase.js'
import { dbService } from '../../services/db/index.js'
import { logger } from '../../services/logger.service.js'
import { authService } from './auth.service.js'

export async function login(req, res) {
    const { email, password } = req.body
    try {
        if (process.env.DB_TYPE === 'firebase') {
            // Fetch the user and generate a custom token
            const userRecord = await firebaseAuth.getUserByEmail(email)
            const customToken = await firebaseAuth.createCustomToken(userRecord.uid)

            // Optional: Fetch additional user data from Firestore
            const userDoc = await dbService.collection('users').doc(userRecord.uid).get()
            const userData = userDoc.exists ? userDoc.data() : {}

            return res.json({
                user: { uid: userRecord.uid, email: userRecord.email, ...userData },
                idToken: customToken,
            })
        } else if (process.env.DB_TYPE === 'mongo') {
            // MongoDB Authentication
            const usersCollection = dbService.collection('users')
            user = await usersCollection.findOne({ email })

            if (!user || user.password !== password) {
                throw new Error('Invalid email or password')
            }
        }

        res.json({ user })
    } catch (err) {
        logger.error('Failed to Login', err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

export async function signup(req, res) {
    const { email, password, fullname, courseType, phone } = req.body

    try {
        const userToAdd = {
            email,
            password,
            fullname,
            courseType,
            phone,
            isAdmin: false,
            createdAt: new Date(),
        }

        if (process.env.DB_TYPE === 'firebase') {
            // Firebase user creation and saving additional data
            const userRecord = await firebaseAuth.createUser({ email, password })
            await dbService.collection('users').doc(userRecord.uid).set(userToAdd)

            const customToken = await firebaseAuth.createCustomToken(userRecord.uid)
            return res.json({
                user: { uid: userRecord.uid, email: userRecord.email, ...userToAdd },
                idToken: customToken,
            })
        } else if (process.env.DB_TYPE === 'mongo') {
            const usersCollection = dbService.collection('users')
            const result = await usersCollection.insertOne(userToAdd)
            return res.json({ user: { ...userToAdd, _id: result.insertedId } })
        }
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
