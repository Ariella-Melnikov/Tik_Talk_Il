import { dbService } from '../../services/db/index.js';
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
        const collection = dbService.collection('questions');
        if (process.env.DB_TYPE === 'firebase') {
            const snapshot = await collection.get();
            const questions = [];
            snapshot.forEach((doc) => {
                questions.push({ id: doc.id, ...doc.data() });
            });
            return questions;
        } else if (process.env.DB_TYPE === 'mongo') {
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
        const collection = dbService.collection('questions');
        if (process.env.DB_TYPE === 'firebase') {
            const doc = await collection.doc(id).get();
            if (!doc.exists) throw new Error('Question not found');
            return { id: doc.id, ...doc.data() };
        } else if (process.env.DB_TYPE === 'mongo') {
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
        const collection = dbService.collection('questions');
        if (process.env.DB_TYPE === 'firebase') {
            const docRef = await collection.add(question);
            return { id: docRef.id, ...question };
        } else if (process.env.DB_TYPE === 'mongo') {
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
        console.log('Updating question in service:', { id, question })
        
        const collection = dbService.collection('questions')
        
        // Prepare the update data
        const updateData = {
            text: question.text,
            options: question.options,
            correctAnswer: question.correctAnswer,
            updatedAt: new Date()
        }

        if (process.env.DB_TYPE === 'firebase') {
            const docRef = collection.doc(id)
            await docRef.update(updateData)
            return { id, ...updateData }
        } else if (process.env.DB_TYPE === 'mongo') {
            const result = await collection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: 'after' }
            )
            return result.value
        }
    } catch (err) {
        console.error('Failed to update question in service:', err)
        throw err
    }
}

// Delete a question
async function remove(id) {
    try {
        const collection = dbService.collection('questions');
        if (process.env.DB_TYPE === 'firebase') {
            const docRef = collection.doc(id);
            await docRef.delete();
        } else if (process.env.DB_TYPE === 'mongo') {
            await collection.deleteOne({ _id: new ObjectId(id) });
        }
    } catch (err) {
        logger.error('Failed to delete question', err);
        throw err;
    }
}