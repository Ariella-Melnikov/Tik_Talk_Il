import { firebaseAuth } from '../../services/db/db.service.firebase.js'
import { dbService } from '../../services/db/index.js'
import { logger } from '../../services/logger.service.js'
import { authService } from './auth.service.js';

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        let user;

        if (process.env.DB_TYPE === 'firebase') {
            user = await firebaseAuth.getUserByEmail(email);

            // Generate a custom token for frontend use
            const customToken = await firebaseAuth.createCustomToken(user.uid);
            return res.json({ user, token: customToken });

        } else if (process.env.DB_TYPE === 'mongo') {
            // MongoDB Authentication
            const usersCollection = dbService.collection('users');
            user = await usersCollection.findOne({ email });

            if (!user || user.password !== password) {
                throw new Error('Invalid email or password');
            }
        }

        res.json({ user });
    } catch (err) {
        logger.error('Failed to Login', err);
        res.status(401).send({ err: 'Failed to Login' });
    }
}

export async function signup(req, res) {
    const { email, password, fullname, courseType, phone } = req.body;

    try {
        const userToAdd = {
            email,
            password,
            fullname,
            courseType,
            phone,
            isAdmin: false,
            createdAt: new Date(),
        };

        const user = await authService.signup(userToAdd); // Pass userToAdd to the service
        res.json({ user });
    } catch (err) {
        logger.error('Failed to Signup', err);
        res.status(400).send({ err: 'Failed to Signup' });
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
