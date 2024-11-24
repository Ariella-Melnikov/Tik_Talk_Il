import { mongoService } from './db.service.mongo.js';
import { firebaseService } from './db.service.firebase.js';

const dbType = process.env.DB_TYPE || 'mongo'; // Default to MongoDB if DB_TYPE is not set

export const dbService = dbType === 'firebase' ? firebaseService : mongoService;