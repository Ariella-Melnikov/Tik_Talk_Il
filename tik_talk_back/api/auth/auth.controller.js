import { firebaseAuth, dbService } from '../../services/db.service.js'
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
        console.log('Signup request received with:', { email, fullname, courseType, phone });
        // Create a new user with Firebase Authentication
        const userRecord = await firebaseAuth.createUser({
            email,
            password,
            displayName: fullname, // Save the full name in the Firebase user profile
        })
        console.log('Firebase user created:', userRecord);

        // Save additional fields in Firestore
        await dbService.collection('users').doc(userRecord.uid).set({
            email,
            fullname,
            courseType,
            phone,
			isAdmin: false,
            createdAt: new Date(),
        })

        console.log('User saved to Firestore:', userRecord.uid);

        // 3. Generate a custom token for frontend use
        const customToken = await firebaseAuth.createCustomToken(userRecord.uid);
        console.log('Generated custom token:', customToken);

        // 4. Respond with user details and token
        res.json({
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                fullname: userRecord.displayName,
                courseType,
                phone,
                isAdmin: false,
            },
            token: customToken,
        });
        
    } catch (err) {
        // Enhanced error handling
        if (err.code === 'auth/email-already-exists') {
            res.status(400).send({ err: 'Email already in use' });
        } else {
            logger.error('Failed to Signup:', err.message);
            res.status(400).send({ err: 'Failed to Signup' });
        }
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
