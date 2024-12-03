import { dbService } from '../../services/db/index.js';
import { logger } from '../../services/logger.service.js'
import { reviewService } from '../review/review.service.js'
import { ObjectId } from 'mongodb'
import { firebaseService, COLLECTIONS } from '../../services/db/db.service.firebase.js'

export const userService = {
    add, 
    getById, 
    update, 
    remove, 
    query, 
    getByEmail,
    updateCredits, 
}

async function query(filterBy = {}) {
    try {
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.query(COLLECTIONS.USERS, filterBy)
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('users');
            const cursor = await collection.find(_buildCriteria(filterBy));
            return await cursor.toArray();
        }
    } catch (err) {
        logger.error('Cannot find users', err);
        throw err;
    }
}

async function getById(userId) {
    try {
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.getById(COLLECTIONS.USERS, userId)
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('users');
            const user = await collection.findOne({ _id: new ObjectId(userId) });
            if (!user) throw new Error('User not found');
            delete user.password; // Remove sensitive data
            return user;
        }
    } catch (err) {
        logger.error(`Error finding user by ID: ${userId}`, err);
        throw err;
    }
}

async function getByEmail(email) {
    try {
        if (process.env.DB_TYPE === 'firebase') {
            const usersSnapshot = await dbService.collection('users').where('email', '==', email).get();
            if (usersSnapshot.empty) return null;
            const userDoc = usersSnapshot.docs[0];
            const user = userDoc.data();
            delete user.password; // Remove sensitive data
            return { id: userDoc.id, ...user };
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('users');
            const user = await collection.findOne({ email });
            if (!user) return null;
            delete user.password; // Remove sensitive data
            return user;
        }
    } catch (err) {
        logger.error(`Error finding user by email: ${email}`, err);
        throw err;
    }
}

async function remove(userId) {
    try {
        if (!userId) throw new Error('Missing userId')

        if (process.env.DB_TYPE === 'firebase') {
            await firebaseService.remove(COLLECTIONS.USERS, userId)
            return userId
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('users')
            await collection.deleteOne({ _id: new ObjectId(userId) })
            return userId
        }
    } catch (err) {
        logger.error(`Cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(userId, user) {
    try {
        if (!userId) throw new Error('Missing userId')

        // Define allowed fields for updating
        const allowedFields = ['fullname', 'email', 'phone', 'courseType', 'sessionCredits', 'imgUrl']

        if (process.env.DB_TYPE === 'firebase') {
            // Get existing user to merge with updates
            const existingUser = await firebaseService.getById(COLLECTIONS.USERS, userId)
            if (!existingUser) throw new Error(`User with ID ${userId} not found`)

            // Prepare fields to update
            const userToUpdate = allowedFields.reduce((acc, field) => {
                if (user[field] !== undefined) acc[field] = user[field]
                return acc
            }, {})

            return await firebaseService.update(COLLECTIONS.USERS, userId, userToUpdate)

        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('users')
            const existingUser = await collection.findOne({ _id: new ObjectId(userId) })

            if (!existingUser) throw new Error(`User with ID ${userId} not found`)

            // Prepare fields to update
            const userToUpdate = allowedFields.reduce((acc, field) => {
                if (user[field] !== undefined) acc[field] = user[field]
                return acc
            }, {})

            const result = await collection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: userToUpdate }
            )

            if (result.matchedCount === 0) throw new Error(`Failed to update user with ID ${userId}`)

            return { ...existingUser, ...userToUpdate, _id: userId }
        }
    } catch (err) {
        logger.error(`Cannot update user ${userId}`, err)
        throw err
    }
}

async function add(user) {
    try {
        // Only allow specific fields to be added
        const userToAdd = {
            password: user.password,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            courseType: user.courseType || CourseType.GENERAL,
            sessions: [],
            sessionCredits: user.sessionCredits || 0,
            imgUrl: user.imgUrl || '',
            isAdmin: user.isAdmin || false,
            createdAt: new Date(),
        };

        // Ensure required fields are present
        if (!userToAdd.password || !userToAdd.fullname || !userToAdd.email) {
            throw new Error('Missing required fields: password, fullname, or email');
        }

        // Add user to the database
        if (process.env.DB_TYPE === 'firebase') {
            return await firebaseService.add(COLLECTIONS.USERS, userToAdd)
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('users');
            const result = await collection.insertOne(userToAdd);
            return { ...userToAdd, _id: result.insertedId };
        }
    } catch (err) {
        logger.error('Cannot add user', err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.$or = [
            { fullname: { $regex: filterBy.txt, $options: 'i' } },
            { email: { $regex: filterBy.txt, $options: 'i' } },
        ];
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance };
    }
    return criteria;
}


async function updateCredits(userId, credits) {
    try {
      const collection = await dbService.getCollection('users');
      await collection.updateOne(
        { _id: ObjectId(userId) },
        { $inc: { sessionCredits: credits } }
      );
    } catch (err) {
      logger.error('Cannot update user credits', err);
      throw err;
    }
  }
