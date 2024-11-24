import { MongoClient } from 'mongodb';
import { logger } from '../logger.service.js';
import dotenv from 'dotenv';

dotenv.config();

export const mongoService = { getCollection }

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await _connect();
        return db.collection(collectionName);
    } catch (err) {
        logger.error('Failed to get MongoDB collection', err);
        throw err;
    }
}

async function _connect() {
    if (dbConn) return dbConn;

    try {
        const client = await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        dbConn = client.db(process.env.DB_NAME);
        return dbConn;
    } catch (err) {
        logger.error('Cannot connect to MongoDB', err);
        throw err;
    }
}