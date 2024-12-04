import { storageService } from '../async-storage.service.js'
import { utilService } from '../util.service.js'

const SESSION_STORAGE_KEY = 'sessions'

export const sessionService = {
    createSession,
    getAvailableSessions,
    bookSession,
    getUpcomingSessions,
    getUserSessions
}

async function createSession(sessionData) {
    try {
        const sessionToAdd = {
            _id: utilService.makeId(),
            courseType: sessionData.courseType,
            date: new Date(sessionData.date),
            time: sessionData.time,
            maxStudents: sessionData.maxStudents,
            currentStudents: 0,
            status: 'upcoming',
            students: []
        }
        return storageService.post(SESSION_STORAGE_KEY, sessionToAdd)
    } catch (err) {
        console.error('Cannot create session', err)
        throw err
    }
}

async function getAvailableSessions(courseType) {
    try {
        const sessions = await storageService.query(SESSION_STORAGE_KEY)
        return sessions.filter(session => 
            session.courseType === courseType && 
            session.status === 'upcoming' &&
            session.currentStudents < session.maxStudents
        )
    } catch (err) {
        console.error('Cannot get available sessions', err)
        throw err
    }
}

async function bookSession(sessionId, userId) {
    try {
        const session = await storageService.get(SESSION_STORAGE_KEY, sessionId)
        if (!session) throw new Error('Session not found')
        if (session.currentStudents >= session.maxStudents) {
            throw new Error('Session is full')
        }
        if (session.students.includes(userId)) {
            throw new Error('User already booked for this session')
        }

        session.currentStudents += 1
        session.students.push(userId)
        return storageService.put(SESSION_STORAGE_KEY, session)
    } catch (err) {
        console.error('Cannot book session', err)
        throw err
    }
}

async function getUpcomingSessions() {
    try {
        const sessions = await storageService.query(SESSION_STORAGE_KEY)
        return sessions.filter(session => session.status === 'upcoming')
    } catch (err) {
        console.error('Cannot get upcoming sessions', err)
        throw err
    }
}

async function getUserSessions(userId) {
    try {
        const sessions = await storageService.query(SESSION_STORAGE_KEY)
        return sessions.filter(session => session.students.includes(userId))
    } catch (err) {
        console.error('Cannot get user sessions', err)
        throw err
    }
}