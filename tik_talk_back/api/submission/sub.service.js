import { dbService } from '../../services/db/index.js';
import { logger } from '../../services/logger.service.js';

export const submissionService = {
    query,
    getById,
    add,
    update,
    remove,
};

// Fetch submissions based on type (adult or kids)
async function query(type) {
    const collectionName = type === 'adult' ? 'adults_data' : 'kids_data';
    try {
        if (process.env.DB_TYPE === 'firebase') {
            const submissionsSnapshot = await dbService.collection(collectionName).get();
            const submissions = [];
            submissionsSnapshot.forEach((doc) => {
                submissions.push({ id: doc.id, ...doc.data() });
            });
            return submissions;
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            return await collection.find({}).toArray();
        }
    } catch (err) {
        logger.error('Failed to find submissions', err);
        throw err;
    }
}

// Get submission by ID
async function getById(id, type) {
    const collectionName = type === 'adult' ? 'adult_submissions' : 'kids_submissions';
    try {
        if (process.env.DB_TYPE === 'firebase') {
            const doc = await dbService.collection(collectionName).doc(id).get();
            if (!doc.exists) throw new Error('Submission not found');
            return { id: doc.id, ...doc.data() };
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            return await collection.findOne({ _id: new ObjectId(id) });
        }
    } catch (err) {
        logger.error('Failed to find submission', err);
        throw err;
    }
}

// Add a new submission
async function add(submission, type) {
    const collectionName = type === 'adult' ? 'adults_data' : 'kids_data';
    try {
        if (process.env.DB_TYPE === 'firebase') {
            const docRef = await dbService.collection(collectionName).add(submission);
            return { id: docRef.id, ...submission };
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            const result = await collection.insertOne(submission);
            return { ...submission, _id: result.insertedId };
        }
    } catch (err) {
        logger.error('Failed to add submission', err);
        throw err;
    }
}

// Update an existing submission
async function update(submission, type) {
    const { id, ...submissionToUpdate } = submission; // Use `id` instead of `_id` for consistency
    const collectionName = type === 'adult' ? 'adults_data' : 'kids_data';
    try {
        if (process.env.DB_TYPE === 'firebase') {
            const docRef = dbService.collection(collectionName).doc(id);
            await docRef.update(submissionToUpdate);
            return { id, ...submissionToUpdate };
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: submissionToUpdate });
            return { id, ...submissionToUpdate };
        }
    } catch (err) {
        logger.error('Failed to update submission', err);
        throw err;
    }
}

// Remove a submission
async function remove(id, type) {
    const collectionName = type === 'adult' ? 'adults_data' : 'kids_data';
    try {
        if (process.env.DB_TYPE === 'firebase') {
            const docRef = dbService.collection(collectionName).doc(id);
            await docRef.delete();
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            await collection.deleteOne({ _id: new ObjectId(id) });
        }
    } catch (err) {
        logger.error('Failed to remove submission', err);
        throw err;
    }
}