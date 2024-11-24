// import { MongoClient } from 'mongodb'

// import { config } from '../config/index.js'
// import { logger } from './logger.service.js'

// export const dbService = { getCollection }

// var dbConn = null

// async function getCollection(collectionName) {
// 	try {
// 		const db = await _connect()
// 		const collection = await db.collection(collectionName)
// 		return collection
// 	} catch (err) {
// 		logger.error('Failed to get Mongo collection', err)
// 		throw err
// 	}
// }

// async function _connect() {
// 	if (dbConn) return dbConn

// 	try {
// 		const client = await MongoClient.connect(config.dbURL)
// 		return dbConn = client.db(config.dbName)
// 	} catch (err) {
// 		logger.error('Cannot Connect to DB', err)
// 		throw err
// 	}
// }
import dotenv from 'dotenv'
dotenv.config()

import admin from 'firebase-admin'
try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    console.log('Loaded Firebase Service Account:', serviceAccount.project_id)
    // Initialize Firebase Admin
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
} catch (err) {
    console.error('Failed to parse Firebase service account JSON:', err.message)
    process.exit(1) // Stop the server if Firebase initialization fails
}

// Export Firestore instance
export const dbService = admin.firestore()

// Export Firebase Authentication instance
export const firebaseAuth = admin.auth()
