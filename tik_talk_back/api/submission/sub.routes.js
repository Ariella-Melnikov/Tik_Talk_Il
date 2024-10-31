import express from 'express'
import { getSubmissions, getSubmissionById, addSubmission, updateSubmission, removeSubmission } from './submission.controller.js'

const router = express.Router()

router.get('/:type', getSubmissions) // Get all submissions by type
router.get('/:type/:id', getSubmissionById) // Get a single submission by ID and type
router.post('/:type', addSubmission) // Add a new submission
router.put('/:type/:id', updateSubmission) // Update a submission
router.delete('/:type/:id', removeSubmission) // Delete a submission

export const submissionRoutes = router