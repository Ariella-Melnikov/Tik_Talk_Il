import { firebaseService, COLLECTIONS } from '../../services/db/db.service.firebase.js';
import { logger } from '../../services/logger.service.js';

export const questionService = {
    query,
    getById,
    add,
    update,
    remove,
};

// Fetch all questions
async function query() {
    try {
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.query(COLLECTIONS.QUESTIONS);
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('questions');
            return await collection.find({}).toArray();
        }
    } catch (err) {
        logger.error('Failed to fetch questions', err);
        throw err;
    }
}

// Fetch a specific question by ID
async function getById(id) {
    try {
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.getById(COLLECTIONS.QUESTIONS, id);
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('questions');
            return await collection.findOne({ _id: new ObjectId(id) });
        }
    } catch (err) {
        logger.error('Failed to fetch question by ID', err);
        throw err;
    }
}

// Add a new question
async function add(question) {
    try {
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.add(COLLECTIONS.QUESTIONS, question);
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('questions');
            const result = await collection.insertOne(question);
            return { ...question, _id: result.insertedId };
        }
    } catch (err) {
        logger.error('Failed to add question', err);
        throw err;
    }
}

// Update an existing question
async function update(id, question) {
    try {
        const updateData = {
            text: question.text,
            options: question.options,
            correctAnswer: question.correctAnswer,
            updatedAt: new Date()
        };

        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.update(COLLECTIONS.QUESTIONS, id, updateData);
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('questions');
            const result = await collection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: 'after' }
            );
            return result.value;
        }
    } catch (err) {
        logger.error('Failed to update question', err);
        throw err;
    }
}

// Delete a question
async function remove(id) {
    try {
        if (process.env.DB_TYPE === 'firebase') {
            await firebaseService.remove(COLLECTIONS.QUESTIONS, id);
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('questions');
            await collection.deleteOne({ _id: new ObjectId(id) });
        }
    } catch (err) {
        logger.error('Failed to delete question', err);
        throw err;
    }
}