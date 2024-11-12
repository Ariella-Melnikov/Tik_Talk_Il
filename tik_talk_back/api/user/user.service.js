import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { reviewService } from '../review/review.service.js'
import { ObjectId } from 'mongodb'

export const userService = {
    add, // Create (Signup)
    getById, // Read (Profile page)
    update, // Update (Edit profile)
    remove, // Delete (remove user)
    query, // List (of users)
    getByUsername, // Used for Login
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('users')
        var users = await collection.find(criteria).toArray()
        users = users.map((user) => {
            delete user.password
            user.createdAt = user._id.getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    try {
        var criteria = { _id: ObjectId.createFromHexString(userId) }

        const collection = await dbService.getCollection('users')
        const user = await collection.findOne(criteria)

        if (!user) throw new Error('User not found')

        delete user.password

        // Fetch user's session data
        const sessionCriteria = { userId: ObjectId.createFromHexString(userId) }
        user.sessions = await dbService.getCollection('sessions').find(sessionCriteria).toArray()

        // criteria = { byUserId: userId }

        // user.givenReviews = await reviewService.query(criteria)
        // user.givenReviews = user.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })

        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user by username: ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const criteria = { _id: ObjectId.createFromHexString(userId) }

        const collection = await dbService.getCollection('users')
        await collection.deleteOne(criteria)
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(userId, user) {
    try {
        const collection = await dbService.getCollection('users')

        // Fetch existing user
        const existingUser = await collection.findOne({ _id: new ObjectId(userId) })
        if (!existingUser) throw new Error(`User with ID ${userId} not found`)

        // peek only updatable properties
        const userToUpdate = {
            fullname: user.fullname || existingUser.fullname,
            email: user.email || existingUser.email,
            phone: user.phone || existingUser.phone,
            courseType: user.courseType || existingUser.courseType,
            imgUrl: user.imgUrl || existingUser.imgUrl,
        }

        await collection.updateOne({ _id: new ObjectId(userId) }, { $set: userToUpdate })

        return { ...existingUser, ...userToUpdate, _id: userId }
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            courseType: user.courseType || 'General',
            sessions: [],
            imgUrl: user.imgUrl || '',
            isAdmin: false,
        }
        const collection = await dbService.getCollection('users')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}
