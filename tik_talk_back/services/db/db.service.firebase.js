
import dotenv from 'dotenv'
dotenv.config()

import admin from 'firebase-admin'
try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
    console.log('Firebase Admin initialized successfully');
} catch (err) {
    console.error('Failed to parse Firebase service account JSON:', err.message)
    process.exit(1) 
}

export const firebaseService = {
    collection: (collectionName) => admin.firestore().collection(collectionName),
};

// Export Firebase Authentication instance
export const firebaseAuth = admin.auth()
