import { dbService } from '../../services/db.service.js';
import { ObjectId } from 'mongodb';

export const sessionService = {
  add,
  query,
  update,
  remove,
};

async function add(session) {
  try {
    const sessionToAdd = {
      userId: ObjectId(session.userId),
      date: session.date,
      type: session.type,
      status: session.status || 'upcoming',
    };

    const collection = await dbService.getCollection('sessions');
    await collection.insertOne(sessionToAdd);
    return sessionToAdd;
  } catch (err) {
    logger.error('Cannot add session', err);
    throw err;
  }
}

async function query(filterBy = {}) {
  try {
    const collection = await dbService.getCollection('sessions');
    const criteria = filterBy.userId ? { userId: ObjectId(filterBy.userId) } : {};
    return collection.find(criteria).toArray();
  } catch (err) {
    logger.error('Cannot find sessions', err);
    throw err;
  }
}

async function update(sessionId, session) {
    try {
      const collection = await dbService.getCollection('sessions');
      await collection.updateOne(
        { _id: ObjectId(sessionId) },
        { $set: session }
      );
      return session;
    } catch (err) {
      console.error('Cannot update session', err);
      throw err;
    }
  }
  
  async function remove(sessionId) {
    try {
      const collection = await dbService.getCollection('sessions');
      await collection.deleteOne({ _id: ObjectId(sessionId) });
    } catch (err) {
      console.error('Cannot remove session', err);
      throw err;
    }
  }