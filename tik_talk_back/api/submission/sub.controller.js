import { submissionService } from './sub.service.js'
import { logger } from '../../services/logger.service.js'

// Get submissions (adult or kids) based on the type
export async function getSubmissions(req, res) {
    try {
        const { type } = req.params
        const submissions = await submissionService.query(type)
        res.json(submissions)
    } catch (err) {
        logger.error('Failed to get submissions', err)
        res.status(400).send({ err: 'Failed to get submissions' })
    }
}

// Get submission by ID
export async function getSubmissionById(req, res) {
    try {
        const { id, type } = req.params
        const submission = await submissionService.getById(id, type)
        res.json(submission)
    } catch (err) {
        logger.error('Failed to get submission', err)
        res.status(400).send({ err: 'Failed to get submission' })
    }
}

// Add a new submission
export async function addSubmission(req, res) {
    try {
        const { type } = req.params
        const submission = req.body
        const addedSubmission = await submissionService.add(submission, type)
        res.json(addedSubmission)
    } catch (err) {
        logger.error('Failed to add submission', err)
        res.status(400).send({ err: 'Failed to add submission' })
    }
}

// Update a submission
export async function updateSubmission(req, res) {
    try {
        const { type } = req.params
        const submission = req.body
        const updatedSubmission = await submissionService.update(submission, type)
        res.json(updatedSubmission)
    } catch (err) {
        logger.error('Failed to update submission', err)
        res.status(400).send({ err: 'Failed to update submission' })
    }
}

// Remove a submission
export async function removeSubmission(req, res) {
    try {
        const { id, type } = req.params
        await submissionService.remove(id, type)
        res.send(id)
    } catch (err) {
        logger.error('Failed to remove submission', err)
        res.status(400).send({ err: 'Failed to remove submission' })
    }
}