import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'
import { logger } from '../../services/logger.service.js'

export const submissionService = {
    query,
    getById,
    add,
    update,
    remove,
}

// Fetch submissions based on type (adult or kids)
async function query(type) {
    const collectionName = type === 'adult' ? 'adult_submissions' : 'kids_submissions'
    const collection = await dbService.getCollection(collectionName)
    try {
        return await collection.find({}).toArray()
    } catch (err) {
        logger.error('Failed to find submissions', err)
        throw err
    }
}

// Get submission by ID
async function getById(id, type) {
    const collectionName = type === 'adult' ? 'adult_submissions' : 'kids_submissions'
    const collection = await dbService.getCollection(collectionName)
    try {
        return await collection.findOne({ _id: ObjectId(id) })
    } catch (err) {
        logger.error('Failed to find submission', err)
        throw err
    }
}

// Add a new submission
async function add(submission, type) {
    const collectionName = type === 'adult' ? 'adult_submissions' : 'kids_submissions'
    const collection = await dbService.getCollection(collectionName)
    try {
        const result = await collection.insertOne(submission)
        return result.ops[0]
    } catch (err) {
        logger.error('Failed to add submission', err)
        throw err
    }
}

// Update an existing submission
async function update(submission, type) {
    const collectionName = type === 'adult' ? 'adult_submissions' : 'kids_submissions'
    const collection = await dbService.getCollection(collectionName)
    try {
        const id = ObjectId(submission._id)
        delete submission._id
        await collection.updateOne({ _id: id }, { $set: submission })
        return { ...submission, _id: id }
    } catch (err) {
        logger.error('Failed to update submission', err)
        throw err
    }
}

// Remove a submission
async function remove(id, type) {
    const collectionName = type === 'adult' ? 'adult_submissions' : 'kids_submissions'
    const collection = await dbService.getCollection(collectionName)
    try {
        await collection.deleteOne({ _id: ObjectId(id) })
    } catch (err) {
        logger.error('Failed to remove submission', err)
        throw err
    }
}