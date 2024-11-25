import express from 'express'
import { getQuestions, getQuestionById, addQuestion, updateQuestion, deleteQuestion } from './questions.controller.js'
import { requireAdmin, requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('/', getQuestions) 
router.get('/:id', getQuestionById) 
router.post('/', addQuestion)
router.put('/:id', updateQuestion) 
router.delete('/:id',requireAuth, requireAdmin, deleteQuestion) 

export const questionRoutes = router
