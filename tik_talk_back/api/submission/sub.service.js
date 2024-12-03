import { dbService } from '../../services/db/index.js';
import { logger } from '../../services/logger.service.js';
import { firebaseService, COLLECTIONS } from '../../services/db/db.service.firebase.js';

export const submissionService = {
    query,
    getById,
    add,
    update,
    remove,
};

// Fetch submissions based on type (adult or kids)
async function query(type) {
    const collectionName = type === 'adult' ? COLLECTIONS.SUBMISSIONS.ADULT : COLLECTIONS.SUBMISSIONS.KIDS;
    try {
        logger.debug(`Querying ${collectionName} submissions...`);

        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.query(collectionName);
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            return await collection.find({}).toArray();
        }
    } catch (err) {
        logger.error(`Failed to fetch ${type} submissions`, err);
        throw err;
    }
}

// Get submission by ID
async function getById(id, type) {
    const collectionName = type === 'adult' ? COLLECTIONS.SUBMISSIONS.ADULT : COLLECTIONS.SUBMISSIONS.KIDS;
    try {
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.getById(collectionName, id);
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            return await collection.findOne({ _id: new ObjectId(id) });
        }
    } catch (err) {
        logger.error(`Failed to get submission by ID: ${id}`, err);
        throw err;
    }
}

// Add a new submission
async function add(submission, type) {
    const collectionName = type === 'adult' ? COLLECTIONS.SUBMISSIONS.ADULT : COLLECTIONS.SUBMISSIONS.KIDS;
    try {
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.add(collectionName, submission);
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
    const { id, ...submissionToUpdate } = submission;
    const collectionName = type === 'adult' ? COLLECTIONS.SUBMISSIONS.ADULT : COLLECTIONS.SUBMISSIONS.KIDS;
    
    try {
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.update(collectionName, id, submissionToUpdate);
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: submissionToUpdate }
            );
            return { id, ...submissionToUpdate };
        }
    } catch (err) {
        logger.error(`Failed to update submission ${id}`, err);
        throw err;
    }
}

// Remove a submission
async function remove(id, type) {
    const collectionName = type === 'adult' ? COLLECTIONS.SUBMISSIONS.ADULT : COLLECTIONS.SUBMISSIONS.KIDS;
    try {
        if (process.env.DB_TYPE === 'firebase') {
            await firebaseService.remove(collectionName, id);
            return id;
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection(collectionName);
            await collection.deleteOne({ _id: new ObjectId(id) });
            return id;
        }
    } catch (err) {
        logger.error(`Failed to remove submission ${id}`, err);
        throw err;
    }
}