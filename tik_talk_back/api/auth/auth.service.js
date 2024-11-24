import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db/index.js'
import { firebaseAuth } from '../../services/db/db.service.firebase.js'

export const authService = {
    signup,
    login,
}

async function login(email, password) {
    if (process.env.DB_TYPE === 'firebase') {
        const user = await firebaseAuth.getUserByEmail(email);
        if (!user) throw new Error('Invalid email or password');
        return user;
    } else if (process.env.DB_TYPE === 'mongo') {
        const collection = dbService.collection('users');
        const user = await collection.findOne({ email });
        if (!user || user.password !== password) throw new Error('Invalid email or password');
        return user;
    }
}
async function signup(userToAdd) {
    const { email, password, fullname } = userToAdd;

    try {
        if (process.env.DB_TYPE === 'firebase') {
            // Create user in Firebase Authentication
            const userRecord = await firebaseAuth.createUser({
                email,
                password,
                displayName: fullname,
            });

            // Save additional fields in Firestore
            await dbService.collection('users').doc(userRecord.uid).set(userToAdd);

            return { ...userToAdd, uid: userRecord.uid };
        } else if (process.env.DB_TYPE === 'mongo') {
            // Insert user into MongoDB
            const usersCollection = dbService.collection('users');
            const result = await usersCollection.insertOne(userToAdd);

            return { ...userToAdd, _id: result.insertedId };
        }
    } catch (err) {
        logger.error('Error in authService.signup:', err);
        throw err;
    }
}
