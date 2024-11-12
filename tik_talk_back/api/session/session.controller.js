import { sessionService } from './session.service.js'
import { logger } from '../../services/logger.service.js'
import { userService } from '../user/user.service.js'

export async function addSession(req, res) {
    try {
        const session = req.body

        // Fetch the user to check credits
        const user = await userService.getById(session.userId)

        if (user.sessionCredits <= 0) {
            return res.status(400).send({ err: 'Insufficient session credits' })
        }

        // Deduct a credit
        user.sessionCredits -= 1
        await userService.update(user._id, { sessionCredits: user.sessionCredits })

        const savedSession = await sessionService.add(session)
        res.send(savedSession)
    } catch (err) {
        logger.error('Failed to add session', err)
        res.status(400).send({ err: 'Failed to add session' })
    }
}

export async function getSessions(req, res) {
    try {
        const { userId } = req.params
        const sessions = await sessionService.query({ userId })
        res.send(sessions)
    } catch (err) {
        logger.error('Failed to get sessions', err)
        res.status(400).send({ err: 'Failed to get sessions' })
    }
}

export async function updateSession(req, res) {
    try {
        const { sessionId } = req.params
        const session = req.body
        const updatedSession = await sessionService.update(sessionId, session)
        res.send(updatedSession)
    } catch (err) {
        logger.error('Failed to update session', err)
        res.status(400).send({ err: 'Failed to update session' })
    }
}

export async function deleteSession(req, res) {
    try {
        const { sessionId } = req.params
        await sessionService.remove(sessionId)
        res.send({ msg: 'Session deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete session', err)
        res.status(400).send({ err: 'Failed to delete session' })
    }
}
