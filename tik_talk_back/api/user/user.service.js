import { dbService } from '../../services/db/index.js';
import { logger } from '../../services/logger.service.js'
import { reviewService } from '../review/review.service.js'
import { ObjectId } from 'mongodb'

export const userService = {
    add, 
    getById, 
    update, 
    remove, 
    query, 
    getByEmail, 
}

async function query(filterBy = {}) {
    try {
        if (process.env.DB_TYPE === 'firebase') {
            const usersSnapshot = await dbService.collection('users').get();
            const users = [];
            usersSnapshot.forEach((doc) => {
                const user = doc.data();
                delete user.password; // Remove sensitive data
                user.id = doc.id;
                users.push(user);
            });
            return users;
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
            const userDoc = await dbService.collection('users').doc(userId).get();
            if (!userDoc.exists) throw new Error('User not found');
            const user = userDoc.data();
            delete user.password; // Remove sensitive data
            return { id: userDoc.id, ...user };
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
        if (process.env.DB_TYPE === 'firebase') {
            const userRef = dbService.collection('users').doc(userId);
            await userRef.delete();
        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('users');
            await collection.deleteOne({ _id: new ObjectId(userId) });
        }
    } catch (err) {
        logger.error(`Cannot remove user ${userId}`, err);
        throw err;
    }
}

async function update(userId, user) {
    try {
        if (!userId) throw new Error('Missing userId');

        // Define allowed fields for updating
        const allowedFields = ['fullname', 'email', 'phone', 'courseType', 'sessionCredits', 'imgUrl'];

        if (process.env.DB_TYPE === 'firebase') {
            const userRef = dbService.collection('users').doc(userId);
            const userDoc = await userRef.get();

            if (!userDoc.exists) throw new Error(`User with ID ${userId} not found`);
            const existingUser = userDoc.data();

            // Prepare fields to update
            const userToUpdate = allowedFields.reduce((acc, field) => {
                acc[field] = user[field] || existingUser[field];
                return acc;
            }, {});

            await userRef.update(userToUpdate);
            return { id: userId, ...existingUser, ...userToUpdate };

        } else if (process.env.DB_TYPE === 'mongo') {
            const collection = await dbService.collection('users');
            const existingUser = await collection.findOne({ _id: new ObjectId(userId) });

            if (!existingUser) throw new Error(`User with ID ${userId} not found`);

            // Prepare fields to update
            const userToUpdate = allowedFields.reduce((acc, field) => {
                acc[field] = user[field] || existingUser[field];
                return acc;
            }, {});

            const result = await collection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: userToUpdate }
            );

            if (result.matchedCount === 0) throw new Error(`Failed to update user with ID ${userId}`);

            return { ...existingUser, ...userToUpdate, _id: userId };
        }
    } catch (err) {
        logger.error(`Cannot update user ${userId}`, err);
        throw err;
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
            courseType: user.courseType || 'General',
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
            const userRef = await dbService.collection('users').add(userToAdd);
            return { id: userRef.id, ...userToAdd };
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