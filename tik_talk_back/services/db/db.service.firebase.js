import admin from 'firebase-admin'
import dotenv from 'dotenv'
dotenv.config()

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

// Base Firebase service for collection access
export const firebaseService = {
    collection: (collectionName) => admin.firestore().collection(collectionName),
    
    // Helper methods for common operations
    async getById(collectionName, id) {
        try {
            const doc = await this.collection(collectionName).doc(id).get()
            if (!doc.exists) return null
            return { id: doc.id, ...doc.data() }
        } catch (err) {
            console.error(`Error getting document from ${collectionName}:`, err)
            throw err
        }
    },

    async query(collectionName, filterBy = {}) {
        try {
            let query = this.collection(collectionName)
            
            // Apply filters if they exist
            if (filterBy.txt) {
                query = query.where('fullname', '>=', filterBy.txt)
                          .where('fullname', '<=', filterBy.txt + '\uf8ff')
            }
            
            const snapshot = await query.get()
            const docs = []
            snapshot.forEach(doc => {
                docs.push({ id: doc.id, ...doc.data() })
            })
            return docs
        } catch (err) {
            console.error(`Error querying ${collectionName}:`, err)
            throw err
        }
    },

    async add(collectionName, data) {
        try {
            const docRef = await this.collection(collectionName).add({
                ...data,
                createdAt: new Date().toISOString()
            })
            return { id: docRef.id, ...data }
        } catch (err) {
            console.error(`Error adding document to ${collectionName}:`, err)
            throw err
        }
    },

    async update(collectionName, id, data) {
        try {
            await this.collection(collectionName).doc(id).update({
                ...data,
                updatedAt: new Date().toISOString()
            })
            return { id, ...data }
        } catch (err) {
            console.error(`Error updating document in ${collectionName}:`, err)
            throw err
        }
    },

    async remove(collectionName, id) {
        try {
            await this.collection(collectionName).doc(id).delete()
            return id
        } catch (err) {
            console.error(`Error removing document from ${collectionName}:`, err)
            throw err
        }
    }
}

// Export Firebase Authentication instance
export const firebaseAuth = admin.auth()

// Collection names constants
export const COLLECTIONS = {
    USERS: 'users',
    STUDENTS: 'students',
    COURSES: 'courses',
    CLASSES: 'classes',
    SESSIONS: 'sessions',
    SUBMISSIONS: {
        ADULT: 'adults_data',
        KIDS: 'kids_data'
    },
    QUESTIONS: 'questions',
}
